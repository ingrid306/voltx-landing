import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../services/productService.js";
import { categories } from "../data/products.js"; // solo para las labels de filtro
import ProductCard, { formatPrice } from "../components/ProductCard.jsx";
import Modal from "../components/Modal.jsx";
import { useCart } from "../context/CartContext.jsx";

const sortOptions = [
  { id: "relevance", label: "Relevancia" },
  { id: "price-asc", label: "Precio: menor a mayor" },
  { id: "price-desc", label: "Precio: mayor a menor" },
  { id: "rating", label: "Mejor calificados" },
];

export default function Products() {
  const navigate = useNavigate();
  const { items, addItem, setQuantity, removeItem, clearCart, subtotal, totalItems } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("relevance");

  const [confirmAdd, setConfirmAdd] = useState(null);
  const [confirmRemove, setConfirmRemove] = useState(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [confirmCheckout, setConfirmCheckout] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchProducts({ category, sort });
      setProducts(data);
    } catch (err) {
      setError("No se pudieron cargar los productos. Verificá que el servidor esté corriendo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [category, sort]);

  useEffect(() => { load(); }, [load]);

  const handleConfirmAdd = () => { if (confirmAdd) addItem(confirmAdd, 1); setConfirmAdd(null); };
  const handleConfirmRemove = () => { if (confirmRemove) removeItem(confirmRemove.id); setConfirmRemove(null); };
  const handleConfirmClear = () => { clearCart(); setConfirmClear(false); };
  const handleConfirmCheckout = () => { setConfirmCheckout(false); navigate("/checkout"); };

  return (
    <>
      <section className="border-b border-line bg-grid bg-[length:32px_32px]">
        <div className="container-x py-14 sm:py-16">
          <p className="eyebrow mb-3">Catálogo completo</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Productos</h1>
          {!loading && (
            <p className="mt-3 max-w-lg text-sm text-slate-400">
              {products.length} resultado{products.length !== 1 && "s"}
              {category !== "all" && (
                <> en <span className="text-volt">{categories.find((c) => c.id === category)?.label}</span></>
              )}
            </p>
          )}
        </div>
      </section>

      <section className="container-x py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            {/* Filtros */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                    className={`rounded-sm border px-3.5 py-2 font-mono text-xs uppercase tracking-wide transition-colors ${
                      category === c.id
                        ? "border-volt bg-volt/10 text-volt"
                        : "border-line text-slate-400 hover:border-slate-500 hover:text-slate-200"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="field-input !w-auto font-mono text-xs"
              >
                {sortOptions.map((o) => (
                  <option key={o.id} value={o.id}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* Listado */}
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card-surface animate-pulse">
                    <div className="aspect-[4/3] bg-surface2" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-surface2 rounded w-3/4" />
                      <div className="h-3 bg-surface2 rounded w-full" />
                      <div className="h-3 bg-surface2 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="card-surface p-10 text-center">
                <p className="text-red-400 text-sm mb-4">{error}</p>
                <button onClick={load} className="btn-ghost !text-xs !px-4 !py-2">
                  Reintentar
                </button>
              </div>
            ) : products.length === 0 ? (
              <div className="card-surface p-10 text-center">
                <p className="text-slate-400">No hay productos en esta categoría.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} onAddToCart={setConfirmAdd} />
                ))}
              </div>
            )}
          </div>

          {/* Carrito lateral */}
          <aside className="lg:sticky lg:top-24 h-fit card-surface p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-semibold text-white">Tu carrito</h2>
              <span className="font-mono text-xs text-slate-500">{totalItems} ítem(s)</span>
            </div>
            <div className="trace-divider my-4" />

            {items.length === 0 ? (
              <p className="text-sm text-slate-500 py-6 text-center">Todavía no agregaste productos.</p>
            ) : (
              <ul className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 shrink-0 rounded-sm object-cover border border-line"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-200 truncate">{item.name}</p>
                      <p className="font-mono text-xs text-circuit mt-0.5">{formatPrice(item.price)}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => setQuantity(item.id, item.quantity - 1)}
                          className="h-6 w-6 rounded-sm border border-line text-slate-300 hover:border-volt hover:text-volt"
                        >−</button>
                        <span className="w-6 text-center font-mono text-xs">{item.quantity}</span>
                        <button
                          onClick={() => item.quantity < item.stock && setQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          className="h-6 w-6 rounded-sm border border-line text-slate-300 hover:border-volt hover:text-volt disabled:opacity-30 disabled:hover:border-line disabled:hover:text-slate-300"
                        >+</button>
                        <button
                          onClick={() => setConfirmRemove(item)}
                          className="ml-auto font-mono text-[11px] text-red-400/80 hover:text-red-400"
                        >Quitar</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="trace-divider my-4" />
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono text-xs uppercase tracking-widest text-slate-500">Subtotal</span>
              <span className="font-mono text-lg font-semibold text-white">{formatPrice(subtotal)}</span>
            </div>
            <button
              onClick={() => items.length > 0 && setConfirmCheckout(true)}
              disabled={items.length === 0}
              className="btn-volt w-full disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none"
            >Realizar compra</button>
            <button
              onClick={() => items.length > 0 && setConfirmClear(true)}
              disabled={items.length === 0}
              className="btn-danger w-full mt-3 disabled:cursor-not-allowed disabled:opacity-30"
            >Vaciar carrito</button>
          </aside>
        </div>
      </section>

      <Modal open={!!confirmAdd} title="Agregar al carrito" onClose={() => setConfirmAdd(null)} onCancel={() => setConfirmAdd(null)} onConfirm={handleConfirmAdd} confirmLabel="Agregar">
        ¿Agregar <span className="text-white">{confirmAdd?.name}</span> al carrito?
      </Modal>
      <Modal open={!!confirmRemove} title="Quitar producto" tone="danger" onClose={() => setConfirmRemove(null)} onCancel={() => setConfirmRemove(null)} onConfirm={handleConfirmRemove} confirmLabel="Quitar">
        ¿Quitar <span className="text-white">{confirmRemove?.name}</span> del carrito?
      </Modal>
      <Modal open={confirmClear} title="Vaciar carrito" tone="danger" onClose={() => setConfirmClear(false)} onCancel={() => setConfirmClear(false)} onConfirm={handleConfirmClear} confirmLabel="Vaciar">
        Esto va a eliminar los {totalItems} ítem(s) de tu carrito.
      </Modal>
      <Modal open={confirmCheckout} title="Confirmar compra" onClose={() => setConfirmCheckout(false)} onCancel={() => setConfirmCheckout(false)} onConfirm={handleConfirmCheckout} confirmLabel="Continuar">
        Vas a continuar con la compra de {totalItems} ítem(s) por un total de <span className="text-white">{formatPrice(subtotal)}</span>.
      </Modal>
    </>
  );
}
