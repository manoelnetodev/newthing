export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`newthing-mark ${className}`}
      viewBox="0 0 128 160"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="brand-mark-arrow"
        fill="var(--nt-logo-blue, #087CFF)"
        d="M21 6 62 34 70 10 111 70 36 65 54 48 13 20Z"
      />
      <path
        className="brand-mark-ring"
        fill="currentColor"
        d="M24.4 75H49.5A26 26 0 1 0 84.5 75H109.6A48 48 0 1 1 24.4 75Z"
      />
      <path
        className="brand-mark-energy"
        d="M109.6 75A48 48 0 1 1 24.4 75"
        pathLength={100}
        fill="none"
        stroke="var(--nt-logo-blue, #087CFF)"
        strokeWidth={3.5}
        strokeLinecap="round"
      />
    </svg>
  )
}
