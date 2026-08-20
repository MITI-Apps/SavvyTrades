import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAccounts, useTrades } from '../hooks/useData'
import { fmtDate, fmtTime, badgeFromSymbol, normalizeDirection, normalizeOutcome } from '../utils'
import { IconPlus, IconSearch, IconFilter } from '../components/Icons'
import TradeCard from '../components/ui/TradeCard'

export default function Journal() {
  const [query, setQuery] = useState('')
  const { accounts } = useAccounts()
  const { trades, loading } = useTrades(accounts[0]?.id)

  const displayTrades = trades.map((t) => ({
    ...t,
    badge: badgeFromSymbol(t.symbol),
    date: fmtDate(t.openedAt),
    time: fmtTime(t.openedAt),
    direction: normalizeDirection(t.direction),
    outcome: normalizeOutcome(t.outcome),
    pl: t.pnl,
    reason: t.confluence,
  }))

  const filtered = displayTrades.filter((t) =>
    t.symbol.toLowerCase().includes(query.trim().toLowerCase()),
  )

  return (
    <div>
      <div className="animate-fade-up mt-4 flex items-center justify-between">
        <h1 className="font-display text-[19px] font-semibold">Journal</h1>
        <Link
          to="/add-trade"
          className="flex h-[38px] w-[38px] items-center justify-center rounded-xl border border-border bg-surface-2"
          aria-label="Add trade"
        >
          <IconPlus className="text-blue1" strokeWidth={2.2} />
        </Link>
      </div>

      <div className="animate-fade-up mt-4 flex items-center gap-2.5" style={{ animationDelay: '0.04s' }}>
        <div className="flex flex-1 items-center gap-2.5 rounded-[14px] border border-border bg-surface-2 px-3.5 py-3">
          <IconSearch className="text-ink-2/70" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol…"
            className="w-full bg-transparent text-[14px] text-ink outline-none placeholder:text-ink-3"
          />
        </div>
        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-border bg-surface-2"
          aria-label="Filter trades"
        >
          <IconFilter className="text-ink-2" />
        </button>
      </div>

      <div className="mt-5 flex flex-col gap-2.5">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-blue1" />
          </div>
        ) : (
          <>
            {filtered.map((trade, i) => (
              <TradeCard key={trade.id} trade={trade} delay={0.04 * i} />
            ))}
            {filtered.length === 0 && !loading && (
              <div className="animate-fade-up rounded-3xl border border-border bg-gradient-to-b from-white/[0.07] to-white/[0.045] p-8 text-center text-sm text-ink-3">
                {query ? `No trades match "${query}".` : 'No trades yet. Add your first trade!'}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
