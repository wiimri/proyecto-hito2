import { Link, useNavigate } from "react-router-dom";
import { Edit3, PackageOpen, PlusCircle, Trash2 } from "lucide-react";
import { useMarketplace } from "../context/MarketplaceContext.jsx";
import { money } from "../utils/format.js";
import { usePageIntro, useStaggeredList } from "../hooks/useAnime.js";

export default function Profile() {
  const navigate = useNavigate();
  const { user, myPosts, deletePost } = useMarketplace();
  const introRef = usePageIntro("profile");
  const listRef = useStaggeredList(myPosts.length);

  const handleDelete = (id) => {
    const confirmed = confirm("Seguro que quieres eliminar esta publicacion?");
    if (confirmed) deletePost(id);
  };

  return (
    <section className="dashboard" ref={introRef}>
      <aside className="profile-summary">
        <div className="avatar">MV</div>
        <h1>Mi perfil</h1>
        <p>{user.email}</p>
        <dl>
          <dt>Publicaciones activas</dt><dd>{myPosts.length}</dd>
          <dt>Ventas concretadas</dt><dd>8</dd>
          <dt>Valoracion</dt><dd>4.8/5</dd>
        </dl>
      </aside>
      <section className="content-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Panel privado</p>
            <h2>Mis publicaciones</h2>
          </div>
          <Link className="button primary small" to="/publicar"><PlusCircle size={17} />Nueva</Link>
        </div>
        <div className="post-list" ref={listRef}>
          {myPosts.length > 0 ? myPosts.map((product) => (
            <article className="post-row" key={product.id} data-animate-item>
              <div className="post-main">
                <span className="post-dot"></span>
                <div>
                  <strong>{product.title}</strong>
                  <p>{product.category} &middot; {product.location} &middot; {product.condition}</p>
                </div>
              </div>
              <div className="post-actions">
                <span className="price">{money(product.price)}</span>
                <button className="button secondary small" type="button" onClick={() => navigate(`/editar/${product.id}`)}><Edit3 size={16} />Editar</button>
                <button className="button danger small" type="button" onClick={() => handleDelete(product.id)}><Trash2 size={16} />Eliminar</button>
              </div>
            </article>
          )) : (
            <div className="empty-state compact-empty">
              <PackageOpen size={42} />
              <h2>Aun no tienes publicaciones</h2>
              <p>Crea tu primera publicacion para verla en este panel.</p>
              <Link className="button primary" to="/publicar"><PlusCircle size={17} />Crear publicacion</Link>
            </div>
          )}
        </div>
      </section>
    </section>
  );
}
