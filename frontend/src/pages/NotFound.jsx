import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="empty-state">
      <h1>Pagina no encontrada</h1>
      <p>La ruta solicitada no existe en Mercado Vecino.</p>
      <Link className="button primary" to="/">Volver al inicio</Link>
    </section>
  );
}
