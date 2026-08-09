import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageContainer from '../components/layout/PageContainer.jsx'
import Card from '../components/layout/Card.jsx'
import FormInput from '../components/form/FormInput.jsx'
import FormSelect from '../components/form/FormSelect.jsx'
import Button from '../components/common/Button.jsx'
import { registerCandidate } from '../api/testApi.js'



const BRANCH_OPTIONS = [
  { value: 'CSE', label: 'Computer Science & Engineering' },
  { value: 'IT', label: 'Information Technology' },
  { value: 'ECE', label: 'Electronics & Communication' },
  { value: 'EE', label: 'Electrical Engineering' },
  { value: 'ME', label: 'Mechanical Engineering' },
  { value: 'CE', label: 'Civil Engineering' },
  { value: 'OTHER', label: 'Other' },
]

const INITIAL_FORM = { name: '', rollNumber: '', email: '', branch: '', customBranch: '' }

function validate(form) {
  const errors = {}

  if (!form.name.trim()) {
    errors.name = 'Enter your full name.'
  } else if (form.name.trim().length < 3) {
    errors.name = 'Name must be at least 3 characters.'
  }

  if (!form.rollNumber.trim()) {
    errors.rollNumber = 'Enter your roll number.'
  }

  if (!form.email.trim()) {
    errors.email = 'Enter your email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (!form.branch) {
    errors.branch = 'Select your branch.'
  } else if (form.branch === 'OTHER' && !form.customBranch.trim()) {
    errors.customBranch = 'Enter your branch name.'
  }

  return errors
}

export default function Registration() {
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)
    setSubmitError('')

    try {
      // If "Other" was picked, send the typed-in branch name as the
      // actual branch value so the backend/downstream pages don't need
      // to know about the OTHER/customBranch distinction.
      const payload =
        form.branch === 'OTHER'
          ? { ...form, branch: form.customBranch.trim() }
          : form

      const result = await registerCandidate(payload)
      if (result?.success) {
        navigate('/instructions', { state: { candidate: payload, candidateId: result.candidateId } })
      } else {
        setSubmitError(result?.message || 'Registration failed. Please try again.')
      }
    } catch (err) {
      setSubmitError('Something went wrong while registering. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageContainer className="max-w-xl" accent="violet" step={1}>
      <img
        src="https://membership.isteonline.in/static/media/istelogo2.055fc6da.png"
        alt="ISTE Logo"
        className="fixed top-4 left-4 z-50 h-12 w-auto rounded-lg bg-white/80 p-1 shadow-sm backdrop-blur sm:h-14"
      />

      <header className="mb-8 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-600">ISTE Student Chapter</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          <span className="bg-gradient-to-r from-primary-600 via-pink-500 to-cyan-600 bg-clip-text text-transparent">
            Orientation Test Portal
          </span>
        </h1>
        <p className="mt-2 text-sm text-ink-soft">Register below to receive your test admission details.</p>
      </header>

      <Card stub accent="violet" className="p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between border-b border-dashed border-line pb-4">
          <h2 className="font-display text-lg font-semibold text-ink">Candidate Registration</h2>
          <span className="rounded-full bg-primary-100 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-primary-600">
            Form 01
          </span>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <FormInput
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="As per college records"
            autoComplete="name"
          />

          <FormInput
            label="Roll/Enrollment no."
            name="rollNumber"
            value={form.rollNumber}
            onChange={handleChange}
            error={errors.rollNumber}
            placeholder="e.g. 23CSE1042"
          />

          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="you@thapar.edu"
            autoComplete="email"
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormSelect
              label="Branch"
              name="branch"
              value={form.branch}
              onChange={handleChange}
              error={errors.branch}
              options={BRANCH_OPTIONS}
            />

            {form.branch === 'OTHER' && (
              <FormInput
                label="Enter Your Branch"
                name="customBranch"
                value={form.customBranch}
                onChange={handleChange}
                error={errors.customBranch}
                placeholder="e.g. Biotechnology"
              />
            )}
          </div>

          {submitError && (
            <p role="alert" className="rounded-xl border border-red-500/30 bg-red-100/60 px-3.5 py-2.5 text-sm text-red-600">
              {submitError}
            </p>
          )}

          <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">
            {isSubmitting ? 'Registering…' : 'Register'}
          </Button>
        </form>
      </Card>
    </PageContainer>
  )
}
