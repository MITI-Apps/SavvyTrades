import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import { useAccounts } from '../hooks/useData'
import { IconCamera, IconX } from '../components/Icons'
import PageHeader from '../components/ui/PageHeader'
import GlassCard from '../components/ui/GlassCard'
import Input from '../components/ui/Input'
import OptionChip from '../components/ui/OptionChip'
import Button from '../components/ui/Button'

function UploadBox({ filename, onFile }) {
  return (
    <label className="flex cursor-pointer flex-col items-center gap-2 rounded-[24px] border-[1.5px] border-dashed border-border-strong bg-surface-2 px-4 py-5 text-center transition hover:border-border-strong/50">
      <IconCamera className="text-ink-2" />
      <span className="text-[12.5px] font-semibold text-ink-3">
        {filename || 'Tap to upload chart image'}
      </span>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onFile(e.target.files[0] || null)}
      />
    </label>
  )
}

export default function AddTrade() {
  const navigate = useNavigate()
  const { accounts } = useAccounts()
  const [symbol, setSymbol] = useState('')
  const [direction, setDirection] = useState('buy')
  const [outcome, setOutcome] = useState('win')
  const [pnl, setPnl] = useState('')
  const [reason, setReason] = useState('')
  const [notes, setNotes] = useState('')
  const [accountId, setAccountId] = useState('')
  const [beforeFile, setBeforeFile] = useState(null)
  const [afterFile, setAfterFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const activeAccountId = accountId || accounts[0]?.id || ''

  async function handleSubmit() {
    if (!symbol.trim() || !activeAccountId) {
      setError('Please fill in symbol and select an account')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      const outcomeMap = { win: 'WIN', loss: 'LOSS', be: 'BREAK_EVEN' }
      const tradeData = {
        tradingAccountId: activeAccountId,
        symbol: symbol.trim().toUpperCase(),
        direction: direction.toUpperCase(),
        outcome: outcomeMap[outcome] || 'WIN',
        pnl: pnl ? parseFloat(pnl) : 0,
        confluence: reason || undefined,
        notes: notes || undefined,
        openedAt: new Date().toISOString(),
      }
      const result = await api.post('/trades', tradeData)

      if (beforeFile && result.trade) {
        const fd = new FormData()
        fd.append('image', beforeFile)
        fd.append('screenshotType', 'BEFORE')
        api.upload(`/trades/${result.trade.id}/screenshots`, fd).catch(() => {})
      }
      if (afterFile && result.trade) {
        const fd = new FormData()
        fd.append('image', afterFile)
        fd.append('screenshotType', 'AFTER')
        api.upload(`/trades/${result.trade.id}/screenshots`, fd).catch(() => {})
      }

      navigate('/journal')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <div className="animate-fade-up">
        <PageHeader
          backTo="/dashboard"
          icon={IconX}
          title="Add Trade"
          sub={accounts.find((a) => a.id === activeAccountId)?.name || 'Select an account'}
        />
      </div>

      {error && (
        <div className="animate-fade-up mt-4 rounded-2xl border border-rose/30 bg-rose/10 px-4 py-3 text-[13px] text-rose">
          {error}
        </div>
      )}

      {accounts.length > 1 && (
        <GlassCard className="animate-fade-up mt-5 p-[18px]" style={{ animationDelay: '0.02s' }}>
          <span className="mb-2 block text-xs font-semibold tracking-wide text-ink-2">Account</span>
          <div className="mt-2 grid grid-cols-2 gap-2.5">
            {accounts.map((a) => (
              <OptionChip key={a.id} selected={activeAccountId === a.id} onClick={() => setAccountId(a.id)}>
                {a.name}
              </OptionChip>
            ))}
          </div>
        </GlassCard>
      )}

      <GlassCard className="animate-fade-up mt-5 p-[18px]" style={{ animationDelay: '0.04s' }}>
        <Input
          label="Pair / Symbol"
          placeholder="e.g. XAUUSD"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <div className="mt-4">
          <span className="mb-2 block text-xs font-semibold tracking-wide text-ink-2">
            Direction
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setDirection('buy')}
              className={`rounded-[14px] border px-4 py-3.5 text-sm font-bold transition ${
                direction === 'buy'
                  ? 'border-mint/40 bg-mint/15 text-mint'
                  : 'border-border bg-surface-2 text-ink-2'
              }`}
            >
              ▲ Buy
            </button>
            <button
              type="button"
              onClick={() => setDirection('sell')}
              className={`rounded-[14px] border px-4 py-3.5 text-sm font-bold transition ${
                direction === 'sell'
                  ? 'border-rose/40 bg-rose/15 text-rose'
                  : 'border-border bg-surface-2 text-ink-2'
              }`}
            >
              ▼ Sell
            </button>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="animate-fade-up mt-4 p-[18px]" style={{ animationDelay: '0.09s' }}>
        <span className="mb-2 block text-xs font-semibold tracking-wide text-ink-2">Outcome</span>
        <div className="mt-2 grid grid-cols-2 gap-2.5">
          <OptionChip selected={outcome === 'win'} onClick={() => setOutcome('win')}>
            Win
          </OptionChip>
          <OptionChip selected={outcome === 'loss'} onClick={() => setOutcome('loss')}>
            Loss
          </OptionChip>
        </div>
        <div className="mt-4">
          <Input
            label="Profit / Loss ($)"
            placeholder="842.50"
            type="number"
            step="0.01"
            value={pnl}
            onChange={(e) => setPnl(e.target.value)}
          />
        </div>
      </GlassCard>

      <GlassCard className="animate-fade-up mt-4 p-[18px]" style={{ animationDelay: '0.14s' }}>
        <Input
          label="Trade reason"
          placeholder="e.g. Order block retest"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="mt-4">
          <span className="mb-2 block text-xs font-semibold tracking-wide text-ink-2">Notes</span>
          <textarea
            className="min-h-[88px] w-full resize-none rounded-[18px] border border-border bg-surface-2 px-4 py-[15px] text-[15px] text-ink outline-none transition placeholder:text-ink-3 focus:border-blue1 focus:ring-4 focus:ring-blue1/15"
            placeholder="Context, emotions, execution quality…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </GlassCard>

      <GlassCard className="animate-fade-up mt-4 p-[18px]" style={{ animationDelay: '0.19s' }}>
        <span className="mb-3 block text-xs font-semibold tracking-wide text-ink-2">
          Before-trade screenshot
        </span>
        <UploadBox filename={beforeFile?.name || ''} onFile={setBeforeFile} />
      </GlassCard>

      <GlassCard className="animate-fade-up mt-4 p-[18px]" style={{ animationDelay: '0.19s' }}>
        <span className="mb-3 block text-xs font-semibold tracking-wide text-ink-2">
          After-trade screenshot
        </span>
        <UploadBox filename={afterFile?.name || ''} onFile={setAfterFile} />
      </GlassCard>

      <div className="animate-fade-up mt-7" style={{ animationDelay: '0.24s' }}>
        <Button onClick={handleSubmit} disabled={submitting}>
          {submitting ? 'Saving…' : 'Save Trade'}
        </Button>
      </div>
    </div>
  )
}
