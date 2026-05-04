import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { getPostImages } from "../utils/images.js";
import ProductPhoto from "./ProductPhoto.jsx";

export default function ProductGallery({ product }) {
  const images = useMemo(() => getPostImages(product), [product]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const activeImage = images[activeIndex];

  if (!images.length) {
    return <ProductPhoto product={product} className="detail-main-photo" />;
  }

  const goTo = (direction) => {
    setActiveIndex((current) => (current + direction + images.length) % images.length);
  };

  return (
    <>
      <div className="product-gallery">
        <div className="gallery-thumbs" aria-label="Imagenes de la publicacion">
          {images.map((image, index) => (
            <button
              className={index === activeIndex ? "active" : ""}
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Ver imagen ${index + 1}`}
            >
              <img src={image} alt={`${product.title} miniatura ${index + 1}`} />
            </button>
          ))}
        </div>
        <button className="gallery-main zoomable" type="button" onClick={() => setIsOpen(true)}>
          <img src={activeImage} alt={product.title} />
          <span className="zoom-hint"><Maximize2 size={18} /> Ver galeria</span>
        </button>
      </div>

      {isOpen && (
        <div className="gallery-modal" role="dialog" aria-modal="true" aria-label="Galeria de imagenes">
          <button className="modal-close" type="button" onClick={() => setIsOpen(false)} aria-label="Cerrar galeria">
            <X size={24} />
          </button>
          <button className="modal-nav left" type="button" onClick={() => goTo(-1)} aria-label="Imagen anterior">
            <ChevronLeft size={30} />
          </button>
          <img src={activeImage} alt={product.title} />
          <button className="modal-nav right" type="button" onClick={() => goTo(1)} aria-label="Imagen siguiente">
            <ChevronRight size={30} />
          </button>
          <div className="modal-thumbs">
            {images.map((image, index) => (
              <button
                className={index === activeIndex ? "active" : ""}
                key={`modal-${image}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Ver imagen ${index + 1}`}
              >
                <img src={image} alt={`${product.title} miniatura ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
