/**
 * Labeled select dropdown with inline validation error.
 * `options` is an array of { value, label } objects.
 */
export default function FormSelect({ label, name, value, onChange, error, options, placeholder = 'Select…' }) {
  const inputId = `field-${name}`
  const errorId = `${inputId}-error`

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="font-mono text-xs uppercase tracking-[0.12em] text-primary-700">
        {label}
      </label>
      <select
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`rounded-xl border-2 bg-surface-alt/40 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary-500 focus:bg-white ${
          error ? 'border-red-500' : 'border-line'
        } ${value === '' ? 'text-ink-soft/50' : ''}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="text-ink">
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
