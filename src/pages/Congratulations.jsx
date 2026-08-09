import { useLocation, useNavigate } from 'react-router-dom'
import PageContainer from '../components/layout/PageContainer.jsx'
import Card from '../components/layout/Card.jsx'
import Button from '../components/common/Button.jsx'
import Timer from '../components/test/Timer.jsx'

const REDIRECT_SECONDS = 5

// Where candidates land after the countdown.
const REDIRECT_PATH = 'https://istetiet.com/'

const CONFETTI = [
  { left: '8%', color: 'bg-primary-500', delay: '0s', size: 'h-2.5 w-2.5' },
  { left: '20%', color: 'bg-cyan-500', delay: '0.3s', size: 'h-2 w-2' },
  { left: '34%', color: 'bg-amber-500', delay: '0.1s', size: 'h-3 w-3' },
  { left: '48%', color: 'bg-pink-500', delay: '0.5s', size: 'h-2 w-2' },
  { left: '62%', color: 'bg-primary-500', delay: '0.2s', size: 'h-2.5 w-2.5' },
  { left: '76%', color: 'bg-cyan-500', delay: '0.6s', size: 'h-3 w-3' },
  { left: '90%', color: 'bg-amber-500', delay: '0.4s', size: 'h-2 w-2' },
]

export default function Congratulations() {
  const navigate = useNavigate()
  const location = useLocation()
  const candidate = location.state?.candidate

  const handleRedirect = () => {
    // External destination — react-router's navigate() only handles
    // in-app routes, so a full-page redirect is used here instead.
    window.location.href = REDIRECT_PATH
  }

  return (
    <PageContainer className="max-w-xl" accent="pink" step={4}>
      <Card stub accent="pink" className="relative overflow-hidden p-8 text-center sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-40 overflow-hidden">
          {CONFETTI.map((c, i) => (
            <span
              key={i}
              className={`animate-confetti absolute top-0 rounded-sm ${c.color} ${c.size}`}
              style={{ left: c.left, animationDelay: c.delay }}
            />
          ))}
        </div>

        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-pink-100">
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-pink-600">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="font-mono text-xs uppercase tracking-[0.2em] text-pink-600">Step 4 of 4</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Thank you — your test has been submitted!
        </h1>
        <p className="mt-3 text-sm text-ink-soft">
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
    </PageContainer>
  )
}
