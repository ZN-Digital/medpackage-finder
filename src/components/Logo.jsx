function Logo({ size = 'default', showText = true }) {
  const sizes = {
    small: {
      container: 'w-8 h-8',
      text: 'text-sm',
      gap: 'gap-2',
    },
    default: {
      container: 'w-10 h-10',
      text: 'text-base',
      gap: 'gap-2.5',
    },
    large: {
      container: 'w-14 h-14',
      text: 'text-xl',
      gap: 'gap-3',
    },
  }

  const sizeConfig = sizes[size] || sizes.default

  return (
    <div className={`flex items-center ${sizeConfig.gap}`}>
      {/* Logo Mark */}
      <div
        className={`${sizeConfig.container} relative flex items-center justify-center rounded-lg bg-gradient-to-br from-hospital-600 to-hospital-800 shadow-md`}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/4 h-3/4"
        >
          {/* Z letter stylized */}
          <path
            d="M8 10H26L12 30H30"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* N letter stylized */}
          <path
            d="M22 10V30M22 10L32 30M32 10V30"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.7"
          />
          {/* Medical cross accent */}
          <circle cx="32" cy="8" r="3" fill="#60a5fa" />
        </svg>
      </div>

      {/* Text Mark */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-bold tracking-tight text-slate-800 ${sizeConfig.text}`}
          >
            ZN-Digital
          </span>
          <span className="text-[10px] text-hospital-600 font-medium tracking-wide uppercase">
            Healthcare Systems
          </span>
        </div>
      )}
    </div>
  )
}

export default Logo
