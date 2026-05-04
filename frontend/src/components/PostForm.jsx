import { Save, Trash2, XCircle } from "lucide-react";

export default function PostForm({
  categories,
  initialValues,
  submitLabel,
  onSubmit,
  onDelete,
  onRemoveImage,
  errors = {},
  isSubmitting = false,
}) {
  return (
    <form className="form-card wide" onSubmit={onSubmit}>
      {Object.keys(errors).length > 0 && <p className="form-alert">Revisa los campos marcados antes de continuar.</p>}
      <label>
        Titulo
        <input required name="title" defaultValue={initialValues.title} placeholder="Ej: Silla ergonomica" />
        {errors.title && <span className="field-error">{errors.title}</span>}
      </label>
      <label>
        Descripcion
        <textarea required name="description" defaultValue={initialValues.description} rows="4" placeholder="Describe estado, medidas y condiciones" />
        {errors.description && <span className="field-error">{errors.description}</span>}
      </label>
      <div className="form-row">
        <label>
          Precio
          <input required type="number" name="price" min="1" defaultValue={initialValues.price} placeholder="45000" />
          {errors.price && <span className="field-error">{errors.price}</span>}
        </label>
        <label>Categoria
          <select required name="category" defaultValue={initialValues.category}>
            {categories.map((category) => <option key={category.id}>{category.name}</option>)}
          </select>
        </label>
      </div>
      <div className="form-row">
        <label>Estado
          <select required name="condition" defaultValue={initialValues.condition}>
            <option>Nuevo</option>
            <option>Usado - excelente</option>
            <option>Usado - bueno</option>
            <option>Usado - regular</option>
          </select>
        </label>
        <label>
          Comuna
          <input required name="location" defaultValue={initialValues.location} placeholder="Santiago" />
          {errors.location && <span className="field-error">{errors.location}</span>}
        </label>
      </div>
      <label>Subir imagenes<input type="file" name="imageFiles" accept="image/*" multiple /></label>
      <p className="field-hint">Maximo recomendado: 5 imagenes. El prototipo las optimiza automaticamente antes de guardarlas.</p>
      {errors.images && <span className="field-error">{errors.images}</span>}
      <label>O usar rutas/URLs de imagen
        <textarea
          name="imageUrls"
          defaultValue={(initialValues.images || (initialValues.imageUrl ? [initialValues.imageUrl] : [])).join("\n")}
          rows="4"
          placeholder={"assets/notebook.jpg\nhttps://ejemplo.com/imagen.jpg"}
        />
      </label>
      <div className="edit-tools">
        {onRemoveImage && <button className="button secondary" type="button" onClick={onRemoveImage}><XCircle size={17} />Quitar imagen</button>}
        {onDelete && <button className="button danger" type="button" onClick={onDelete}><Trash2 size={17} />Eliminar publicacion</button>}
      </div>
      <button className="button primary" type="submit" disabled={isSubmitting}><Save size={17} />{isSubmitting ? "Guardando..." : submitLabel}</button>
    </form>
  );
}
