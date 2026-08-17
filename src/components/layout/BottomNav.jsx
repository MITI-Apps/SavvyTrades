import { Link, useLocation } from 'react-router-dom'
import { IconGrid, IconJournal, IconHistory, IconGear, IconPlus } from '../Icons'

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: IconGrid },
  { to: '/journal', label: 'Journal', icon: IconJournal },
  { to: '/add-trade', label: 'Add', icon: IconPlus, center: true },
  { to: '/history', label: 'History', icon: IconHistory },
  { to: '/settings', label: 'Settings', icon: IconGear },
]

export default function BottomNav() {
  const { pathname } = useLocation()
  const isActive = (to) =>
    to === '/journal'
      ? pathname.startsWith('/journal') || pathname.startsWith('/trade')
      : pathname.startsWith(to)
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-md px-4 pb-4 lg:left-auto lg:right-0 lg:w-[28rem]">
      <div className="relative mx-auto flex h-[74px] items-center justify-around rounded-[28px] border border-border-strong bg-app/75 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
        {items.map(({ to, label, icon: Icon, center }) =>
          center ? (
            <Link key={label} to={to} className="flex h-full flex-col items-center justify-end">
              <span className="-mt-12 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue1 to-blue2 text-[#0b0d13] shadow-add ring-[6px] ring-app transition-transform active:scale-95">
                <Icon width={22} height={22} strokeWidth={2.4} />
              </span>
              <span className="pb-1 text-[10px] font-semibold text-ink-3">{label}</span>
            </Link>
          ) : (
            <Link
              key={label}
              to={to}
              className={`flex flex-col items-center gap-1 py-1 ${isActive(to) ? 'text-ink' : 'text-ink-3'}`}
            >
              <Icon width={21} height={21} />
              <span className="text-[10px] font-semibold">{label}</span>
            </Link>
          ),
        )}
      </div>
    </nav>
  )
}