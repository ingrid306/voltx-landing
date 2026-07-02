import { Link } from "react-router-dom";

const formatPrice = (n) =>
  n.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

export default function ProductCard({ product, onAddToCart }) {
  const lowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div className="card-surface group flex flex-col overflow-hidden transition-colors hover:border-volt/50">
      <Link to={`/productos/${product.id}`} className="relative block aspect-[4/3] overflow-hidden bg-ink2">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-sm bg-ink2/90 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-volt border border-volt/30">
          {product.category}
        </span>
        {lowStock && (
          <span className="absolute right-3 top-3 rounded-sm bg-red-500/15 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-red-400 border border-red-500/30">
            Últimas {product.stock}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link to={`/productos/${product.id}`}>
          <h3 className="font-display text-sm font-semibold text-white leading-snug hover:text-volt transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-2">
          {product.shortDescription}
        </p>

        <div className="mt-4 flex items-end justify-between">
          <span className="font-mono text-base font-semibold text-circuit">
            {formatPrice(product.price)}
          </span>
          <div className="flex items-center gap-1 font-mono text-[11px] text-slate-500">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#F4C430"><path d="M12 2 9.2 8.6 2 9.3l5.5 4.7L5.8 21 12 17.3 18.2 21l-1.7-7L22 9.3l-7.2-.7z"/></svg>
            {product.rating}
          </div>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
          className="btn-volt mt-4 w-full !py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none"
        >
          {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
}

export { formatPrice };
