/**
 * Labeled select dropdown with inline validation error.
 * `options` is an array of { value, label } objects.
 */
export default function FormSelect({ label, name, value, onChange, error, options, placeholder = 'Select…' }) {
  const inputId = `field-${name}`
  const errorId = `${inputId}-error`

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="font-mono text-xs uppercase tracking-[0.12em] text-teal-900/80">
        {label}
      </label>
      <select
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`rounded-lg border bg-paper px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal-900 ${
          error ? 'border-brick-500' : 'border-line'
        } ${value === '' ? 'text-ink/35' : ''}`}
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
        <p id={errorId} className="text-xs text-brick-600">
          {error}
        </p>
      )}
    </div>
  )
}
