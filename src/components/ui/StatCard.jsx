import GlassCard from './GlassCard'

export default function StatCard({ label, value, valueClass = '', className = '', children, ...rest }) {
  return (
    <GlassCard className={`p-4 ${className}`} {...rest}>
      <div className="text-[11.5px] font-semibold uppercase tracking-[0.05em] text-ink-3">
        {label}
      </div>
      <div className={`mt-2 font-display text-[21px] font-semibold tabular-nums ${valueClass}`}>
        {value}
      </div>
      {children}
    </GlassCard>
  )
}