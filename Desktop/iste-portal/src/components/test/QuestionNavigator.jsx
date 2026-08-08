/**
 * Grid of question numbers for quick jumping. Filled dots (green)
 * indicate an answered question, echoing an OMR answer sheet.
 */
export default function QuestionNavigator({ totalQuestions, currentIndex, answeredIndices, onJumpTo }) {
  return (
    <nav aria-label="Jump to question" className="flex flex-wrap gap-2">
      {Array.from({ length: totalQuestions }, (_, i) => {
        const isAnswered = answeredIndices.has(i)
        const isCurrent = i === currentIndex

        return (
          <button
            key={i}
            type="button"
            onClick={() => onJumpTo(i)}
            aria-current={isCurrent ? 'true' : undefined}
            aria-label={`Question ${i + 1}${isAnswered ? ', answered' : ', not answered'}`}
            className={`flex h-8 w-8 items-center justify-center rounded-lg font-mono text-xs font-semibold transition-all duration-150 ${
              isCurrent
                ? 'bg-gradient-to-br from-primary-600 to-primary-500 text-white shadow-sm shadow-primary-500/40 scale-105'
                : isAnswered
                  ? 'bg-green-100 text-green-600 border border-green-500/30 hover:-translate-y-0.5'
                  : 'bg-surface text-ink-soft border border-line hover:border-primary-300 hover:-translate-y-0.5'
            }`}
          >
            {i + 1}
          </button>
        )
      })}
    </nav>
  )
}
