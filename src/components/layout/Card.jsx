/**
 * Reusable panel shell. `stub` renders a torn-ticket dashed edge on the
 * left, used to echo the admit-card motif on key panels.
 */
export default function Card({ children, className = '', stub = false }) {
  return (
    <div
      className={`relative bg-paper-raised border border-line rounded-2xl shadow-[0_1px_2px_rgba(20,36,32,0.06),0_8px_24px_rgba(20,36,32,0.06)] ${
        stub ? 'border-l-0' : ''
      } ${className}`}
    >
      {stub && (
        <div
          aria-hidden="true"
          className="absolute -left-px top-0 bottom-0 w-0 border-l-2 border-dashed border-brass-300"
        />
      )}
      {children}
    </div>
  )
}
