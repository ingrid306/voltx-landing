import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink2 mt-24">
      <div className="container-x py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M13 2 4 14h6l-1 8 9-12h-6z" fill="#F4C430" />
            </svg>
            <span className="font-display text-base font-bold text-white">
              VOLT<span className="text-volt">X</span>
            </span>
          </Link>
          <p className="text-sm text-slate-500 leading-relaxed">
            Tecnología seleccionada para quienes exigen rendimiento real. Notebooks, audio, gaming
            y hogar inteligente con garantía oficial.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-4">Navegación</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-slate-400 hover:text-volt transition-colors">Inicio</Link></li>
            <li><Link to="/productos" className="text-slate-400 hover:text-volt transition-colors">Productos</Link></li>
            <li><Link to="/sobre-nosotros" className="text-slate-400 hover:text-volt transition-colors">Sobre nosotros</Link></li>
            <li><Link to="/contacto" className="text-slate-400 hover:text-volt transition-colors">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Cuenta</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/login" className="text-slate-400 hover:text-volt transition-colors">Ingresar</Link></li>
            <li><Link to="/registro" className="text-slate-400 hover:text-volt transition-colors">Crear cuenta</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Contacto</p>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>hola@voltx.com.ar</li>
            <li>Buenos Aires, Argentina</li>
            <li>Lun a Vie, 9 a 18hs</li>
          </ul>
        </div>
      </div>

      <div className="trace-divider" />

      <div className="container-x py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-xs text-slate-600">
          © {new Date().getFullYear()} VoltX. Proyecto académico, no es un comercio real.
        </p>
        <div className="flex items-center gap-1.5 font-mono text-xs text-slate-600">
          <span className="badge-dot" />
          Sistema operativo
        </div>
      </div>
    </footer>
  );
}
