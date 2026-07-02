import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../services/productService.js";
import ProductCard from "../components/ProductCard.jsx";
import { useCart } from "../context/CartContext.jsx";
import Modal from "../components/Modal.jsx";

export default function Home() {
  const { addItem } = useCart();
  const [featured, setFeatured] = useState([]);
  const [confirmProduct, setConfirmProduct] = useState(null);

  useEffect(() => {
    fetchProducts({ sort: "rating" })
      .then((products) => setFeatured(products.slice(0, 3)))
      .catch(() => {});
  }, []);

  const handleConfirmAdd = () => { if (confirmProduct) addItem(confirmProduct, 1); setConfirmProduct(null); };

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line bg-grid bg-[length:32px_32px]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-ink/40 to-ink" />
        <div className="container-x relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-5 flex items-center gap-2">
              <span className="badge-dot" /> Catálogo 2026 disponible
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-white">
              Tecnología que <span className="text-volt">enciende</span> tus ideas.
            </h1>
            <p className="mt-6 max-w-md text-base text-slate-400 leading-relaxed">
              Notebooks, audio, gaming y wearables probados a fondo, con specs reales y
              garantía oficial. Sin relleno de marketing: solo lo que necesitás para decidir.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/productos" className="btn-volt">
                Ver productos
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
              <Link to="/sobre-nosotros" className="btn-ghost">Sobre nosotros</Link>
            </div>
          </div>

          {/* Readout card */}
          <div className="relative mx-auto w-full max-w-sm">
            <svg viewBox="0 0 320 80" className="absolute -top-10 left-0 w-full opacity-70" fill="none">
              <path d="M0 40 H60 L80 10 L100 70 L120 40 H180 L200 60 L220 20 L240 40 H320" stroke="#F4C430" strokeWidth="2" strokeDasharray="400" className="animate-traceIn"/>
            </svg>
            <div className="card-surface relative p-6">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500">Readout — Forge 14</span>
                <span className="badge-dot" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 font-mono text-xs">
                <div><p className="text-slate-500">Autonomía</p><p className="mt-1 text-lg text-circuit">16h 00m</p></div>
                <div><p className="text-slate-500">Refresco</p><p className="mt-1 text-lg text-circuit">120 Hz</p></div>
                <div><p className="text-slate-500">Peso</p><p className="mt-1 text-lg text-circuit">1.3 kg</p></div>
                <div><p className="text-slate-500">Estado</p><p className="mt-1 text-lg text-volt">En stock</p></div>
              </div>
              <img src="https://picsum.photos/seed/volt-forge/640/480" alt="Notebook VoltX Forge 14" className="mt-5 aspect-video w-full rounded-sm object-cover"/>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="container-x py-20 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow mb-4">Quiénes somos</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              No vendemos cajas.<br />Curamos especificaciones.
            </h2>
          </div>
          <div>
            <p className="text-slate-400 leading-relaxed">
              VoltX nació de la frustración de comparar fichas técnicas incompletas. Cada
              producto que publicamos pasa por un banco de pruebas propio antes de llegar al
              catálogo: medimos autonomía real, no la de la caja, y publicamos los resultados
              tal como salen.
            </p>
            <Link to="/sobre-nosotros" className="btn-ghost mt-6 inline-flex">
              Conocé el equipo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </div>
        </div>
      </section>

      <div className="container-x"><div className="trace-divider" /></div>

      {/* FEATURED PRODUCTS */}
      <section className="container-x py-20 sm:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-3">Catálogo</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Productos destacados</h2>
          </div>
          <Link to="/productos" className="btn-ghost">Ver todo el catálogo</Link>
        </div>

        {featured.length === 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card-surface animate-pulse">
                <div className="aspect-[4/3] bg-surface2" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-surface2 rounded w-3/4" />
                  <div className="h-3 bg-surface2 rounded" />
                  <div className="h-8 bg-surface2 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={setConfirmProduct} />
            ))}
          </div>
        )}
      </section>

      <Modal open={!!confirmProduct} title="Agregar al carrito" onClose={() => setConfirmProduct(null)} onCancel={() => setConfirmProduct(null)} onConfirm={handleConfirmAdd} confirmLabel="Agregar">
        ¿Agregar <span className="text-white">{confirmProduct?.name}</span> al carrito?
      </Modal>
    </>
  );
}
