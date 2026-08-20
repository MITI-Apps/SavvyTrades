export function fmtPL(n) {
  if (n === 0) return '$0.00'
  return `${n > 0 ? '+' : '-'}$${Math.abs(n).toFixed(2)}`
}