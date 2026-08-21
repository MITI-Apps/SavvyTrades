import { Link } from 'react-router-dom'

export default function EmptyState({ children, ctaLabel = 'Create your first account', to = '/new-account', className = '', style }) {
  return (
    <div
      className={`animate-fade-up rounded-3xl border border-border bg-gradient-to-b from-white/[0.07] to-white/[0.045] p-8 text-center ${className}`}
      style={style}
    >
      {children}
      <Link
        to={to}
        className="mt-4 inline-block rounded-2xl bg-gradient-to-br from-blue1 to-blue2 px-6 py-3 text-sm font-bold text-[#0b0d13] transition-transform active:scale-95"
      >
        {ctaLabel}
      </Link>
    </div>
  )
}
