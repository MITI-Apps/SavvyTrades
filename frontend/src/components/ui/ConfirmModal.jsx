export default function ConfirmModal({ open, onClose, onConfirm, title, message, confirmLabel = 'Delete', loading = false }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm rounded-3xl border border-border bg-surface p-6 shadow-card">
        <h2 className="font-display text-lg font-semibold">{title}</h2>
        <p className="mt-2 text-[13px] text-ink-2">{message}</p>
        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 rounded-xl bg-rose px-4 py-2.5 text-[13px] font-bold text-white transition hover:brightness-110 disabled:opacity-50"
          >
            {loading ? 'Deleting…' : confirmLabel}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-[13px] font-semibold text-ink-2 transition hover:bg-surface-3"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
