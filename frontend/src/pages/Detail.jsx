import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MessageCircle, ShieldCheck } from "lucide-react";
import ProductGallery from "../components/ProductGallery.jsx";
import { useMarketplace } from "../context/MarketplaceContext.jsx";
import { money } from "../utils/format.js";
import { usePageIntro } from "../hooks/useAnime.js";

export default function Detail() {
  const { id } = useParams();
  const { posts } = useMarketplace();
  const product = posts.find((item) => item.id === Number(id));
  const introRef = usePageIntro(id);

  if (!product) {
    return (
      <section className="empty-state">
        <h1>Publicacion no encontrada</h1>
        <p>La publicacion que buscas no existe o fue eliminada.</p>
        <Link className="button primary" to="/publicaciones">Volver a publicaciones</Link>
      </section>
    );
  }

  return (
    <section className="detail-layout" ref={introRef}>
      <ProductGallery product={product} />
      <article className="detail-panel">
        <div className="detail-topline">
          <span className="tag">{product.category}</span>
          <span className="trust-pill"><ShieldCheck size={16} />Publicacion verificada</span>
        </div>
        <h1>{product.title}</h1>
        <span className="price">{money(product.price)}</span>
        <p className="detail-description">{product.description}</p>
        <dl className="detail-specs">
          <dt>Estado</dt><dd>{product.condition}</dd>
          <dt>Ubicacion</dt><dd>{product.location}</dd>
          <dt>Vendedor</dt><dd>{product.seller}</dd>
        </dl>
        <div className="seller-card">
          <div className="avatar small-avatar">{product.seller?.slice(0, 2).toUpperCase()}</div>
          <div>
            <strong>{product.seller}</strong>
            <span>Responde normalmente dentro del dia</span>
          </div>
        </div>
        <button className="button primary" type="button"><MessageCircle size={18} />Contactar vendedor</button>
        <Link className="button secondary" to="/publicaciones"><ArrowLeft size={18} />Volver a galeria</Link>
      </article>
    </section>
  );
}
