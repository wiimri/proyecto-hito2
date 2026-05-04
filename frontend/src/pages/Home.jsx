import { Link } from "react-router-dom";
import { ArrowRight, CreditCard, Package, PlusCircle, ShoppingCart, Store, Tag } from "lucide-react";
import CategoryGrid from "../components/CategoryGrid.jsx";
import ProductPhoto from "../components/ProductPhoto.jsx";
import { useMarketplace } from "../context/MarketplaceContext.jsx";
import { useHeroMotion, usePageIntro } from "../hooks/useAnime.js";

export default function Home() {
  const { categories, posts } = useMarketplace();
  const featured = posts[0];
  const introRef = usePageIntro("home");
  const heroMotionRef = useHeroMotion();

  return (
    <div className="home-page" ref={introRef}>
      <section className="hero animated-hero" ref={heroMotionRef}>
        <div className="hero-backdrop" aria-hidden="true">
          <span className="hero-glow glow-a" data-hero-glow></span>
          <span className="hero-glow glow-b" data-hero-glow></span>
        </div>

        <div className="hero-copy">
          <p className="eyebrow">Marketplace local</p>
          <h1>Compra y vende productos de tu comunidad en un solo lugar.</h1>
          <p className="lead">Explora publicaciones, revisa detalles y crea ofertas con fotos, precio, categoria y ubicacion.</p>
          <div className="hero-actions">
            <Link className="button primary" to="/publicaciones">Ver publicaciones <ArrowRight size={18} /></Link>
            <Link className="button secondary" to="/register">Crear cuenta <PlusCircle size={18} /></Link>
          </div>
        </div>

        <div className="market-stage" aria-label="Escena animada de marketplace">
          <div className="market-radar" aria-hidden="true">
            <span className="radar-ring ring-a" data-market-ring></span>
            <span className="radar-ring ring-b" data-market-ring></span>
            <span className="radar-ring ring-c" data-market-ring></span>
            <span className="radar-sweep" data-market-sweep></span>
            <div className="market-bars" data-market-bars>
              {Array.from({ length: 34 }).map((_, index) => (
                <span key={index} style={{ "--bar": index }}></span>
              ))}
            </div>
          </div>

          <div className="orbit orbit-a" data-market-orbit aria-hidden="true">
            <span><ShoppingCart size={24} /></span>
            <span><Package size={24} /></span>
            <span><Tag size={24} /></span>
          </div>

          <div className="orbit orbit-b" data-market-orbit aria-hidden="true">
            <span><Store size={22} /></span>
            <span><CreditCard size={22} /></span>
          </div>

          <aside className="hero-panel market-feature" data-market-card aria-label="Publicacion destacada">
            <span className="tag">Destacado</span>
            <ProductPhoto product={featured} />
            <h2>{featured.title}</h2>
            <p>{featured.category}</p>
          </aside>
        </div>
      </section>

      <section className="section home-section">
        <div className="section-heading">
          <h2>Categorias principales</h2>
          <Link to="/publicaciones">Ver todas</Link>
        </div>
        <CategoryGrid categories={categories} />
      </section>
    </div>
  );
}
