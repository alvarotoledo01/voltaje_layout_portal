import { useEffect, useMemo, useState } from "react";

type Prox = "cerca" | "medio" | "lejos" | string;

type Row = {
  shelf_num: number;
  categoria: string;
  proximidad: Prox;
};

type Payload = {
  layout?: string;
  rows: Row[];
};

function proxRank(p: Prox): number {
  const v = String(p || "").toLowerCase();
  if (v === "cerca") return 0;
  if (v === "medio") return 1;
  if (v === "lejos") return 2;
  return 9;
}

function ProxBadge({ value }: { value: Prox }) {
  const v = String(value || "");
  const key = v.toLowerCase();
  const cls =
    key === "cerca"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : key === "medio"
        ? "bg-blue-50 text-blue-700 ring-blue-200"
        : key === "lejos"
          ? "bg-orange-50 text-orange-700 ring-orange-200"
          : "bg-slate-50 text-slate-700 ring-slate-200";
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
        cls,
      ].join(" ")}
    >
      {v || "—"}
    </span>
  );
}

export default function LayoutTable({ src }: { src: string }) {
  const [payload, setPayload] = useState<Payload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setPayload(null);
    setError(null);

    fetch(src, { cache: "no-store" })
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = (await r.json()) as Payload;
        if (!data?.rows || !Array.isArray(data.rows)) {
          throw new Error("Formato inválido (se esperaba { rows: [] })");
        }
        if (!cancelled) setPayload(data);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : String(e));
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  const rows = useMemo(() => {
    const r = payload?.rows ?? [];
    return [...r].sort((a, b) => {
      const ca = String(a.categoria || "").toLowerCase();
      const cb = String(b.categoria || "").toLowerCase();
      if (ca < cb) return -1;
      if (ca > cb) return 1;
      const pa = proxRank(a.proximidad);
      const pb = proxRank(b.proximidad);
      if (pa !== pb) return pa - pb;
      return Number(a.shelf_num) - Number(b.shelf_num);
    });
  }, [payload]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-200">
        <div className="text-sm font-semibold text-slate-900">
          Asignación de categorías por estante
        </div>
        <div className="mt-1 text-xs text-slate-500">
          Orden: categoría → proximidad → estante #
        </div>
      </div>

      {error ? (
        <div className="p-5 text-sm text-rose-700 bg-rose-50">
          <div className="font-medium">
            No se pudo cargar la tabla ({src}): {error}
          </div>
          <div className="mt-1 text-rose-700/90">
            Tip: asegurate de haber generado y copiado los JSON con{" "}
            <code className="px-1 rounded bg-rose-100">npm run sync:layouts</code>.
          </div>
        </div>
      ) : payload === null ? (
        <div className="p-5 text-sm text-slate-600">Cargando tabla…</div>
      ) : (
        <div className="max-h-[50vh] md:max-h-[42vh] overflow-auto">
          <table className="min-w-[520px] w-full text-sm">
            <thead className="sticky top-0 bg-slate-50 text-slate-700">
              <tr>
                <th className="text-left font-semibold px-3 md:px-4 py-3 border-b border-slate-200">
                  Estante #
                </th>
                <th className="text-left font-semibold px-3 md:px-4 py-3 border-b border-slate-200">
                  Categoría
                </th>
                <th className="text-left font-semibold px-3 md:px-4 py-3 border-b border-slate-200">
                  Proximidad
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={`${r.shelf_num}-${r.categoria}-${r.proximidad}`}
                  className="odd:bg-white even:bg-slate-50/30"
                >
                  <td className="px-3 md:px-4 py-2 border-b border-slate-100 tabular-nums whitespace-nowrap">
                    {r.shelf_num}
                  </td>
                  <td className="px-3 md:px-4 py-2 border-b border-slate-100">
                    {r.categoria || "Sin asignar"}
                  </td>
                  <td className="px-3 md:px-4 py-2 border-b border-slate-100 whitespace-nowrap">
                    <ProxBadge value={r.proximidad} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

