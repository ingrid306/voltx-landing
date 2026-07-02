import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/productos", label: "Productos" },
  { to: "/sobre-nosotros", label: "Sobre nosotros" },
  { to: "/contacto", label: "Contacto" },
];

function NavItem({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      onClick={onClick}
      className={({ isActive }) =>
        `relative font-display text-sm tracking-wide transition-colors ${
          isActive ? "text-volt" : "text-slate-300 hover:text-white"
        }`
      }
    >
      {({ isActive }) => (
        <span className="group inline-flex flex-col items-center gap-1.5">
          {label}
          <span
            className={`h-px w-full bg-volt transition-all duration-300 ${
              isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`}
          />
        </span>
      )}
    </NavLink>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M13 2 4 14h6l-1 8 9-12h-6z" fill="#F4C430" />
          </svg>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            VOLT<span className="text-volt">X</span>
          </span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavItem key={l.to} {...l} />
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-slate-400">
                Hola, <span className="text-circuit">{user.firstName}</span>
              </span>
              <button onClick={logout} className="btn-ghost !px-4 !py-2 !text-xs">
                Salir
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="btn-ghost !px-4 !py-2 !text-xs">
              Ingresar
            </NavLink>
          )}
          <button
            onClick={() => navigate("/productos")}
            className="relative flex items-center gap-2 rounded-sm border border-line px-3 py-2 text-slate-200 transition-colors hover:border-volt hover:text-volt"
            aria-label="Ver carrito"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-volt font-mono text-[10px] font-bold text-ink2">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          <span className={`h-0.5 w-6 bg-slate-200 transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-slate-200 transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-slate-200 transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-ink">
          <nav className="container-x flex flex-col gap-1 py-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-sm px-3 py-3 font-display text-sm ${
                    isActive ? "bg-surface text-volt" : "text-slate-300"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="trace-divider my-2" />
            <div className="flex items-center justify-between px-3">
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="btn-ghost !px-4 !py-2 !text-xs"
                >
                  Salir ({user.firstName})
                </button>
              ) : (
                <NavLink to="/login" onClick={() => setOpen(false)} className="btn-ghost !px-4 !py-2 !text-xs">
                  Ingresar
                </NavLink>
              )}
              <NavLink
                to="/productos"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 font-mono text-xs text-slate-300"
              >
                Carrito
                {totalItems > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-volt font-bold text-[10px] text-ink2">
                    {totalItems}
                  </span>
                )}
              </NavLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
