/**
 * A single selectable option (A/B/C/D). Purely presentational —
 * selection state and click handling are controlled by the parent.
 */
export default function OptionButton({ optionKey, text, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`flex w-full items-center gap-3.5 rounded-xl border px-4 py-3.5 text-left text-sm transition-colors ${
        isSelected
          ? 'border-teal-900 bg-teal-900 text-paper'
          : 'border-line bg-paper text-ink hover:border-teal-700/50 hover:bg-teal-100/40'
      }`}
    >
      <span
        className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md font-mono text-xs font-semibold ${
          isSelected ? 'bg-brass-500 text-teal-950' : 'bg-teal-100 text-teal-900'
        }`}
      >
        {optionKey}
      </span>
      <span className="leading-snug">{text}</span>
    </button>
  )
}
