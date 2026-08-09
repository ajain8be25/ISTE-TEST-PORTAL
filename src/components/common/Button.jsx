const VARIANT_CLASSES = {
  primary:
    'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-md shadow-primary-500/25 hover:shadow-lg hover:shadow-primary-500/35 hover:-translate-y-0.5 focus-visible:outline-primary-600 disabled:from-primary-300 disabled:to-primary-300 disabled:shadow-none disabled:translate-y-0',
  brass:
    'bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-pink-500/35 hover:-translate-y-0.5 focus-visible:outline-amber-600 disabled:from-amber-200 disabled:to-pink-200 disabled:shadow-none disabled:translate-y-0',
  secondary:
    'bg-white text-primary-700 border border-primary-200 hover:bg-primary-100 hover:-translate-y-0.5 disabled:text-ink-soft/40 disabled:border-line disabled:translate-y-0',
  danger:
    'bg-gradient-to-r from-red-600 to-pink-500 text-white shadow-md shadow-red-500/25 hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-red-500 disabled:from-red-200 disabled:to-pink-200 disabled:shadow-none disabled:translate-y-0',
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
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-display text-sm font-semibold tracking-wide transition-all duration-200 disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
