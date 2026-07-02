import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProductById, fetchProducts } from "../services/productService.js";
import { formatPrice } from "../components/ProductCard.jsx";
import { useCart } from "../context/CartContext.jsx";
import Modal from "../components/Modal.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [qty, setQty] = useState(1);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError("");
    fetchProductById(id)
      .then((p) => {
        setProduct(p);
        return fetchProducts({ category: p.category });
      })
      .then((all) => setRelated(all.filter((p) => p.id !== id).slice(0, 3)))
      .catch(() => setError("Producto no encontrado o el servidor no está disponible."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleConfirm = () => { addItem(product, qty); setConfirmOpen(false); setQty(1); };

  if (loading) {
    return (
      <section className="container-x py-10">
        <div className="grid gap-10 lg:grid-cols-2 animate-pulse">
          <div className="card-surface aspect-[4/3] bg-surface2" />
          <div className="space-y-4 pt-4">
            <div className="h-3 bg-surface2 rounded w-1/3" />
            <div className="h-8 bg-surface2 rounded w-3/4" />
            <div className="h-4 bg-surface2 rounded w-1/4" />
            <div className="h-24 bg-surface2 rounded" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <div className="container-x py-24 text-center">
        <p className="eyebrow mb-3">Error</p>
        <h1 className="font-display text-3xl font-bold text-white mb-4">
          {error || "No encontramos ese producto"}
        </h1>
        <Link to="/productos" className="btn-volt inline-flex">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <>
      <div className="container-x pt-6">
        <nav className="font-mono text-xs text-slate-500 flex items-center gap-2">
          <Link to="/" className="hover:text-volt">Inicio</Link>
          <span>/</span>
          <Link to="/productos" className="hover:text-volt">Productos</Link>
          <span>/</span>
          <span className="text-slate-300">{product.name}</span>
        </nav>
      </div>

      <section className="container-x py-10">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="card-surface overflow-hidden">
            <img src={product.image} alt={product.name} className="aspect-[4/3] w-full object-cover" />
          </div>
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-volt">{product.category}</span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2">{product.name}</h1>
            <div className="mt-4 flex items-center gap-4">
              <span className="font-mono text-2xl font-semibold text-circuit">{formatPrice(product.price)}</span>
              <span className="flex items-center gap-1 font-mono text-xs text-slate-500">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#F4C430"><path d="M12 2 9.2 8.6 2 9.3l5.5 4.7L5.8 21 12 17.3 18.2 21l-1.7-7L22 9.3l-7.2-.7z"/></svg>
                {product.rating} · {product.stock} en stock
              </span>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-slate-400">{product.description}</p>
            <div className="mt-6 card-surface bg-ink2 p-4">
              <p className="eyebrow mb-3">Especificaciones</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.specs.map((s) => (
                  <li key={s} className="flex items-center gap-2 font-mono text-xs text-slate-400">
                    <span className="h-1 w-1 rounded-full bg-circuit" />{s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 rounded-sm border border-line px-3 py-2">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-6 w-6 text-slate-300 hover:text-volt">−</button>
                <span className="w-6 text-center font-mono text-sm">{qty}</span>
                <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} disabled={qty >= product.stock} className="h-6 w-6 text-slate-300 hover:text-volt disabled:opacity-30">+</button>
              </div>
              <button onClick={() => setConfirmOpen(true)} disabled={product.stock === 0} className="btn-volt flex-1 sm:flex-none disabled:cursor-not-allowed disabled:opacity-40">
                {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
              </button>
              <button onClick={() => navigate("/productos")} className="btn-ghost">Ver catálogo</button>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-x py-16">
          <div className="trace-divider mb-12" />
          <p className="eyebrow mb-3">También te puede interesar</p>
          <h2 className="font-display text-2xl font-bold text-white mb-8">Productos relacionados</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {related.map((p) => (
              <Link key={p.id} to={`/productos/${p.id}`} className="card-surface block overflow-hidden hover:border-volt/50 transition-colors">
                <img src={p.image} alt={p.name} className="aspect-[4/3] w-full object-cover" />
                <div className="p-4">
                  <p className="text-sm font-medium text-white">{p.name}</p>
                  <p className="mt-1 font-mono text-xs text-circuit">{formatPrice(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Modal open={confirmOpen} title="Agregar al carrito" onClose={() => setConfirmOpen(false)} onCancel={() => setConfirmOpen(false)} onConfirm={handleConfirm} confirmLabel="Agregar">
        ¿Agregar {qty} unidad(es) de <span className="text-white">{product.name}</span> al carrito?
      </Modal>
    </>
  );
}
