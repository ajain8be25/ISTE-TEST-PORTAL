import { useEffect, useState } from 'react'

function formatTime(totalSeconds) {
  const clamped = Math.max(0, totalSeconds)
  const mins = Math.floor(clamped / 60)
  const secs = clamped % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

/**
 * Counts down from `initialSeconds`. Calls `onExpire` once when it hits 0.
 * `criticalThreshold` (seconds) switches to a pulsing red pill as a
 * visual urgency cue.
 */
export default function Timer({ initialSeconds, onExpire, label = 'Time Remaining', criticalThreshold = 60 }) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds)

  useEffect(() => {
    setSecondsLeft(initialSeconds)
  }, [initialSeconds])

  // Tick every second.
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  // Fire onExpire exactly once when the countdown reaches zero.
  useEffect(() => {
    if (secondsLeft === 0) {
      onExpire?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft === 0])

  const isCritical = secondsLeft <= criticalThreshold

  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft">{label}</span>
      <span
        className={`rounded-2xl px-4 py-1.5 font-mono text-3xl font-semibold tabular-nums sm:text-4xl ${
          isCritical
            ? 'bg-red-100 text-red-600 animate-ring-pulse'
            : 'bg-gradient-to-r from-primary-100 to-cyan-100 text-primary-700'
        }`}
      >
        {formatTime(secondsLeft)}
      </span>
    </div>
  )
}
