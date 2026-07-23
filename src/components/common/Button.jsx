const VARIANT_CLASSES = {
  primary:
    'bg-teal-900 text-paper hover:bg-teal-700 focus-visible:outline-brass-500 disabled:bg-teal-900/40',
  brass:
    'bg-brass-500 text-teal-950 hover:bg-brass-600 focus-visible:outline-teal-900 disabled:bg-brass-500/40',
  secondary:
    'bg-transparent text-teal-900 border border-teal-900/30 hover:bg-teal-100 disabled:text-teal-900/30 disabled:border-teal-900/10',
  danger:
    'bg-brick-500 text-paper hover:bg-brick-600 focus-visible:outline-brick-500 disabled:bg-brick-500/40',
}

/**
 * Shared button. Pass `variant` to switch style, `as="a"` isn't
 * supported here on purpose — this is a real <button>; wrap in <Link>
 * where navigation is needed so routing stays explicit in each page.
 */
export default function Button({
  children,
  variant = 'primary',
  className = '',
  disabled = false,
  type = 'button',
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-display text-sm font-semibold tracking-wide transition-colors duration-150 disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
