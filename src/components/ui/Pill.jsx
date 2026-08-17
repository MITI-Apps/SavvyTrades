const variants = {
  mint: 'border-mint/25 bg-mint/10 text-mint',
  rose: 'border-rose/25 bg-rose/10 text-rose',
  amber: 'border-amber/25 bg-amber/10 text-amber',
  neutral: 'border-border bg-white/[0.04] text-ink-2',
}

export default function Pill({ variant = 'neutral', className = '', children }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11.5px] font-bold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}