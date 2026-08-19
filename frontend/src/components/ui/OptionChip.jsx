export default function OptionChip({ selected = false, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[14px] border px-3 py-[13px] text-[13.5px] font-semibold transition ${
        selected
          ? 'border-transparent bg-gradient-to-br from-blue1 to-blue2 text-[#0b0d13] shadow-primary'
          : 'border-border bg-surface-2 text-ink-2'
      }`}
    >
      {children}
    </button>
  )
}