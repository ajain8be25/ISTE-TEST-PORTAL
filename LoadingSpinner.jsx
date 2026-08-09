/**
 * Inline loading indicator. `label` is shown beneath the spinner and
 * should describe what's being awaited (e.g. "Loading questions…").
 */
export default function LoadingSpinner({ label = 'Loading…', size = 'md' }) {
  const dimension = size === 'lg' ? 'h-11 w-11 border-[3px]' : 'h-6 w-6 border-2'

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <div
        role="status"
        aria-label={label}
        className={`${dimension} animate-spin rounded-full border-primary-200 border-t-primary-600 border-r-pink-500`}
      />
      <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">{label}</p>
    </div>
  )
}
