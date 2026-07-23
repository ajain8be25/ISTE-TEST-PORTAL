/**
 * Grid of question numbers for quick jumping. Filled dots (brass)
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
            className={`flex h-8 w-8 items-center justify-center rounded-md font-mono text-xs font-medium transition-colors ${
              isCurrent
                ? 'bg-teal-900 text-paper'
                : isAnswered
                  ? 'bg-brass-100 text-brass-600 border border-brass-300'
                  : 'bg-paper text-ink/50 border border-line hover:border-teal-700/50'
            }`}
          >
            {i + 1}
          </button>
        )
      })}
    </nav>
  )
}
