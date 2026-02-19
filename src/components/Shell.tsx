import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "px-3 py-2 rounded-lg text-sm font-medium transition",
          isActive
            ? "bg-blue-600 text-white shadow-sm"
            : "text-slate-700 hover:text-slate-900 hover:bg-slate-100",
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  );
}

export default function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo/Logo-Transparente-Nuevo-e1654271665999.png"
              alt="Voltaje"
              className="h-24 w-24 rounded-3xl object-contain bg-white"
            />
            <div className="leading-tight">
              <div className="text-base font-semibold text-slate-900">
                Práctica supervisada
              </div>
              <div className="text-xs text-slate-500">
                Diseño de Layout para Voltaje S.R.L.
              </div>
            </div>
          </div>
          <nav className="flex items-center gap-2">
            <NavItem to="/sobre" label="Sobre el proyecto" />
            <NavItem to="/categorizacion" label="Categorización" />
            <NavItem to="/planta-baja" label="Planta baja" />
            <NavItem to="/primer-piso" label="Primer piso" />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}

