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

const INITIAL_FORM = { name: '', rollNumber: '', email: '', branch: '' }

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
      const result = await registerCandidate(form)
      if (result?.success) {
        navigate('/instructions', { state: { candidate: form, candidateId: result.candidateId } })
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
    <PageContainer className="max-w-xl">
      <div className="image" class="flex justify-start">
        <img 
  src="https://membership.isteonline.in/static/media/istelogo2.055fc6da.png" 
  alt="Iste Logo" 
  className="fixed top-0 left-0 w-24 h-auto z-50 rounded-br-xl" 
/>
</div>
      <header className="mb-8 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass-600">ISTE Student Chapter</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-teal-950 sm:text-4xl">
          Orientation Test Portal
        </h1>
        <p className="mt-2 text-sm text-ink/60">Register below to receive your test admission details.</p>
      </header>

      <Card stub className="p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between border-b border-dashed border-line pb-4">
          <h2 className="font-display text-lg font-semibold text-teal-950">Candidate Registration</h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink/40">Form 01</span>
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
            <FormInput
              label="Branch"
              name="branch"
              value={form.branch}
              onChange={handleChange}
              error={errors.branch}
              options={BRANCH_OPTIONS}
            />

            
          </div>

          {submitError && (
            <p role="alert" className="rounded-lg border border-brick-500/30 bg-brick-500/5 px-3.5 py-2.5 text-sm text-brick-600">
              {submitError}
            </p>
          )}

          <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">
            {isSubmitting ? 'Registering…' : 'Register'}
          </Button>
        </form>
      </Card>

      <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-ink/35">
        Backend integration point: registerCandidate(formData) — src/api/testApi.js
      </p>
    </PageContainer>
  )
}
