import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
        onChange={(e) => onFile(e.target.files[0]?.name || '')}
      />
    </label>
  )
}

export default function AddTrade() {
  const navigate = useNavigate()
  const [direction, setDirection] = useState('buy')
  const [outcome, setOutcome] = useState('win')
  const [beforeName, setBeforeName] = useState('')
  const [afterName, setAfterName] = useState('')

  return (
    <div>
      <div className="animate-fade-up">
        <PageHeader
          backTo="/dashboard"
          icon={IconX}
          title="Add Trade"
          sub="Apex Capital — Live 01"
        />
      </div>

      <GlassCard className="animate-fade-up mt-5 p-[18px]" style={{ animationDelay: '0.04s' }}>
        <Input label="Pair / Symbol" placeholder="e.g. XAUUSD" />
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
          <Input label="Profit / Loss ($)" placeholder="842.50" type="number" step="0.01" />
        </div>
      </GlassCard>

      <GlassCard className="animate-fade-up mt-4 p-[18px]" style={{ animationDelay: '0.14s' }}>
        <Input label="Trade reason" placeholder="e.g. Order block retest" />
        <div className="mt-4">
          <span className="mb-2 block text-xs font-semibold tracking-wide text-ink-2">Notes</span>
          <textarea
            className="min-h-[88px] w-full resize-none rounded-[18px] border border-border bg-surface-2 px-4 py-[15px] text-[15px] text-ink outline-none transition placeholder:text-ink-3 focus:border-blue1 focus:ring-4 focus:ring-blue1/15"
            placeholder="Context, emotions, execution quality…"
          />
        </div>
      </GlassCard>

      <GlassCard className="animate-fade-up mt-4 p-[18px]" style={{ animationDelay: '0.19s' }}>
        <span className="mb-3 block text-xs font-semibold tracking-wide text-ink-2">
          Before-trade screenshot
        </span>
        <UploadBox filename={beforeName} onFile={setBeforeName} />
      </GlassCard>

      <GlassCard className="animate-fade-up mt-4 p-[18px]" style={{ animationDelay: '0.19s' }}>
        <span className="mb-3 block text-xs font-semibold tracking-wide text-ink-2">
          After-trade screenshot
        </span>
        <UploadBox filename={afterName} onFile={setAfterName} />
      </GlassCard>

      <div className="animate-fade-up mt-7" style={{ animationDelay: '0.24s' }}>
        <Button onClick={() => navigate('/journal')}>Save Trade</Button>
      </div>
    </div>
  )
}