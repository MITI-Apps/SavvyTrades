import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useAccounts } from '../../hooks/useData'
import BottomNav from './BottomNav'
import { IconGrid, IconJournal, IconPlus, IconGear, IconLogout } from '../Icons'

function Sidebar() {
  const { pathname } = useLocation()
  const { user, logout } = useAuth()
  const { accounts, loading } = useAccounts()
  const needsAccount = !loading && accounts.length === 0
  const activeAccountId = localStorage.getItem('activeAccountId') || accounts[0]?.id || ''

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '??'

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: IconGrid },
    { to: '/journal', label: 'Journal', icon: IconJournal },
    {
      to: needsAccount ? '/new-account' : `/add-trade?account=${activeAccountId}`,
      label: 'Add Trade',
      icon: IconPlus,
    },
    { to: '/settings', label: 'Settings', icon: IconGear },
  ]

  const isActive = (to) =>
    to === '/journal'
      ? pathname.startsWith('/journal') || pathname.startsWith('/trade')
      : pathname.startsWith(to)

  return (
    <aside className="sticky top-0 z-40 flex h-dvh w-[260px] shrink-0 flex-col border-r border-border bg-surface/80 backdrop-blur-xl xl:w-[280px]">
      <div className="flex h-16 items-center gap-2.5 border-b border-border px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue1 to-blue2">
          <span className="font-display text-sm font-bold text-[#0b0d13]">S</span>
        </div>
        <span className="font-display text-[15px] font-semibold tracking-tight">SavvyTrades</span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-semibold transition ${
              isActive(to)
                ? 'bg-gradient-to-br from-blue1/15 to-blue2/10 text-ink'
                : 'text-ink-3 hover:bg-white/[0.04] hover:text-ink-2'
            }`}
          >
            <Icon width={19} height={19} strokeWidth={isActive(to) ? 2 : 1.6} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-border p-3">
        <Link
          to="/settings"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-white/[0.04]"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue1 to-blue2 font-display text-xs font-bold text-[#0b0d13]">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13px] font-semibold">{user?.name || 'User'}</div>
            <div className="truncate text-[11px] text-ink-3">{user?.email || ''}</div>
          </div>
        </Link>
        <button
          type="button"
          onClick={logout}
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-ink-3 transition hover:bg-white/[0.04] hover:text-rose"
        >
          <IconLogout width={18} height={18} />
          Log out
        </button>
      </div>
    </aside>
  )
}

export default function AppShell({ withNav = false }) {
  return (
    <div className="bg-page-glows min-h-dvh font-sans text-ink antialiased">
      {/* Mobile layout */}
      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-md flex-col lg:hidden">
        <main className="flex-1 px-5 pb-36 pt-6 sm:px-7">
          <Outlet />
        </main>
        {withNav && <BottomNav />}
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:grid lg:min-h-dvh lg:grid-cols-[260px_1fr] xl:grid-cols-[280px_1fr]">
        <Sidebar />
        <main className="min-h-dvh px-8 py-8 2xl:px-12">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
