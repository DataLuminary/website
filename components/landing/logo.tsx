export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-bg" x1="4" y1="3" x2="28" y2="29" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1B5BD6" />
          <stop offset="100%" stopColor="#3A84FF" />
        </linearGradient>
        <linearGradient id="logo-spark" x1="23" y1="7.5" x2="23" y2="16.5" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#BFDBFF" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="7" fill="#0A1020" />
      <rect width="32" height="32" rx="7" fill="url(#logo-bg)" />
      <path
        d="M7 23 L12.25 20 L17 21.5 L23 12"
        stroke="#FFFFFF"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23 7.6 Q23 12 27.4 12 Q23 12 23 16.4 Q23 12 18.6 12 Q23 12 23 7.6 Z"
        fill="url(#logo-spark)"
      />
      <path
        d="M10.4 9 Q10.4 10.7 12.1 10.7 Q10.4 10.7 10.4 12.4 Q10.4 10.7 8.7 10.7 Q10.4 10.7 10.4 9 Z"
        fill="#FFFFFF"
        opacity="0.9"
      />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className ?? ''}`}>
      <span className="relative inline-flex h-8 w-8 items-center justify-center">
        <LogoIcon className="h-8 w-8" />
      </span>
      <span className="font-heading text-lg font-extrabold tracking-tight text-foreground">
        Data
        <span
          className="bg-clip-text text-transparent"
          style={{ backgroundImage: 'linear-gradient(120deg, #1B5BD6, #3A84FF, #7FB2FF)' }}
        >
          Luminary
        </span>
      </span>
    </span>
  )
}
