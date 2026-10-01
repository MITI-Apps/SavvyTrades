import { useEffect, useRef, useState } from 'react'
import {
  useNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from '../../hooks/useNotifications'
import NotificationList from './NotificationList'
import { IconBell } from '../Icons'

export default function NotificationBell() {
  const { notifications, unreadCount, loading, refetch } = useNotifications()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    function handleDocClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleDocClick)
    return () => document.removeEventListener('mousedown', handleDocClick)
  }, [])

  function handleToggle() {
    setOpen((prev) => {
      const next = !prev
      if (next) refetch() // pull fresh notifications whenever the panel opens
      return next
    })
  }

  return (
    <div ref={wrapRef}>
      <button
        type="button"
        onClick={handleToggle}
        aria-label="Notifications"
        className="relative flex h-8 w-8 items-center justify-center rounded-lg text-ink-2 transition hover:bg-white/[0.06] hover:text-ink"
      >
        <IconBell width={18} height={18} />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose px-1 text-[10px] font-bold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-[300px] origin-top rounded-2xl border border-border bg-surface shadow-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="text-[13px] font-semibold">Notifications</span>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={() => markAllNotificationsRead()}
                className="text-[12px] font-semibold text-blue1 transition hover:text-blue2"
              >
                Mark all read
              </button>
            )}
          </div>
          <NotificationList
            notifications={notifications}
            loading={loading}
            onMarkOne={markNotificationRead}
          />
        </div>
      )}
    </div>
  )
}