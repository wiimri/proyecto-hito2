import { Link } from "react-router-dom";
import { Eye, MapPin } from "lucide-react";
import ProductPhoto from "./ProductPhoto.jsx";
import { money } from "../utils/format.js";
import { getPostImages } from "../utils/images.js";

export default function ProductCard({ product }) {
  const imageCount = getPostImages(product).length;

  return (
    <article className="product-card" data-animate-item>
      <div className="card-media">
        <ProductPhoto product={product} />
        <span className="card-badge">{product.category}</span>
        {imageCount > 1 && <span className="image-count">{imageCount} fotos</span>}
      </div>
      <div className="body">
        <h2>{product.title}</h2>
        <span className="meta"><MapPin size={15} />{product.location}</span>
        <span className="price">{money(product.price)}</span>
        <div className="card-footer">
          <span>{product.condition}</span>
          <Link className="button secondary" to={`/publicaciones/${product.id}`}><Eye size={17} />Ver detalle</Link>
        </div>
      </div>
    </article>
  );
}
