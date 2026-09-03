import { useState, useEffect, useCallback } from 'react'
import { api } from '../lib/api'

let _accounts = null
let _accountsLoading = true
let _accountsError = null
const _accountsSubscribers = new Set()

function _notifyAccounts() {
  _accountsSubscribers.forEach((cb) => cb())
}

function _fetchAccounts() {
  _accountsLoading = true
  _accountsError = null
  _notifyAccounts()
  api
    .get('/accounts')
    .then((data) => {
      _accounts = data
      _accountsLoading = false
    })
    .catch((err) => {
      _accountsError = err.message
      _accountsLoading = false
    })
    .finally(() => {
      _notifyAccounts()
    })
}

export function useAccounts() {
  const [, forceUpdate] = useState(0)

  const refetch = useCallback(() => {
    _fetchAccounts()
  }, [])

  useEffect(() => {
    const subscriber = () => forceUpdate((c) => c + 1)
    _accountsSubscribers.add(subscriber)

    if (_accounts === null && _accountsLoading) {
      _fetchAccounts()
    }

    return () => {
      _accountsSubscribers.delete(subscriber)
    }
  }, [])

  return {
    accounts: _accounts || [],
    loading: _accountsLoading,
    error: _accountsError,
    refetch,
  }
}

export function useDashboard(accountId) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!accountId) return
    setLoading(true)
    setError(null)
    api
      .get(`/accounts/${accountId}/dashboard`)
      .then((d) => setData(d))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [accountId])

  return { data, loading, error }
}

export function useAccountStats(accountId) {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!accountId) return
    setLoading(true)
    setError(null)
    api
      .get(`/accounts/${accountId}/stats`)
      .then((d) => setStats(d.stats))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [accountId])

  return { stats, loading, error }
}

export function useTrades(accountId, params = {}) {
  const [trades, setTrades] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  function refetch(extraParams = {}) {
    if (!accountId) return
    setLoading(true)
    setError(null)
    const query = new URLSearchParams({ tradingAccountId: accountId, ...params, ...extraParams }).toString()
    api
      .get(`/trades?${query}`)
      .then((d) => {
        setTrades(d.trades)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId])

  return { trades, loading, error, refetch }
}

export function useTrade(id) {
  const [trade, setTrade] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    api
      .get(`/trades/${id}`)
      .then((d) => setTrade(d.trade))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  return { trade, loading, error }
}

export function useEquityCurve(accountId) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!accountId) return
    setLoading(true)
    setError(null)
    api
      .get(`/accounts/${accountId}/equity-curve`)
      .then((d) => setData(d))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [accountId])

  return { data, loading, error }
}
