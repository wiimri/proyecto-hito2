const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const db = require("./db");

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || "dev_secret_change_me";

function asyncHandler(handler) {
  return (request, response, next) => Promise.resolve(handler(request, response, next)).catch(next);
}

function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: "8h" });
}

function auth(request, response, next) {
  const header = request.headers.authorization || "";
  const token = header.replace("Bearer ", "");
  if (!token) {
    return response.status(401).json({ message: "Token requerido", errors: [] });
  }

  try {
    request.user = jwt.verify(token, jwtSecret);
    return next();
  } catch (error) {
    return response.status(401).json({ message: "Token invalido", errors: [] });
  }
}

function validate(schema, payload) {
  const result = schema.validate(payload, { abortEarly: false, stripUnknown: true });
  if (result.error) {
    const error = new Error("Datos invalidos");
    error.status = 400;
    error.errors = result.error.details.map((detail) => detail.message);
    throw error;
  }
  return result.value;
}

const registerSchema = Joi.object({
  fullName: Joi.string().min(3).max(120).required(),
  email: Joi.string().email().max(160).required(),
  phone: Joi.string().max(30).allow("", null),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const postSchema = Joi.object({
  categoryId: Joi.number().integer().positive().required(),
  title: Joi.string().min(5).max(140).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().min(0).required(),
  condition: Joi.string().valid("Nuevo", "Usado - excelente", "Usado - bueno", "Usado - regular").required(),
  commune: Joi.string().min(2).max(80).required(),
  status: Joi.string().valid("active", "paused", "sold", "deleted").default("active"),
  images: Joi.array().items(
    Joi.object({
      imageUrl: Joi.string().uri().required(),
      altText: Joi.string().max(160).allow("", null),
      isCover: Joi.boolean().default(false),
    })
  ).default([]),
});

router.get("/health", (request, response) => {
  response.json({ status: "ok", service: "mercado-vecino-api" });
});

router.post("/auth/register", asyncHandler(async (request, response) => {
  const data = validate(registerSchema, request.body);
  const passwordHash = await bcrypt.hash(data.password, 10);
  const result = await db.query(
    `INSERT INTO users (full_name, email, phone, password_hash)
     VALUES ($1, $2, $3, $4)
     RETURNING id, full_name AS "fullName", email, phone`,
    [data.fullName, data.email, data.phone || null, passwordHash]
  );
  const user = result.rows[0];
  response.status(201).json({ user, token: signToken(user) });
}));

router.post("/auth/login", asyncHandler(async (request, response) => {
  const data = validate(loginSchema, request.body);
  const result = await db.query(
    `SELECT id, full_name AS "fullName", email, phone, password_hash AS "passwordHash"
     FROM users WHERE email = $1`,
    [data.email]
  );
  const user = result.rows[0];
  const matches = user ? await bcrypt.compare(data.password, user.passwordHash) : false;
  if (!matches) {
    return response.status(401).json({ message: "Credenciales invalidas", errors: [] });
  }
  delete user.passwordHash;
  response.json({ user, token: signToken(user) });
}));

router.get("/users/me", auth, asyncHandler(async (request, response) => {
  const result = await db.query(
    `SELECT u.id, u.full_name AS "fullName", u.email, u.phone, u.avatar_url AS "avatarUrl",
      COUNT(p.id)::int AS "activePosts"
     FROM users u
     LEFT JOIN posts p ON p.user_id = u.id AND p.status = 'active'
     WHERE u.id = $1
     GROUP BY u.id`,
    [request.user.id]
  );
  const user = result.rows[0];
  if (!user) return response.status(404).json({ message: "Usuario no encontrado", errors: [] });
  response.json({ ...user, stats: { activePosts: user.activePosts } });
}));

router.put("/users/me", auth, asyncHandler(async (request, response) => {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(120).required(),
    phone: Joi.string().max(30).allow("", null),
    avatarUrl: Joi.string().uri().allow("", null),
  });
  const data = validate(schema, request.body);
  const result = await db.query(
    `UPDATE users
     SET full_name = $1, phone = $2, avatar_url = $3, updated_at = CURRENT_TIMESTAMP
     WHERE id = $4
     RETURNING id, full_name AS "fullName", email, phone, avatar_url AS "avatarUrl"`,
    [data.fullName, data.phone || null, data.avatarUrl || null, request.user.id]
  );
  response.json(result.rows[0]);
}));

