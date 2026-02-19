import LayoutTable from "../components/LayoutTable";

function resolvePublicUrl(p: string): string {
  // Construye una ruta relativa al BASE_URL de Vite (sirve para deploy en subcarpetas).
  // Evita hardcodear rutas "absolutas" tipo `/layouts/...`.
  if (/^https?:\/\//i.test(p)) return p;
  const base = (import.meta as any).env?.BASE_URL || "/";
  const b = String(base).endsWith("/") ? String(base) : `${base}/`;
  const pp = String(p).replace(/^\/+/, "");
  return `${b}${pp}`;
}

export default function LayoutEmbed({
  title,
  subtitle,
  src,
  tableSrc,
}: {
  title: string;
  subtitle?: string;
  src: string;
  tableSrc?: string;
}) {
  const resolvedSrc = resolvePublicUrl(src);
  const resolvedTableSrc = tableSrc ? resolvePublicUrl(tableSrc) : undefined;

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {subtitle ? (
            <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
          ) : null}
        </div>

        <a
          href={resolvedSrc}
          target="_blank"
          rel="noreferrer"
          className="text-sm px-3 py-2 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition w-full sm:w-auto text-center"
        >
          Abrir en nueva pestaña
        </a>
      </div>

      <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
        <iframe
          title={title}
          src={resolvedSrc}
          className="w-full h-[70vh] sm:h-[74vh] md:h-[78vh]"
        />
      </div>

      {resolvedTableSrc ? <LayoutTable src={resolvedTableSrc} /> : null}
    </section>
  );
}

