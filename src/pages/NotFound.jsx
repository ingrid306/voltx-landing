import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center text-center py-20">
      <p className="eyebrow mb-3">Error 404</p>
      <h1 className="font-display text-4xl font-bold text-white mb-4">Señal perdida</h1>
      <p className="text-sm text-slate-500 mb-8 max-w-sm">
        La página que buscás no existe o cambió de dirección.
      </p>
      <Link to="/" className="btn-volt inline-flex">
        Volver al inicio
      </Link>
    </section>
  );
}
