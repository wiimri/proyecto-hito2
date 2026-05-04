import ProductCard from "../components/ProductCard.jsx";
import { useMarketplace } from "../context/MarketplaceContext.jsx";
import { usePageIntro, useStaggeredList } from "../hooks/useAnime.js";

export default function Gallery() {
  const { categories, filters, setFilters, filteredPosts } = useMarketplace();
  const introRef = usePageIntro("gallery");
  const listRef = useStaggeredList(`${filters.search}-${filters.category}-${filteredPosts.length}`);

  const handleChange = (event) => {
    setFilters((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  return (
    <section className="section catalog-page" ref={introRef}>
      <div className="catalog-hero">
        <div>
          <p className="eyebrow">Galeria de publicaciones</p>
          <h1>Publicaciones disponibles</h1>
          <p className="lead">Encuentra productos y servicios publicados por tu comunidad. Filtra, compara y revisa cada detalle antes de contactar.</p>
        </div>
        <div className="catalog-stats" aria-label="Resumen de publicaciones">
          <strong>{filteredPosts.length}</strong>
          <span>resultados activos</span>
        </div>
      </div>

      <div className="catalog-toolbar">
        <div>
          <strong>Explorar marketplace</strong>
          <span>Busqueda rapida por nombre, descripcion o categoria.</span>
        </div>
        <div className="filters">
          <input name="search" value={filters.search} onChange={handleChange} placeholder="Buscar..." />
          <select name="category" value={filters.category} onChange={handleChange}>
            <option value="">Todas</option>
            {categories.map((category) => <option key={category.id}>{category.name}</option>)}
          </select>
        </div>
      </div>

      <div className="product-grid" ref={listRef}>
        {filteredPosts.length > 0
          ? filteredPosts.map((product) => <ProductCard key={product.id} product={product} />)
          : (
            <div className="empty-state catalog-empty">
              <h2>No encontramos publicaciones</h2>
              <p>Prueba con otra busqueda o cambia la categoria seleccionada.</p>
            </div>
          )}
      </div>
    </section>
  );
}
