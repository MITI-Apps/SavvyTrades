import { useState, useEffect, useCallback } from 'react'
import { api } from '../lib/api'

// Module-level cache (same pattern as useAccounts) so the bell badge and the
// Settings feed stay in sync no matter how many components read this hook.
let _notifications = []
let _unreadCount = 0
let _fetched = false
let _loading = false
let _error = null
const _subscribers = new Set()

function _notify() {
  _subscribers.forEach((cb) => cb())
}

async function _fetchNotifications() {
  _loading = true
  _error = null
  _notify()
  try {
    const data = await api.get('/notifications')
    _notifications = data.notifications || []
    _unreadCount = data.unreadCount || 0
  } catch (err) {
    _error = err.message
  } finally {
    _loading = false
    _fetched = true
    _notify()
  }
}

export function useNotifications() {
  const [, forceUpdate] = useState(0)

  const refetch = useCallback(() => {
    _fetchNotifications()
  }, [])

  useEffect(() => {
    const subscriber = () => forceUpdate((c) => c + 1)
    _subscribers.add(subscriber)

    if (!_fetched) {
      _fetchNotifications()
    }

    return () => {
      _subscribers.delete(subscriber)
    }
  }, [])

  return {
    notifications: _notifications,
    unreadCount: _unreadCount,
    loading: _loading,
    error: _error,
    refetch,
  }
}

// Mark a single notification read (server + local cache together)
export async function markNotificationRead(id) {
  try {
    const data = await api.patch(`/notifications/${id}/read`)
    if (data?.notification) {
      const target = _notifications.find((n) => n.id === id)
      if (target) {
        target.readAt = data.notification.readAt
        _unreadCount = _notifications.filter((n) => !n.readAt).length
        _notify()
      }
    }
  } catch {
    // Swallow: the list refresh will surface any real errors
  }
}

// Mark every notification read (server + local cache together)
export async function markAllNotificationsRead() {
  try {
    const data = await api.patch('/notifications/read-all')
    if ((data?.updated ?? 0) > 0) {
      _notifications.forEach((n) => {
        if (!n.readAt) n.readAt = new Date().toISOString()
      })
      _unreadCount = 0
      _notify()
    }
  } catch {
    // Swallow: the list refresh will surface any real errors
  }
}