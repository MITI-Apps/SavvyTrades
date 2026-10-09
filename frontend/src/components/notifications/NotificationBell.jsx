import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  useNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from '../../hooks/useNotifications'
import NotificationList from './NotificationList'
import { IconBell } from '../Icons'

export default function NotificationBell({ variant = 'dropdown', align = 'left', className = '' }) {
  const { notifications, unreadCount, loading, refetch } = useNotifications()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    // Modal variant closes via its backdrop instead of outside-clicks;
    // a document mousedown would close it before list items could be clicked.
    if (variant === 'modal') return
    function handleDocClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleDocClick)
    return () => document.removeEventListener('mousedown', handleDocClick)
  }, [variant])

  function handleToggle() {
    setOpen((prev) => {
      const next = !prev
      if (next) refetch() // pull fresh notifications whenever the panel opens
      return next
    })
  }

  return (
    <div ref={wrapRef} className={className}>
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

      {open && variant === 'dropdown' && (
          <div
            className={`absolute top-full z-50 mt-2 w-[min(300px,calc(100vw-40px))] origin-top rounded-2xl border border-border bg-surface shadow-card ${
              align === 'right' ? 'right-0' : 'left-0'
            }`}
          >
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

      {open && variant === 'modal' &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <div className="relative w-full max-w-sm rounded-3xl border border-border bg-surface p-6 shadow-card">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold">Notifications</h2>
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
              <div className="mx-[-24px] mt-3">
                <NotificationList
                  notifications={notifications}
                  loading={loading}
                  onMarkOne={markNotificationRead}
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}