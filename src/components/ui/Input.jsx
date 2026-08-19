export default function Input({ label, icon: Icon, className = '', inputClassName = '', ...rest }) {
  const base =
    'w-full rounded-[18px] border border-border bg-surface-2 py-[15px] text-[15px] text-ink outline-none transition placeholder:text-ink-3 focus:border-blue1 focus:ring-4 focus:ring-blue1/15'
  return (
    <div className={className}>
      {label && (
        <label className="mb-2 block text-xs font-semibold tracking-wide text-ink-2">
          {label}
        </label>
      )}
      {Icon ? (
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-2/60">
            <Icon width={18} height={18} />
          </span>
          <input className={`${base} pl-12 pr-4 ${inputClassName}`} {...rest} />
        </div>
      ) : (
        <input className={`${base} px-4 ${inputClassName}`} {...rest} />
      )}
    </div>
  )
}