const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function IconMail(props) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" {...strokeProps} {...props}>
      <path d="M3 6h18v12H3z" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  )
}

export function IconLock(props) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" {...strokeProps} {...props}>
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 018 0v3" />
    </svg>
  )
}

export function IconUser(props) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" {...strokeProps} {...props}>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c1.2-4 4-6 7-6s5.8 2 7 6" />
    </svg>
  )
}

export function IconSearch(props) {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" {...strokeProps} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  )
}

export function IconFilter(props) {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" {...strokeProps} {...props}>
      <path d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  )
}

export function IconPlus({ strokeWidth = 2.2, ...props }) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" {...strokeProps} strokeWidth={strokeWidth} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function IconX(props) {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" {...strokeProps} {...props}>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}

export function IconCheck(props) {
  return (
    <svg width={11} height={11} viewBox="0 0 24 24" {...strokeProps} strokeWidth={3} {...props}>
      <path d="M4 12l5 5 11-11" />
    </svg>
  )
}

export function IconChevronLeft(props) {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" {...strokeProps} strokeWidth={2} {...props}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

export function IconChevronRight(props) {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" {...strokeProps} {...props}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}

export function IconChevronUp(props) {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" {...strokeProps} strokeWidth={2} {...props}>
      <path d="M18 15l-6-6-6 6" />
    </svg>
  )
}

export function IconChevronDown(props) {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" {...strokeProps} strokeWidth={2} {...props}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

export function IconGrid(props) {
  return (
    <svg width={21} height={21} viewBox="0 0 24 24" {...strokeProps} strokeWidth={1.8} {...props}>
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="8" rx="2" />
      <rect x="3" y="13" width="8" height="8" rx="2" />
      <rect x="13" y="13" width="8" height="8" rx="2" />
    </svg>
  )
}

export function IconJournal(props) {
  return (
    <svg width={21} height={21} viewBox="0 0 24 24" {...strokeProps} {...props}>
      <path d="M6 4v16M6 4l4 4M6 4L2 8M18 20V4M18 20l4-4M18 20l-4-4" />
    </svg>
  )
}

export function IconHistory(props) {
  return (
    <svg width={21} height={21} viewBox="0 0 24 24" {...strokeProps} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8v4l3 2" />
    </svg>
  )
}

export function IconGear({ strokeWidth = 1.4, ...props }) {
  return (
    <svg width={21} height={21} viewBox="0 0 24 24" {...strokeProps} strokeWidth={strokeWidth} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.9 2.9l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.6 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.9-2.9l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.9-2.9l.1.1a1.7 1.7 0 001.9.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.9 2.9l-.1.1a1.7 1.7 0 00-.3 1.9V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" />
    </svg>
  )
}

export function IconBell(props) {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" {...strokeProps} {...props}>
      <path d="M12 2a5 5 0 015 5v3a7 7 0 01-2 5l-3 3-3-3a7 7 0 01-2-5V7a5 5 0 015-5z" />
    </svg>
  )
}

export function IconShield(props) {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" {...strokeProps} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  )
}

export function IconLogout({ strokeWidth = 1.7, ...props }) {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" {...strokeProps} strokeWidth={strokeWidth} {...props}>
      <path d="M16 17l5-5-5-5M21 12H9M13 21H6a2 2 0 01-2-2V5a2 2 0 012-2h7" />
    </svg>
  )
}

export function IconCamera(props) {
  return (
    <svg width={26} height={26} viewBox="0 0 24 24" {...strokeProps} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <circle cx="9" cy="11" r="2" />
      <path d="M21 16l-5-4-4 3-3-2-6 5" />
    </svg>
  )
}

export function LogoMark(props) {
  return (
    <svg width={28} height={28} viewBox="0 0 24 24" {...props}>
      <line x1="5" y1="3" x2="5" y2="9" stroke="#0b0d13" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="3.2" y="9" width="3.6" height="8" rx="1" fill="#0b0d13" />
      <line x1="5" y1="17" x2="5" y2="21" stroke="#0b0d13" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="12" y1="2" x2="12" y2="7" stroke="#0b0d13" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="10.2" y="7" width="3.6" height="6" rx="1" fill="#0b0d13" />
      <line x1="12" y1="13" x2="12" y2="19" stroke="#0b0d13" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="19" y1="6" x2="19" y2="10" stroke="#0b0d13" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="17.2" y="10" width="3.6" height="9" rx="1" fill="#0b0d13" />
      <line x1="19" y1="19" x2="19" y2="22" stroke="#0b0d13" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}