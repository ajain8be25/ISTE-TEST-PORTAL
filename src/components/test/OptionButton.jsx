/**
 * A single selectable option (A/B/C/D). Purely presentational —
 * selection state and click handling are controlled by the parent.
 * Each letter gets its own accent color so the four options stay easy
 * to tell apart at a glance.
 */
const LETTER_STYLES = {
  A: { badge: 'bg-primary-100 text-primary-700', ring: 'border-primary-500 bg-primary-50' },
  B: { badge: 'bg-cyan-100 text-cyan-600', ring: 'border-cyan-500 bg-cyan-100/40' },
  C: { badge: 'bg-amber-100 text-amber-600', ring: 'border-amber-500 bg-amber-100/40' },
  D: { badge: 'bg-pink-100 text-pink-600', ring: 'border-pink-500 bg-pink-100/40' },
}

export default function OptionButton({ optionKey, text, isSelected, onSelect }) {
  const style = LETTER_STYLES[optionKey] ?? LETTER_STYLES.A

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`flex w-full items-center gap-3.5 rounded-2xl border-2 px-4 py-3.5 text-left text-sm transition-all duration-150 ${
        isSelected
          ? `${style.ring} shadow-sm animate-pop`
          : 'border-line bg-surface text-ink hover:border-primary-300 hover:bg-surface-alt/60 hover:-translate-y-0.5'
      }`}
    >
      <span
        className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold ${style.badge}`}
      >
        {optionKey}
      </span>
      <span className="leading-snug text-ink">{text}</span>
    </button>
  )
}
