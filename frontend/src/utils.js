export function fmtPL(n) {
  if (n === 0) return '$0.00'
  return `${n > 0 ? '+' : '-'}$${Math.abs(n).toFixed(2)}`
}

export function fmtCurrency(n) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(n)
}

export function fmtPercent(n) {
  const sign = n >= 0 ? '+' : ''
  return `${sign}${n.toFixed(2)}%`
}

export function fmtDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function fmtTime(iso) {
  const d = new Date(iso)
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

export function fmtDateTime(iso) {
  return `${fmtDate(iso)} · ${fmtTime(iso)}`
}

export function badgeFromSymbol(symbol) {
  if (!symbol) return '??'
  return symbol.replace(/[^A-Z]/gi, '').slice(0, 3).toUpperCase()
}

export function normalizeDirection(dir) {
  return dir?.toLowerCase() === 'buy' ? 'buy' : 'sell'
}

export function normalizeOutcome(outcome) {
  const map = { WIN: 'win', LOSS: 'loss', BREAK_EVEN: 'be', OPEN: 'open' }
  return map[outcome] || outcome?.toLowerCase() || 'open'
}
