import { ReactNode, useEffect } from "react";

export default function Modal({
  isOpen,
  title,
  onClose,
  children,
}: {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Cerrar modal"
        className="absolute inset-0 bg-slate-900/40"
        onClick={onClose}
      />

      <div className="relative mx-auto my-10 w-[min(1100px,92vw)]">
        <div className="max-h-[85vh] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl flex flex-col">
          <div className="shrink-0 flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
            <div className="text-sm font-semibold text-slate-900">{title}</div>
            <button
              onClick={onClose}
              className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition"
            >
              Cerrar
            </button>
          </div>
          <div className="p-4 overflow-y-auto min-h-0">{children}</div>
        </div>
      </div>
    </div>
  );
}

