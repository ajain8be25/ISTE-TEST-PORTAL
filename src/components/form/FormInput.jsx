/**
 * Labeled text input with inline validation error.
 * Controlled component — value/onChange come from the parent form.
 */
export default function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
}) {
  const inputId = `field-${name}`
  const errorId = `${inputId}-error`

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="font-mono text-xs uppercase tracking-[0.12em] text-teal-900/80">
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`rounded-lg border bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 outline-none transition-colors focus:border-teal-900 ${
          error ? 'border-brick-500' : 'border-line'
        }`}
      />
      {error && (
        <p id={errorId} className="text-xs text-brick-600">
          {error}
        </p>
      )}
    </div>
  )
}
