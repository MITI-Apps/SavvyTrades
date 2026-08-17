import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconPlus, IconSearch, IconFilter } from '../components/Icons'
import TradeCard from '../components/ui/TradeCard'
import { trades } from '../data/trades'

export default function Journal() {
  const [query, setQuery] = useState('')
  const filtered = trades.filter((t) =>
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
        {filtered.map((trade, i) => (
          <TradeCard key={trade.id} trade={trade} delay={0.04 * i} />
        ))}
        {filtered.length === 0 && (
          <div className="animate-fade-up rounded-3xl border border-border bg-gradient-to-b from-white/[0.07] to-white/[0.045] p-8 text-center text-sm text-ink-3">
            No trades match “{query}”.
          </div>
        )}
      </div>
    </div>
  )
}