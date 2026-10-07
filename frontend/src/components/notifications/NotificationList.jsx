import { IconBell, IconPlus, IconShield, IconGrid, IconLock, IconCheck, IconX } from '../Icons'

const TYPE_ICONS = {
  ACCOUNT_CREATED: IconPlus,
  TRADE_REMINDER: IconShield,
  PERFORMANCE_SUMMARY: IconGrid,
  SECURITY_ALERT: IconLock,
  TRADE_CLOSED: IconCheck,
  ACCOUNT_DELETED: IconX,
}

function timeAgo(iso) {
  const seconds = (Date.now() - new Date(iso).getTime()) / 1000
  if (seconds < 60) return 'just now'
  const minutes = seconds / 60
  if (minutes < 60) return `${Math.floor(minutes)}m ago`
  const hours = minutes / 60
  if (hours < 24) return `${Math.floor(hours)}h ago`
  const days = hours / 24
  if (days < 7) return `${Math.floor(days)}d ago`
  return new Date(iso).toLocaleDateString()
}

export default function NotificationList({ notifications, loading, onMarkOne, emptyText = 'No notifications yet' }) {
  if (loading) {
    return <p className="p-4 text-center text-[13px] text-ink-3">Loading notifications…</p>
  }

  if (notifications.length === 0) {
    return <p className="p-4 text-center text-[13px] text-ink-3">{emptyText}</p>
  }

  return (
    <div className="max-h-80 overflow-y-auto">
      <ul className="divide-y divide-border">
        {notifications.map((n) => {
          const Icon = TYPE_ICONS[n.type] || IconBell
          const unread = !n.readAt
          return (
            <li key={n.id}>
              <button
                type="button"
                onClick={() => unread && onMarkOne?.(n.id)}
                className={`flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-white/[0.03] ${
                  unread ? '' : 'opacity-60'
                }`}
              >
                <span
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] ${
                    unread ? 'bg-blue1/15 text-blue1' : 'bg-surface-3 text-ink-2'
                  }`}
                >
                  <Icon width={16} height={16} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block truncate text-[13px] ${unread ? 'font-semibold' : 'font-medium text-ink-2'}`}>
                    {n.title}
                  </span>
                  <span className="mt-0.5 block text-[12px] leading-snug text-ink-3">{n.body}</span>
                  <span className="mt-1 block text-[11px] text-ink-3">{timeAgo(n.createdAt)}</span>
                </span>
                {unread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue1" />}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}