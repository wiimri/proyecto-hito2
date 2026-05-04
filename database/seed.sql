INSERT INTO categories (name, description) VALUES
('Tecnologia', 'Notebooks, celulares y accesorios'),
('Hogar', 'Muebles, decoracion y cocina'),
('Deportes', 'Bicicletas, ropa y equipamiento'),
('Servicios', 'Clases, reparaciones y oficios');

INSERT INTO users (full_name, email, phone, password_hash) VALUES
('Camila Rojas', 'camila@mail.com', '+56 9 1234 5678', '$2a$10$hash_demo'),
('Matias Perez', 'matias@mail.com', '+56 9 8765 4321', '$2a$10$hash_demo'),
('Daniel Soto', 'daniel@mail.com', '+56 9 5555 1111', '$2a$10$hash_demo');

INSERT INTO posts (user_id, category_id, title, description, price, condition, commune, status) VALUES
(2, 3, 'Bicicleta urbana aro 29', 'Bicicleta en excelente estado, marco liviano y cambios ajustados.', 180000, 'Usado - excelente', 'Providencia', 'active'),
(1, 1, 'Notebook Lenovo 14 pulgadas', 'Equipo ideal para estudio y trabajo remoto. Incluye cargador original.', 320000, 'Usado - bueno', 'Santiago', 'active'),
(3, 2, 'Silla ergonomica', 'Silla con soporte lumbar, altura regulable y apoyabrazos.', 45000, 'Usado - excelente', 'Nunoa', 'active');

INSERT INTO post_images (post_id, image_url, alt_text, is_cover) VALUES
(1, 'https://cdn.example.com/bicicleta.jpg', 'Bicicleta urbana aro 29', TRUE),
(2, 'https://cdn.example.com/notebook.jpg', 'Notebook Lenovo sobre escritorio', TRUE),
(3, 'https://cdn.example.com/silla.jpg', 'Silla ergonomica negra', TRUE);

INSERT INTO favorites (user_id, post_id) VALUES
(1, 1),
(2, 2);

INSERT INTO messages (post_id, sender_id, receiver_id, body) VALUES
(1, 1, 2, 'Hola, sigue disponible la bicicleta?'),
(2, 3, 1, 'Hola, aceptas transferencia?');
