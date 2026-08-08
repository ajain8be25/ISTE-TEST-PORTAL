/**
 * Reusable panel shell. `stub` renders a torn-ticket dashed edge on the
 * left (the admit-card motif). `accent` tints the thin gradient strip
 * along the top of the card so each step in the flow reads as its own
 * color while staying visually consistent.
 */
const ACCENT_BARS = {
  violet: 'from-primary-500 via-pink-500 to-cyan-500',
  cyan: 'from-cyan-500 via-primary-500 to-cyan-500',
  amber: 'from-amber-500 via-pink-500 to-primary-500',
  pink: 'from-pink-500 via-amber-500 to-primary-500',
}

const STUB_DASH = {
  violet: 'border-primary-300',
  cyan: 'border-cyan-300',
  amber: 'border-amber-300',
  pink: 'border-pink-300',
}

export default function Card({ children, className = '', stub = false, accent = 'violet' }) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_1px_2px_rgba(30,27,46,0.04),0_16px_40px_-12px_rgba(109,40,217,0.14)] transition-shadow duration-300 hover:shadow-[0_1px_2px_rgba(30,27,46,0.05),0_20px_48px_-12px_rgba(109,40,217,0.2)] ${
        stub ? 'border-l-0' : ''
      } ${className}`}
    >
      <div aria-hidden="true" className={`h-1.5 w-full bg-gradient-to-r ${ACCENT_BARS[accent] ?? ACCENT_BARS.violet}`} />

      {stub && (
        <div
          aria-hidden="true"
          className={`absolute -left-px top-1.5 bottom-0 w-0 border-l-2 border-dashed ${STUB_DASH[accent] ?? STUB_DASH.violet}`}
        />
      )}
      {children}
    </div>
  )
}
