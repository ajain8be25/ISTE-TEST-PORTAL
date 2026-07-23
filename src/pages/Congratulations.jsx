import { useLocation, useNavigate } from 'react-router-dom'
import PageContainer from '../components/layout/PageContainer.jsx'
import Card from '../components/layout/Card.jsx'
import Button from '../components/common/Button.jsx'
import Timer from '../components/test/Timer.jsx'

const REDIRECT_SECONDS = 5

// Where candidates land after the countdown. Replace with the real

const REDIRECT_PATH = '/'

export default function Congratulations() {
  const navigate = useNavigate()
  const location = useLocation()
  const candidate = location.state?.candidate

  const handleRedirect = () => {
    
    navigate('https://istetiet.com/')
  }

  return (
    <PageContainer className="max-w-xl">
      <Card stub className="p-8 text-center sm:p-10">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brass-100">
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-brass-600">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass-600">Step 4 of 4</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-teal-950 sm:text-4xl">
          Thank You , the test has been submitted :)
        </h1>
        <p className="mt-3 text-sm text-ink/60">
          {candidate?.name ? `Thank you, ${candidate.name}. ` : 'Thank you. '}
          Your responses have been recorded successfully.
        </p>

        <div className="my-8 flex justify-center">
          <Timer
            initialSeconds={REDIRECT_SECONDS}
            label="Redirecting In"
            onExpire={handleRedirect}
            criticalThreshold={3}
          />
        </div>

        <Button onClick={handleRedirect} variant="secondary">
          Continue Now
        </Button>
      </Card>

      <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-ink/35">
        Redirect placeholder — update REDIRECT_PATH in src/pages/Congratulations.jsx
      </p>
    </PageContainer>
  )
}