router.get("/categories", asyncHandler(async (request, response) => {
  const result = await db.query(
    `SELECT id, name, description FROM categories ORDER BY name ASC`
  );
  response.json(result.rows);
}));

router.get("/posts", asyncHandler(async (request, response) => {
  const page = Number(request.query.page || 1);
  const limit = Number(request.query.limit || 12);
  const offset = (page - 1) * limit;
  const search = `%${request.query.search || ""}%`;
  const categoryId = request.query.categoryId || null;

  const result = await db.query(
    `SELECT p.id, p.title, p.price, p.condition, p.commune, p.status,
      json_build_object('id', c.id, 'name', c.name) AS category,
      json_build_object('id', u.id, 'fullName', u.full_name) AS seller,
      (
        SELECT pi.image_url FROM post_images pi
        WHERE pi.post_id = p.id
        ORDER BY pi.is_cover DESC, pi.id ASC
        LIMIT 1
      ) AS "coverImage",
      COUNT(*) OVER()::int AS total
     FROM posts p
     JOIN categories c ON c.id = p.category_id
     JOIN users u ON u.id = p.user_id
     WHERE p.status = 'active'
       AND ($1::text = '%%' OR p.title ILIKE $1 OR p.description ILIKE $1)
       AND ($2::bigint IS NULL OR p.category_id = $2)
     ORDER BY p.created_at DESC
     LIMIT $3 OFFSET $4`,
    [search, categoryId, limit, offset]
  );

  response.json({
    data: result.rows.map(({ total, ...row }) => row),
    pagination: { page, limit, total: result.rows[0]?.total || 0 },
  });
}));

router.get("/posts/:id", asyncHandler(async (request, response) => {
  const result = await db.query(
    `SELECT p.id, p.title, p.description, p.price, p.condition, p.commune, p.status,
      json_build_object('id', c.id, 'name', c.name) AS category,
      json_build_object('id', u.id, 'fullName', u.full_name, 'phone', u.phone) AS seller,
      COALESCE(json_agg(json_build_object(
        'id', pi.id,
        'imageUrl', pi.image_url,
        'altText', pi.alt_text,
        'isCover', pi.is_cover
      )) FILTER (WHERE pi.id IS NOT NULL), '[]') AS images,
      p.created_at AS "createdAt"
     FROM posts p
     JOIN categories c ON c.id = p.category_id
     JOIN users u ON u.id = p.user_id
     LEFT JOIN post_images pi ON pi.post_id = p.id
     WHERE p.id = $1 AND p.status <> 'deleted'
     GROUP BY p.id, c.id, u.id`,
    [request.params.id]
  );
  const post = result.rows[0];
  if (!post) return response.status(404).json({ message: "Publicacion no encontrada", errors: [] });
  response.json(post);
}));

router.post("/posts", auth, asyncHandler(async (request, response) => {
  const data = validate(postSchema, request.body);
  const result = await db.query(
    `INSERT INTO posts (user_id, category_id, title, description, price, condition, commune, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING id, user_id AS "userId", category_id AS "categoryId", title, description, price, condition, commune, status`,
    [request.user.id, data.categoryId, data.title, data.description, data.price, data.condition, data.commune, data.status]
  );
  const post = result.rows[0];

  for (const image of data.images) {
    await db.query(
      `INSERT INTO post_images (post_id, image_url, alt_text, is_cover) VALUES ($1, $2, $3, $4)`,
      [post.id, image.imageUrl, image.altText || null, image.isCover]
    );
  }

  response.status(201).json({ ...post, images: data.images });
}));

