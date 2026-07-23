/**
 * Inline loading indicator. `label` is shown beneath the spinner and
 * should describe what's being awaited (e.g. "Loading questions…").
 */
export default function LoadingSpinner({ label = 'Loading…', size = 'md' }) {
  const dimension = size === 'lg' ? 'h-10 w-10 border-[3px]' : 'h-6 w-6 border-2'

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-teal-900">
      <div
        role="status"
        aria-label={label}
        className={`${dimension} animate-spin rounded-full border-teal-900/20 border-t-brass-500`}
      />
      <p className="font-mono text-xs uppercase tracking-[0.15em] text-teal-900/70">{label}</p>
    </div>
  )
}
