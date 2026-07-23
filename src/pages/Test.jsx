import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PageContainer from '../components/layout/PageContainer.jsx'
import Card from '../components/layout/Card.jsx'
import Button from '../components/common/Button.jsx'
import LoadingSpinner from '../components/common/LoadingSpinner.jsx'
import Timer from '../components/test/Timer.jsx'
import QuestionCard from '../components/test/QuestionCard.jsx'
import QuestionNavigator from '../components/test/QuestionNavigator.jsx'
import TestNavigation from '../components/test/TestNavigation.jsx'
import { getQuestions, submitAnswers } from '../api/testApi.js'

// Placeholder duration. Replace with a value supplied by the backend
// (e.g. per-test config) once available.
const TEST_DURATION_SECONDS = 15 * 60

export default function Test() {
  const navigate = useNavigate()
  const location = useLocation()
  const candidate = location.state?.candidate

  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({}) // { [questionId]: 'A' | 'B' | 'C' | 'D' }
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadQuestions() {
      setIsLoading(true)
      setLoadError('')
      try {
        const data = await getQuestions()
        if (isMounted) setQuestions(Array.isArray(data) ? data : [])
      } catch (err) {
        if (isMounted) setLoadError('Could not load questions. Please refresh to try again.')
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadQuestions()
    return () => {
      isMounted = false
    }
  }, [])

  // Warn before refresh/navigation away while the test is in progress.
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true)
    setSubmitError('')
    try {
      const result = await submitAnswers({ candidateId: candidate?.candidateId, answers })
      if (result?.success) {
        navigate('/congratulations', { state: { candidate } })
      } else {
        setSubmitError(result?.message || 'Submission failed. Please try again.')
        setIsSubmitting(false)
      }
    } catch (err) {
      setSubmitError('Something went wrong while submitting. Please try again.')
      setIsSubmitting(false)
    }
  }, [answers, candidate, navigate])

  const handleAutoSubmit = useCallback(() => {
    // TODO: surface a distinct "time's up, auto-submitting" notice if desired.
    handleSubmit()
  }, [handleSubmit])

  const currentQuestion = questions[currentIndex]
  const totalQuestions = questions.length
  const answeredIndices = new Set(
    questions.reduce((acc, q, idx) => {
      if (answers[q.id]) acc.push(idx)
      return acc
    }, [])
  )

  const handleSelectOption = (optionKey) => {
    if (!currentQuestion) return
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionKey }))
  }

  if (isLoading) {
    return (
      <PageContainer className="max-w-2xl">
        <Card className="p-6 sm:p-8">
          <LoadingSpinner label="Loading questions…" size="lg" />
        </Card>
      </PageContainer>
    )
  }

  if (loadError) {
    return (
      <PageContainer className="max-w-2xl">
        <Card className="p-6 text-center sm:p-8">
          <p className="text-sm text-brick-600">{loadError}</p>
        </Card>
      </PageContainer>
    )
  }

  if (totalQuestions === 0) {
    return (
      <PageContainer className="max-w-2xl">
        <Card className="p-6 text-center sm:p-8">
          <h2 className="mb-2 font-display text-lg font-semibold text-teal-950">No Questions Available</h2>
          <p className="text-sm text-ink/60">
            getQuestions() returned an empty set. Connect the backend in src/api/testApi.js to load the question bank.
          </p>
        </Card>
      </PageContainer>
    )
  }

  return (
    <PageContainer className="max-w-2xl">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass-600">Step 3 of 4</p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-teal-950 sm:text-3xl">Test in Progress</h1>
        </div>
        <Timer initialSeconds={TEST_DURATION_SECONDS} onExpire={handleAutoSubmit} criticalThreshold={60} />
      </header>

      <Card className="mb-6 p-4 sm:p-5">
        <QuestionNavigator
          totalQuestions={totalQuestions}
          currentIndex={currentIndex}
          answeredIndices={answeredIndices}
          onJumpTo={setCurrentIndex}
        />
      </Card>

      <QuestionCard
        question={currentQuestion}
        questionNumber={currentIndex + 1}
        totalQuestions={totalQuestions}
        selectedOption={answers[currentQuestion.id]}
        onSelectOption={handleSelectOption}
      />

      {submitError && (
        <p role="alert" className="mt-4 rounded-lg border border-brick-500/30 bg-brick-500/5 px-3.5 py-2.5 text-sm text-brick-600">
          {submitError}
        </p>
      )}

      <TestNavigation
        onPrevious={() => setCurrentIndex((i) => Math.max(0, i - 1))}
        onNext={() => setCurrentIndex((i) => Math.min(totalQuestions - 1, i + 1))}
        onSubmit={handleSubmit}
        isFirstQuestion={currentIndex === 0}
        isLastQuestion={currentIndex === totalQuestions - 1}
        isSubmitting={isSubmitting}
      />

      <div className="mt-4 flex justify-center">
        <Button variant="secondary" onClick={handleSubmit} disabled={isSubmitting} className="text-xs">
          Submit Anytime
        </Button>
      </div>
    </PageContainer>
  )
}