router.put("/posts/:id", auth, asyncHandler(async (request, response) => {
  const data = validate(postSchema.fork(["images"], (schema) => schema.optional()), request.body);
  const result = await db.query(
    `UPDATE posts
     SET category_id = $1, title = $2, description = $3, price = $4, condition = $5, commune = $6, status = $7, updated_at = CURRENT_TIMESTAMP
     WHERE id = $8 AND user_id = $9
     RETURNING id, title, price, status`,
    [data.categoryId, data.title, data.description, data.price, data.condition, data.commune, data.status, request.params.id, request.user.id]
  );
  if (!result.rows[0]) return response.status(404).json({ message: "Publicacion no encontrada", errors: [] });
  response.json(result.rows[0]);
}));

router.delete("/posts/:id", auth, asyncHandler(async (request, response) => {
  const result = await db.query(
    `UPDATE posts SET status = 'deleted', updated_at = CURRENT_TIMESTAMP WHERE id = $1 AND user_id = $2 RETURNING id`,
    [request.params.id, request.user.id]
  );
  if (!result.rows[0]) return response.status(404).json({ message: "Publicacion no encontrada", errors: [] });
  response.json({ message: "Publicacion eliminada correctamente" });
}));

router.post("/favorites", auth, asyncHandler(async (request, response) => {
  const data = validate(Joi.object({ postId: Joi.number().integer().positive().required() }), request.body);
  const result = await db.query(
    `INSERT INTO favorites (user_id, post_id)
     VALUES ($1, $2)
     ON CONFLICT (user_id, post_id) DO UPDATE SET post_id = EXCLUDED.post_id
     RETURNING id, user_id AS "userId", post_id AS "postId"`,
    [request.user.id, data.postId]
  );
  response.status(201).json(result.rows[0]);
}));

router.get("/favorites", auth, asyncHandler(async (request, response) => {
  const result = await db.query(
    `SELECT f.id, json_build_object('id', p.id, 'title', p.title, 'price', p.price) AS post
     FROM favorites f
     JOIN posts p ON p.id = f.post_id
     WHERE f.user_id = $1
     ORDER BY f.created_at DESC`,
    [request.user.id]
  );
  response.json(result.rows);
}));

router.delete("/favorites/:postId", auth, asyncHandler(async (request, response) => {
  await db.query(`DELETE FROM favorites WHERE user_id = $1 AND post_id = $2`, [request.user.id, request.params.postId]);
  response.json({ message: "Favorito eliminado correctamente" });
}));

router.post("/messages", auth, asyncHandler(async (request, response) => {
  const data = validate(Joi.object({
    postId: Joi.number().integer().positive().required(),
    receiverId: Joi.number().integer().positive().required(),
    body: Joi.string().min(1).required(),
  }), request.body);
  const result = await db.query(
    `INSERT INTO messages (post_id, sender_id, receiver_id, body)
     VALUES ($1, $2, $3, $4)
     RETURNING id, post_id AS "postId", sender_id AS "senderId", receiver_id AS "receiverId", body, created_at AS "createdAt"`,
    [data.postId, request.user.id, data.receiverId, data.body]
  );
  response.status(201).json(result.rows[0]);
}));

router.get("/messages", auth, asyncHandler(async (request, response) => {
  const result = await db.query(
    `SELECT m.id,
      json_build_object('id', p.id, 'title', p.title) AS post,
      json_build_object('id', sender.id, 'fullName', sender.full_name) AS sender,
      json_build_object('id', receiver.id, 'fullName', receiver.full_name) AS receiver,
      m.body,
      m.created_at AS "createdAt"
     FROM messages m
     JOIN posts p ON p.id = m.post_id
     JOIN users sender ON sender.id = m.sender_id
     JOIN users receiver ON receiver.id = m.receiver_id
     WHERE m.sender_id = $1 OR m.receiver_id = $1
     ORDER BY m.created_at DESC`,
    [request.user.id]
  );
  response.json(result.rows);
}));

module.exports = router;
