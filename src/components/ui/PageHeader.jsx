import { Link } from 'react-router-dom'
import { IconChevronLeft } from '../Icons'

export default function PageHeader({ backTo, title, sub, icon: Icon = IconChevronLeft }) {
  return (
    <div className="flex items-center gap-3.5 py-1">
      <Link
        to={backTo}
        className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2"
      >
        <Icon width={16} height={16} className="text-ink-2" />
      </Link>
      <div>
        <div className="font-display text-[19px] font-semibold">{title}</div>
        {sub && <div className="mt-0.5 text-[12.5px] text-ink-3">{sub}</div>}
      </div>
    </div>
  )
}