import { Link, Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'

export default function AppShell({ withNav = false }) {
  return (
    <div className="bg-page-glows min-h-dvh font-sans text-ink antialiased">
      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-md flex-col lg:max-w-none lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)]">
        <aside className="hidden min-h-dvh flex-col justify-center px-12 py-20 lg:flex xl:px-20">
          <span className="animate-fade-up inline-flex w-fit items-center gap-2 rounded-full border border-border bg-white/[0.045] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-mint to-blue1 shadow-[0_0_10px_rgba(63,217,172,0.8)]" />
            SavvyTrade · Premium Trading Journal
          </span>
          <h1
            className="animate-fade-up mt-6 max-w-[620px] font-display text-[clamp(36px,4.5vw,56px)] font-semibold leading-[1.05] tracking-[-0.02em]"
            style={{ animationDelay: '0.06s' }}
          >
            Your trading journal, built like a{' '}
            <span className="bg-gradient-to-br from-blue1 to-blue2 bg-clip-text text-transparent">
              private bank app.
            </span>
          </h1>
          <p
            className="animate-fade-up mt-4 max-w-[540px] text-base leading-relaxed text-ink-2"
            style={{ animationDelay: '0.12s' }}
          >
            Dark, glass-surfaced, and understated. Log trades, review screenshots, and track
            performance with the polish of a digital bank — never a spreadsheet.
          </p>
          <div className="animate-fade-up mt-10 flex items-center gap-3" style={{ animationDelay: '0.18s' }}>
            <Link
              to="/dashboard"
              className="rounded-2xl bg-gradient-to-br from-blue1 to-blue2 px-6 py-3.5 text-sm font-bold text-[#0b0d13] shadow-primary transition hover:brightness-105 active:scale-[0.97]"
            >
              Open Dashboard
            </Link>
            <Link
              to="/login"
              className="rounded-2xl border border-border-strong bg-white/[0.07] px-6 py-3.5 text-sm font-bold text-ink transition hover:bg-white/[0.12] active:scale-[0.97]"
            >
              Log In
            </Link>
          </div>
        </aside>
        <div className="flex min-h-dvh flex-col lg:border-l lg:border-border">
          <main className="flex-1 px-5 pb-36 pt-6 sm:px-7">
            <Outlet />
          </main>
          {withNav && <BottomNav />}
        </div>
      </div>
    </div>
  )
}