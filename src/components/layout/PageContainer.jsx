/**
 * Shared page wrapper used by every route. Provides the light gradient
 * backdrop, a floating pair of ambient color blobs (tinted per-step via
 * `accent`), a slim progress rail across the top showing where the
 * candidate is in the 4-step flow, and a fade-up entrance for content.
 *
 * `accent`: 'violet' | 'cyan' | 'amber' | 'pink' — sets the blob colors.
 * `step`: 1-4 — fills the top progress rail proportionally.
 */
const ACCENTS = {
  violet: {
    blobA: 'bg-gradient-to-br from-primary-300/60 to-cyan-300/30',
    blobB: 'bg-gradient-to-tr from-pink-300/40 to-amber-300/20',
    rail: 'from-primary-500 via-primary-600 to-primary-500',
  },
  cyan: {
    blobA: 'bg-gradient-to-br from-cyan-300/60 to-primary-300/30',
    blobB: 'bg-gradient-to-tr from-amber-300/30 to-cyan-300/20',
    rail: 'from-cyan-500 via-cyan-600 to-cyan-500',
  },
  amber: {
    blobA: 'bg-gradient-to-br from-amber-300/60 to-pink-300/30',
    blobB: 'bg-gradient-to-tr from-primary-300/40 to-amber-300/20',
    rail: 'from-amber-500 via-amber-600 to-amber-500',
  },
  pink: {
    blobA: 'bg-gradient-to-br from-pink-300/60 to-amber-300/30',
    blobB: 'bg-gradient-to-tr from-primary-300/40 to-pink-300/20',
    rail: 'from-pink-500 via-pink-600 to-pink-500',
  },
}

const STEP_LABELS = ['Register', 'Instructions', 'Test', 'Done']

export default function PageContainer({ children, className = '', accent = 'violet', step }) {
  const palette = ACCENTS[accent] ?? ACCENTS.violet

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-bg text-ink">
      {/* Ambient decorative blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className={`animate-blob absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl ${palette.blobA}`} />
        <div
          className={`animate-blob absolute -bottom-28 -right-16 h-80 w-80 rounded-full blur-3xl ${palette.blobB}`}
          style={{ animationDelay: '-6s' }}
        />
      </div>

      {step && (
        <div className="sticky top-0 z-40 h-1.5 w-full bg-line/60">
          <div
            className={`h-full bg-gradient-to-r ${palette.rail} animate-shimmer transition-[width] duration-500`}
            style={{ width: `${(step / 4) * 100}%` }}
            role="progressbar"
            aria-valuenow={step}
            aria-valuemin={1}
            aria-valuemax={4}
            aria-label={`Step ${step} of 4: ${STEP_LABELS[step - 1]}`}
          />
        </div>
      )}

      <div className="relative z-10 flex w-full flex-col items-center px-4 py-10 sm:px-6 sm:py-14">
        <div className={`animate-fade-up w-full ${className}`}>{children}</div>
      </div>
    </div>
  )
}
