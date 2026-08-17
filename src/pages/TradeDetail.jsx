import { Link, useParams } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import GlassCard from '../components/ui/GlassCard'
import Pill from '../components/ui/Pill'
import { fmtPL } from '../utils'
import { trades } from '../data/trades'

function Shot({ color, gradientId }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={color} stopOpacity="0.25" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 70 L15 60 L30 65 L45 45 L60 50 L75 30 L100 20 L100 100 L0 100 Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M0 70 L15 60 L30 65 L45 45 L60 50 L75 30 L100 20"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  )
}

function InfoRow({ k, v, vClass = '' }) {
  return (
    <div className="flex justify-between border-b border-border py-3 text-[13.5px] last:border-b-0">
      <span className="text-ink-3">{k}</span>
      <span className={`font-semibold ${vClass}`}>{v}</span>
    </div>
  )
}

export default function TradeDetail() {
  const { id } = useParams()
  const trade = trades.find((t) => t.id === Number(id))

  if (!trade) {
    return (
      <div className="flex flex-col items-center py-24 text-center">
        <h1 className="font-display text-2xl font-semibold">Trade not found</h1>
        <p className="mt-2 text-sm text-ink-3">This journal entry doesn't exist anymore.</p>
        <Link
          to="/journal"
          className="mt-8 rounded-2xl bg-gradient-to-br from-blue1 to-blue2 px-6 py-3.5 text-sm font-bold text-[#0b0d13] shadow-primary transition hover:brightness-105"
        >
          Back to Journal
        </Link>
      </div>
    )
  }

  const outcomeClass =
    trade.outcome === 'win' ? 'mint' : trade.outcome === 'loss' ? 'rose' : 'amber'

  return (
    <div>
      <div className="animate-fade-up">
        <PageHeader
          backTo="/journal"
          title={trade.symbol}
          sub={`${trade.dateFull} · ${trade.timeFull}`}
        />
      </div>

      <GlassCard className="animate-fade-up mt-4 p-5" style={{ animationDelay: '0.04s' }}>
        <div className="flex items-center gap-2">
          <Pill variant={trade.direction === 'buy' ? 'mint' : 'rose'}>
            {trade.direction === 'buy' ? '▲ Buy' : '▼ Sell'}
          </Pill>
          <Pill variant={outcomeClass} className="capitalize">
            {trade.outcome}
          </Pill>
        </div>
        <div className="mt-4 text-[11.5px] font-semibold uppercase tracking-[0.05em] text-ink-3">
          Profit / Loss
        </div>
        <div
          className={`mt-1 font-display text-[30px] font-semibold tabular-nums tracking-tight ${
            trade.outcome === 'win'
              ? 'text-mint'
              : trade.outcome === 'loss'
                ? 'text-rose'
                : 'text-amber'
          }`}
        >
          {fmtPL(trade.pl)}
        </div>
      </GlassCard>

      <GlassCard className="animate-fade-up mt-4 px-[18px] py-3" style={{ animationDelay: '0.09s' }}>
        <InfoRow k="Symbol" v={trade.symbol} />
        <InfoRow k="Direction" v={trade.direction === 'buy' ? 'Buy' : 'Sell'} />
        <InfoRow
          k="Outcome"
          v={trade.outcome === 'win' ? 'Win' : trade.outcome === 'loss' ? 'Loss' : 'Break-even'}
          vClass={trade.outcome === 'loss' ? 'text-rose' : trade.outcome === 'win' ? 'text-mint' : 'text-amber'}
        />
        {trade.reason && <InfoRow k="Trade reason" v={trade.reason} />}
      </GlassCard>

      {trade.notes && (
        <GlassCard className="animate-fade-up mt-4 p-[18px]" style={{ animationDelay: '0.16s' }}>
          <span className="text-xs font-semibold tracking-wide text-ink-2">Notes</span>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">{trade.notes}</p>
        </GlassCard>
      )}

      <div className="animate-fade-up mt-5" style={{ animationDelay: '0.22s' }}>
        <div className="font-display text-[15px] font-semibold">Screenshots</div>
        <div className="mt-2.5 grid grid-cols-2 gap-3">
          <div className="relative aspect-[1/1.1] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-[#1c2230] to-[#141821]">
            <Shot color="#3fd9ac" gradientId="shot-before" />
            <span className="absolute bottom-2 left-2 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-bold tracking-wide text-ink-2 backdrop-blur-md">
              Before
            </span>
          </div>
          <div className="relative aspect-[1/1.1] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-[#1c2230] to-[#141821]">
            <Shot color="#7c93ff" gradientId="shot-after" />
            <span className="absolute bottom-2 left-2 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-bold tracking-wide text-ink-2 backdrop-blur-md">
              After
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}