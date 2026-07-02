import { useEffect } from "react";

export default function Modal({
  open,
  title,
  children,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  onClose,
  tone = "default", // "default" | "danger"
  hideCancel = false,
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink2/80 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="w-full max-w-md card-surface relative animate-[fadeIn_.15s_ease]">
        <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-volt to-transparent" />
        <div className="p-6">
          <p className="eyebrow mb-2">Confirmación</p>
          <h3 id="modal-title" className="text-xl font-semibold text-white mb-3">
            {title}
          </h3>
          <div className="text-sm text-slate-400 leading-relaxed mb-6">{children}</div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            {!hideCancel && (
              <button type="button" className="btn-ghost" onClick={onCancel ?? onClose}>
                {cancelLabel}
              </button>
            )}
            <button
              type="button"
              onClick={onConfirm}
              className={
                tone === "danger"
                  ? "inline-flex items-center justify-center gap-2 rounded-sm bg-red-500 px-6 py-3 font-display font-bold text-white transition-all hover:bg-red-400 active:scale-[0.98]"
                  : "btn-volt"
              }
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
