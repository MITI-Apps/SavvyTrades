import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AtmCard from '../components/ui/AtmCard'
import GlassCard from '../components/ui/GlassCard'
import StatCard from '../components/ui/StatCard'
import AccountsWallet from '../components/ui/AccountsWallet'
import { IconChevronDown } from '../components/Icons'
import { accounts } from '../data/accounts'

export default function Dashboard() {
  const [walletOpen, setWalletOpen] = useState(false)
  const [activeId, setActiveId] = useState(accounts[0].id)
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef(0)
  const active = accounts.find((a) => a.id === activeId)

  const openWallet = () => setWalletOpen(true)

  return (
    <div>
      <div className="animate-fade-up mt-4 flex items-center justify-between">
        <div>
          <div className="text-xs text-ink-3">Good evening</div>
          <div className="font-display text-lg font-bold">Alex Morgan</div>
        </div>
        <Link
          to="/settings"
          aria-label="Settings"
          className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-gradient-to-br from-blue1 to-blue2 font-display text-sm font-bold text-[#0b0d13] transition-transform active:scale-95"
        >
          AM
        </Link>
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={openWallet}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') openWallet()
        }}
        onPointerDown={(e) => {
          dragStart.current = e.clientY
          setDragging(true)
        }}
        onPointerUp={(e) => {
          const dy = e.clientY - dragStart.current
          setDragging(false)
          if (dy > 50 || Math.abs(dy) < 12) openWallet()
        }}
        onPointerCancel={() => setDragging(false)}
        onPointerLeave={() => setDragging(false)}
        className={`animate-fade-up relative mt-5 cursor-pointer touch-pan-x select-none transition-transform duration-200 ${
          dragging ? 'scale-[0.985]' : ''
        }`}
        style={{ animationDelay: '0.04s' }}
      >
        <div
          className="absolute inset-x-3 -bottom-2.5 z-0 h-full rounded-[32px] border border-border bg-surface-2"
          aria-hidden
        />
        <div
          className="absolute inset-x-6 -bottom-5 z-0 h-full rounded-[32px] border border-border bg-surface"
          aria-hidden
        />
        <div className="relative z-[1]">
          <AtmCard name={active.name} balance={active.balance} pl={active.pl} />
        </div>
      </div>

      <div
        className="animate-fade-up mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-ink-3"
        style={{ animationDelay: '0.06s' }}
      >
        Pull down or tap the card to open your wallet
        <IconChevronDown className="text-ink-2" />
      </div>

      <div
        className="animate-fade-up mt-6 flex items-baseline justify-between"
        style={{ animationDelay: '0.09s' }}
      >
        <div className="font-display text-base font-semibold">Performance</div>
        <div className="text-xs text-ink-3">All time</div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <StatCard className="animate-fade-up" label="Total Trades" value="187" />
        <StatCard
          className="animate-fade-up"
          label="Win Rate"
          value="64.2%"
          valueClass="text-mint"
        />
        <GlassCard
          className="animate-fade-up col-span-2 flex items-center justify-between p-4"
          style={{ animationDelay: '0.09s' }}
        >
          <div>
            <div className="text-[11.5px] font-semibold uppercase tracking-[0.05em] text-ink-3">
              Total P&L
            </div>
            <div className="mt-1.5 font-display text-[21px] font-semibold tabular-nums text-mint">
              +$28,450.32
            </div>
          </div>
          <svg width="90" height="34" viewBox="0 0 90 34" fill="none" aria-hidden>
            <defs>
              <linearGradient id="pl-grad" x1="0" y1="0" x2="90" y2="0">
                <stop stopColor="#3fd9ac" />
                <stop offset="1" stopColor="#7c93ff" />
              </linearGradient>
            </defs>
            <path
              d="M0 28 L12 24 L24 26 L36 16 L48 19 L60 8 L72 12 L90 2"
              stroke="url(#pl-grad)"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </GlassCard>
        <StatCard
          className="animate-fade-up"
          label="Wins"
          value="120"
          valueClass="text-mint"
        />
        <StatCard
          className="animate-fade-up"
          label="Losses"
          value="58"
          valueClass="text-rose"
        />
        <StatCard className="animate-fade-up" label="Break-even" value="9" />
        <StatCard className="animate-fade-up" label="Profit Factor" value="2.14" />
        <StatCard
          className="animate-fade-up"
          label="Avg Win"
          value="+$612.40"
          valueClass="text-mint"
        />
        <StatCard
          className="animate-fade-up"
          label="Avg Loss"
          value="-$298.15"
          valueClass="text-rose"
        />
        <StatCard
          className="animate-fade-up col-span-2"
          label="Average P&L per Trade"
          value="+$152.14"
          valueClass="text-mint"
        />
      </div>

      <AccountsWallet
        open={walletOpen}
        onClose={() => setWalletOpen(false)}
        activeId={activeId}
        onSetActive={setActiveId}
      />
    </div>
  )
}