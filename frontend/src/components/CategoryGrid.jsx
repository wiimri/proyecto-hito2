import { useStaggeredList } from "../hooks/useAnime.js";

export default function CategoryGrid({ categories }) {
  const listRef = useStaggeredList(categories.length);

  return (
    <div className="category-grid" ref={listRef}>
      {categories.map((category) => (
        <article key={category.id} data-animate-item>
          <strong>{category.name}</strong>
          <span>{category.description}</span>
        </article>
      ))}
    </div>
  );
}
