import Card from '../layout/Card.jsx'
import OptionButton from './OptionButton.jsx'

const OPTION_KEYS = ['A', 'B', 'C', 'D']

/**
 * Renders one question with its four options.
 * `question.options` is expected as { A, B, C, D } strings.
 */
export default function QuestionCard({ question, questionNumber, totalQuestions, selectedOption, onSelectOption }) {
  return (
    <Card stub accent="violet" className="animate-fade-up p-6 sm:p-8" key={question.id}>
      <div className="mb-6 flex items-center justify-between border-b border-dashed border-line pb-4">
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-primary-600">
          Question {questionNumber} <span className="text-ink-soft">of {totalQuestions}</span>
        </span>
        <span
          className={`rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] ${
            selectedOption ? 'bg-green-100 text-green-600' : 'bg-surface-alt text-ink-soft'
          }`}
        >
          {selectedOption ? 'Answered' : 'Not Answered'}
        </span>
      </div>

      <h2 className="mb-6 text-base font-medium leading-relaxed text-ink sm:text-lg">{question.text}</h2>

      <div className="flex flex-col gap-3">
        {OPTION_KEYS.map((key) => (
          <OptionButton
            key={key}
            optionKey={key}
            text={question.options?.[key] ?? ''}
            isSelected={selectedOption === key}
            onSelect={() => onSelectOption(key)}
          />
        ))}
      </div>
    </Card>
  )
}
