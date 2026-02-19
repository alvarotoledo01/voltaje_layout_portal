import { ReactNode, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "block px-3 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap",
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
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { to: "/sobre", label: "Sobre el proyecto" },
      { to: "/categorizacion", label: "Categorización" },
      { to: "/planta-baja", label: "Planta baja" },
      { to: "/primer-piso", label: "Primer piso" },
    ],
    []
  );

  useEffect(() => {
    // Cerrar menú al navegar (mejor UX en mobile)
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo/Logo-Transparente-Nuevo-e1654271665999.png"
              alt="Voltaje"
              className="h-14 w-14 sm:h-16 sm:w-16 md:h-24 md:w-24 rounded-3xl object-contain bg-white"
            />
            <div className="leading-tight">
              <div className="text-sm sm:text-base font-semibold text-slate-900">
                Práctica supervisada
              </div>
              <div className="hidden sm:block text-xs text-slate-500">
                Diseño de Layout para Voltaje S.R.L.
              </div>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((it) => (
              <NavItem key={it.to} to={it.to} label={it.label} />
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white/70 px-3 py-2 text-sm text-slate-700 hover:text-slate-900 hover:border-slate-300 hover:bg-white transition"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.29 19.71 2.88 18.29 9.17 12 2.88 5.71 4.29 4.29l6.3 6.3 6.3-6.3z"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"
                />
              </svg>
            )}
          </button>
          </div>

          {/* Mobile nav */}
          {mobileOpen ? (
            <nav className="lg:hidden mt-3 rounded-2xl border border-slate-200 bg-white shadow-sm p-2">
              <div className="grid gap-1">
                {navItems.map((it) => (
                  <NavItem key={it.to} to={it.to} label={it.label} />
                ))}
              </div>
            </nav>
          ) : null}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}

