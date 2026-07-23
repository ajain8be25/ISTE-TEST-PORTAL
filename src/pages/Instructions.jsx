import { useLocation, useNavigate } from 'react-router-dom'
import PageContainer from '../components/layout/PageContainer.jsx'
import Card from '../components/layout/Card.jsx'
import Button from '../components/common/Button.jsx'
import Timer from '../components/test/Timer.jsx'

// Placeholder countdown: time before the candidate is allowed to start.
// Swap for a real value once the backend supplies a scheduled start time.
const COUNTDOWN_TO_START_SECONDS = 30

const GENERAL_RULES = [
  'The test consists of multiple-choice questions with four options each.',
  'You can navigate between questions using Previous and Next.',
  'You may change your answer any time before submitting.',
  'The test will auto-submit automatically when the timer reaches zero.',
  'Once submitted, answers cannot be changed.',
]

const TECHNICAL_RULES = [
  'Ensure a stable internet connection for the entire duration.',
  'Do not refresh the page or use the browser back button during the test.',
  'Strictly restrain from switching tabs or windows once the test has started as i will get you eliminated',
  'Use a desktop, laptop, or tablet for the best experience.',
]

export default function Instructions() {
  const navigate = useNavigate()
  const location = useLocation()
  const candidate = location.state?.candidate

  const handleStartTest = () => {
    navigate('/test', { state: { candidate } })
  }

  return (
    <PageContainer className="max-w-2xl">
      <header className="mb-8 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass-600">Step 2 of 4</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-teal-950 sm:text-4xl">
          Test Instructions
        </h1>
        {candidate?.name && (
          <p className="mt-2 text-sm text-ink/60">
            Welcome, <span className="font-medium text-ink">{candidate.name}</span>. Please read carefully before you begin.
          </p>
        )}
      </header>

      <Card className="mb-6 flex flex-col items-center gap-3 p-6 sm:p-8">
        <Timer
          initialSeconds={COUNTDOWN_TO_START_SECONDS}
          label="Test Opens In"
          onExpire={() => {}}
          criticalThreshold={10}
        />
        <p className="text-center text-xs text-ink/50">
          This is placeholder timing. Connect a scheduled start time from the backend to control availability.
        </p>
      </Card>

      <Card stub className="p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between border-b border-dashed border-line pb-4">
          <h2 className="font-display text-lg font-semibold text-teal-950">Guidelines</h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink/40">Form 02</span>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-teal-700">General</h3>
            <ul className="flex flex-col gap-2.5">
              {GENERAL_RULES.map((rule) => (
                <li key={rule} className="flex items-start gap-2.5 text-sm text-ink/75">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal-700" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-brass-600">Technical</h3>
            <ul className="flex flex-col gap-2.5">
              {TECHNICAL_RULES.map((rule) => (
                <li key={rule} className="flex items-start gap-2.5 text-sm text-ink/75">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brass-500" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-brick-500/25 bg-brick-500/5 p-4">
          <p className="text-xs text-brick-600">
            <span className="font-semibold">Important:</span> once you start, the test cannot be paused. Make sure you're ready before proceeding.
          </p>
        </div>
      </Card>

      <div className="mt-8 flex justify-center">
        <Button onClick={handleStartTest} className="px-10">
          Start Test
        </Button>
      </div>
    </PageContainer>
  )
}
