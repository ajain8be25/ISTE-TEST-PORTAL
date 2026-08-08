import Button from '../common/Button.jsx'

export default function TestNavigation({
  onPrevious,
  onNext,
  onSubmit,
  isFirstQuestion,
  isLastQuestion,
  isSubmitting,
}) {
  return (
    <div className="mt-6 flex items-center justify-between gap-3">
      <Button variant="secondary" onClick={onPrevious} disabled={isFirstQuestion || isSubmitting}>
        Previous
      </Button>

      <div className="flex gap-3">
        {!isLastQuestion ? (
          <Button onClick={onNext} disabled={isSubmitting}>
            Next
          </Button>
        ) : (
          <Button variant="brass" onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting…' : 'Submit Test'}
          </Button>
        )}
      </div>
    </div>
  )
}
