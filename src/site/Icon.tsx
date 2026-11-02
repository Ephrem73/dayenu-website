const paths = {
  home: <><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" /></>,
  sparkle: <><path d="M12 3l1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3Z" /><path d="M19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 13h18" /></>,
  key: <><circle cx="7.5" cy="15.5" r="3.5" /><path d="M10 13l9-9" /><path d="M16 7l2 2" /><path d="M14 9l2 2" /></>,
  window: <><rect x="4" y="4" width="16" height="16" rx="1.5" /><path d="M12 4v16M4 12h16" /></>,
  layers: <><path d="M12 3l9 5-9 5-9-5 9-5Z" /><path d="M3 13l9 5 9-5" /></>,
  road: <><path d="M5 21L9 3" /><path d="M19 21L15 3" /><path d="M12 5v2M12 11v2M12 17v2" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="M5 12l4 4L19 6" />,
  shield: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z" /><path d="M9 12l2 2 4-4" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  detail: <><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></>,
  chevron: <path d="M7 10l5 5 5-5" />,
  play: <path d="M8 5v14l11-7L8 5Z" />,
  pause: <path d="M8 5v14M16 5v14" />,
  quote: <path d="M7 17c-2 0-3-1.5-3-4 0-3 2-6 5-7M17 17c-2 0-3-1.5-3-4 0-3 2-6 5-7" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  pin: <><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z" /><circle cx="12" cy="9" r="2.5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  send: <><path d="M21 3L10 14" /><path d="M21 3l-7 18-4-7-7-4 18-7Z" /></>,
  swap: <><path d="M8 7l-4 5 4 5" /><path d="M16 7l4 5-4 5" /></>,
  drop: <><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" /><path d="M9.5 15a2.5 2.5 0 0 0 2.5 2.5" /></>,
  building: <><path d="M5 21V4.5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1V21" /><path d="M15 9h3a1 1 0 0 1 1 1v11" /><path d="M3 21h18M8.5 8h3M8.5 12h3M8.5 16h3" /></>,
  hardhat: <><path d="M4 16a8 8 0 0 1 16 0" /><path d="M2.5 16h19v2.5h-19z" /><path d="M10 8.5V5.5h4v3" /></>,
  leaf: <><path d="M5 20c0-9 5.5-15 15-15 0 10-6 15-14 15" /><path d="M5 20l8.5-8.5" /></>,
  tiles: <><rect x="3" y="3" width="18" height="18" rx="1.5" /><path d="M3 9h18M3 15h18M9 3v6M15 9v6M9 15v6" /></>,
}

export type IconName = keyof typeof paths

export function Icon({ name, size = 18, className = '' }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[name]}
    </svg>
  )
}
