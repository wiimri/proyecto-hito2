import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/PostForm.jsx";
import { useMarketplace } from "../context/MarketplaceContext.jsx";
import { fileToDataUrl } from "../utils/format.js";
import { usePageIntro } from "../hooks/useAnime.js";

const maxImagesPerPost = 5;

const emptyPost = {
  title: "",
  description: "",
  price: "",
  category: "Tecnologia",
  condition: "Usado - bueno",
  location: "",
  imageUrl: "",
  images: [],
};

export default function PostFormPage({ mode }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { categories, posts, createPost, updatePost, deletePost } = useMarketplace();
  const postId = Number(id);
  const currentPost = posts.find((post) => post.id === postId);
  const initialValues = useMemo(() => mode === "edit" && currentPost ? currentPost : emptyPost, [mode, currentPost]);
  const introRef = usePageIntro(`${mode}-${id || "new"}`);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (mode === "edit" && !currentPost) {
    return (
      <section className="empty-state">
        <h1>Publicacion no encontrada</h1>
        <p>No pudimos encontrar la publicacion que quieres editar.</p>
        <Link className="button primary" to="/perfil">Volver a mi perfil</Link>
      </section>
    );
  }

  const buildPayload = async (form) => {
    const data = Object.fromEntries(new FormData(form));
    const files = Array.from(form.elements.imageFiles.files).slice(0, maxImagesPerPost);
    const uploadedImages = await Promise.all(files.map(fileToDataUrl));
    const urlImages = data.imageUrls
      .split("\n")
      .map((url) => url.trim())
      .filter(Boolean)
      .slice(0, maxImagesPerPost - uploadedImages.length);
    const images = [...uploadedImages, ...urlImages].slice(0, maxImagesPerPost);
    return {
      title: data.title,
      description: data.description,
      price: Number(data.price),
      category: data.category,
      condition: data.condition,
      location: data.location,
      imageUrl: images[0] || "",
      images,
    };
  };

  const validatePayload = (payload) => {
    const nextErrors = {};
    if (payload.title.trim().length < 3) nextErrors.title = "El titulo debe tener al menos 3 caracteres.";
    if (payload.description.trim().length < 10) nextErrors.description = "La descripcion debe explicar mejor el producto o servicio.";
    if (!Number.isFinite(payload.price) || payload.price <= 0) nextErrors.price = "El precio debe ser mayor a cero.";
    if (!payload.location.trim()) nextErrors.location = "Debes indicar la comuna o ubicacion.";
    if (!payload.images.length) nextErrors.images = "Debes subir al menos una imagen o agregar una URL/ruta.";
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = await buildPayload(event.currentTarget);
      const nextErrors = validatePayload(payload);
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length > 0) return;
      if (mode === "edit") {
        updatePost(postId, payload);
        navigate("/perfil", { replace: true });
        return;
      }
      createPost(payload);
      navigate("/publicaciones", { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = () => {
    const confirmed = confirm("Seguro que quieres eliminar esta publicacion?");
    if (!confirmed) return;
    deletePost(postId);
    navigate("/perfil", { replace: true });
  };

  const handleRemoveImage = () => {
    updatePost(postId, { imageUrl: "", images: [] });
    navigate(`/editar/${postId}`, { replace: true });
  };

  return (
    <section className="create-layout" ref={introRef}>
      <div>
        <p className="eyebrow">Formulario privado</p>
        <h1>{mode === "edit" ? "Editar publicacion" : "Crear publicacion"}</h1>
        <p className="lead">
          {mode === "edit"
            ? "Actualiza los datos, cambia la imagen o elimina la publicacion."
            : "La publicacion requiere titulo, descripcion, precio, categoria, estado, ubicacion e imagen."}
        </p>
      </div>
      <PostForm
        categories={categories}
        initialValues={initialValues}
        submitLabel={mode === "edit" ? "Guardar cambios" : "Publicar"}
        onSubmit={handleSubmit}
        onDelete={mode === "edit" ? handleDelete : undefined}
        onRemoveImage={mode === "edit" ? handleRemoveImage : undefined}
        errors={errors}
        isSubmitting={isSubmitting}
      />
    </section>
  );
}
