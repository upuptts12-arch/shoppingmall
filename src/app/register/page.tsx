'use client'

import { useState } from 'react'
import StepTerms from './components/StepTerms'
import RegisterForm from './components/RegisterForm'

export default function RegisterPage() {
  const [step, setStep] = useState(1)

  return (
    <div className="max-w-3xl mx-auto mt-16 p-8">
      {step === 1 && <StepTerms nextStep={() => setStep(2)} />}
      {step === 2 && <RegisterForm goBack={() => setStep(1)} />}
    </div>
  )
}
