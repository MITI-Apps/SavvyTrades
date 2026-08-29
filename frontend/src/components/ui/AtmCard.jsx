import { fmtCurrency, fmtPercent } from '../../utils'

export default function AtmCard({
  name,
  balance,
  pl,
  plClass,
  size = 'md',
  className = '',
  shadowClass = 'shadow-card',
}) {
  const sm = size === 'sm'
  const displayBalance = typeof balance === 'number' ? fmtCurrency(balance) : balance
  const displayPl = typeof pl === 'number' ? fmtPercent(pl) : pl
  const resolvedPlClass = plClass || (typeof pl === 'number' && pl < 0 ? 'text-rose' : 'text-mint')

  return (
    <div
      className={`relative overflow-hidden rounded-[32px] border border-white/10 atm-bg ${shadowClass} p-6 ${
        sm ? 'h-[170px] p-5' : 'h-[190px]'
      } ${className}`}
    >
      <div className="sheen pointer-events-none absolute inset-0" />
      <div className="relative z-[1] flex items-start justify-between">
        <div
          className={`flex items-center gap-2 font-bold uppercase tracking-[0.06em] text-gold1 ${
            sm ? 'text-[11px]' : 'text-[12.5px]'
          }`}
        >
          <span>◆</span> SavvyTrades
        </div>
        <div
          className={`rounded-[6px] bg-gradient-to-br from-gold1 to-gold2 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)] ${
            sm ? 'h-[22px] w-[30px]' : 'h-7 w-[38px]'
          }`}
        />
      </div>
      <div
        className={`relative z-[1] text-[11.5px] uppercase tracking-[0.04em] text-ink-3 ${
          sm ? 'mt-[14px]' : 'mt-5'
        }`}
      >
        Current Balance
      </div>
      <div
        className={`relative z-[1] font-display font-semibold tabular-nums tracking-tight ${
          sm ? 'mt-1 text-[22px]' : 'mt-1.5 text-[32px]'
        }`}
      >
        {displayBalance}
      </div>
      <div
        className={`relative z-[1] flex items-end justify-between ${
          sm ? 'mt-2.5' : 'mt-5'
        }`}
      >
        <div className={`font-semibold text-ink-2 ${sm ? 'text-[11.5px]' : 'text-[13px]'}`}>
          {name}
        </div>
        {displayPl && (
          <div className={`font-bold ${sm ? 'text-[11px]' : 'text-[12.5px]'} ${resolvedPlClass}`}>
            {displayPl}
          </div>
        )}
      </div>
    </div>
  )
}
