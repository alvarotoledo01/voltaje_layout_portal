import { useEffect, useMemo, useState } from "react";

type Item = {
  id_articulo_origen: string;
  articulo: string;
  categoria: string;
  tipo: string;
};

function resolvePublicUrl(p: string): string {
  if (/^https?:\/\//i.test(p)) return p;
  const base = (import.meta as any).env?.BASE_URL || "/";
  const b = String(base).endsWith("/") ? String(base) : `${base}/`;
  const pp = String(p).replace(/^\/+/, "");
  return `${b}${pp}`;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function Categorizacion() {
  const jsonSrc = resolvePublicUrl("json/articulos_clasificados.json");

  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [q, setQ] = useState("");
  const [pageSize, setPageSize] = useState(100);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setItems([]);

    fetch(jsonSrc, { cache: "no-store" })
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = (await r.json()) as unknown;
        if (!Array.isArray(data)) throw new Error("Formato inválido (se esperaba un array JSON)");
        if (!cancelled) setItems(data as Item[]);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : String(e));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [jsonSrc]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    const base = term
      ? items.filter((it) => {
      const id = String(it.id_articulo_origen || "").toLowerCase();
      const art = String(it.articulo || "").toLowerCase();
      const cat = String(it.categoria || "").toLowerCase();
      const tipo = String(it.tipo || "").toLowerCase();
      return (
        id.includes(term) ||
        art.includes(term) ||
        cat.includes(term) ||
        tipo.includes(term)
      );
      })
      : items;

    // Orden requerido: por categoría (y desempates para estabilidad visual)
    return [...base].sort((a, b) => {
      const ca = String(a.categoria || "").toLowerCase();
      const cb = String(b.categoria || "").toLowerCase();
      if (ca < cb) return -1;
      if (ca > cb) return 1;

      const ta = String(a.tipo || "").toLowerCase();
      const tb = String(b.tipo || "").toLowerCase();
      if (ta < tb) return -1;
      if (ta > tb) return 1;

      const aa = String(a.articulo || "").toLowerCase();
      const ab = String(b.articulo || "").toLowerCase();
      if (aa < ab) return -1;
      if (aa > ab) return 1;

      const ia = String(a.id_articulo_origen || "").toLowerCase();
      const ib = String(b.id_articulo_origen || "").toLowerCase();
      if (ia < ib) return -1;
      if (ia > ib) return 1;
      return 0;
    });
  }, [items, q]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = clamp(page, 1, totalPages);

  const pageRows = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, pageSize, safePage]);

  useEffect(() => {
    // si cambia búsqueda o pageSize, volvemos a página 1
    setPage(1);
  }, [q, pageSize]);

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Categorización</h1>
          <p className="mt-1 text-sm text-slate-600">
            Tabla de artículos clasificados (id, artículo, categoría y tipo).
          </p>
        </div>

        <a
          href={jsonSrc}
          target="_blank"
          rel="noreferrer"
          className="text-sm px-3 py-2 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition"
        >
          Abrir JSON
        </a>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <label className="text-sm text-slate-700">
              <span className="sr-only">Buscar</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar por id, artículo, categoría o tipo…"
                className="w-[min(520px,80vw)] rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-blue-200"
              />
            </label>

            <div className="text-xs text-slate-500">
              Mostrando{" "}
              <span className="font-medium text-slate-700">{pageRows.length}</span>{" "}
              de <span className="font-medium text-slate-700">{total}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-700">
              <span className="mr-2 text-xs text-slate-500">Filas</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="rounded-lg border border-slate-200 px-2 py-2 text-sm outline-none focus:ring-4 focus:ring-blue-200 bg-white"
              >
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
              </select>
            </label>

            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              className="px-3 py-2 rounded-lg text-sm border border-slate-200 disabled:opacity-40 hover:bg-slate-50 transition"
            >
              ←
            </button>
            <div className="text-sm text-slate-700 tabular-nums">
              {safePage} / {totalPages}
            </div>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              className="px-3 py-2 rounded-lg text-sm border border-slate-200 disabled:opacity-40 hover:bg-slate-50 transition"
            >
              →
            </button>
          </div>
        </div>

        {error ? (
          <div className="p-5 text-sm text-rose-700 bg-rose-50">
            No se pudo cargar el JSON ({jsonSrc}): {error}
          </div>
        ) : loading ? (
          <div className="p-5 text-sm text-slate-600">Cargando artículos…</div>
        ) : (
          <div className="max-h-[68vh] overflow-auto">
            <table className="min-w-[980px] w-full text-sm">
              <thead className="sticky top-0 bg-slate-50 text-slate-700">
                <tr>
                  <th className="text-left font-semibold px-4 py-3 border-b border-slate-200">
                    id_articulo_origen
                  </th>
                  <th className="text-left font-semibold px-4 py-3 border-b border-slate-200">
                    articulo
                  </th>
                  <th className="text-left font-semibold px-4 py-3 border-b border-slate-200">
                    categoria
                  </th>
                  <th className="text-left font-semibold px-4 py-3 border-b border-slate-200">
                    tipo
                  </th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((it) => (
                  <tr
                    key={`${it.id_articulo_origen}-${it.articulo}`}
                    className="odd:bg-white even:bg-slate-50/30 align-top"
                  >
                    <td className="px-4 py-2 border-b border-slate-100 font-medium text-slate-800 whitespace-nowrap">
                      {it.id_articulo_origen}
                    </td>
                    <td className="px-4 py-2 border-b border-slate-100 text-slate-800">
                      {it.articulo}
                    </td>
                    <td className="px-4 py-2 border-b border-slate-100 text-slate-800">
                      {it.categoria}
                    </td>
                    <td className="px-4 py-2 border-b border-slate-100 text-slate-800">
                      {it.tipo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

