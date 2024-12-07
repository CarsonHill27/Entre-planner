'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import NameStep from './name-step'
import DescriptionStep from './description-step'
import AudienceStep from './audience-step'
import GenerationOptions from './generation-options'
import ProgressBar from './progress-bar'
import StatusSidebar from './status-sidebar'

type ProjectData = {
  name: string
  description: string
  audience: string
}

const steps = [
  { name: "Project Name", completed: false },
  { name: "Description", completed: false },
  { name: "Target Audience", completed: false },
  { name: "Generation Options", completed: false },
]

export default function ProjectCreator() {
  const [step, setStep] = useState(1)
  const [projectData, setProjectData] = useState<ProjectData>({
    name: '',
    description: '',
    audience: '',
  })
  const [completedSteps, setCompletedSteps] = useState(steps)

  const totalSteps = steps.length

  const handleNext = () => {
    setStep((prevStep) => {
      const newStep = Math.min(prevStep + 1, totalSteps)
      updateCompletedSteps(prevStep)
      return newStep
    })
  }

  const handleBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1))
  }

  const updateProjectData = (field: keyof ProjectData, value: string) => {
    setProjectData((prevData) => ({ ...prevData, [field]: value }))
  }

  const updateCompletedSteps = (completedStep: number) => {
    setCompletedSteps((prevSteps) =>
      prevSteps.map((step, index) =>
        index === completedStep - 1 ? { ...step, completed: true } : step
      )
    )
  }

  return (
    <div className="flex space-x-8 w-full justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create Your Project</CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressBar currentStep={step} totalSteps={totalSteps} />
          {step === 1 && (
            <NameStep
              name={projectData.name}
              updateName={(value) => updateProjectData('name', value)}
            />
          )}
          {step === 2 && (
            <DescriptionStep
              description={projectData.description}
              updateDescription={(value) => updateProjectData('description', value)}
            />
          )}
          {step === 3 && (
            <AudienceStep
              audience={projectData.audience}
              updateAudience={(value) => updateProjectData('audience', value)}
            />
          )}
          {step === 4 && <GenerationOptions />}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleBack} disabled={step === 1}>
            Back
          </Button>
          <Button onClick={handleNext} disabled={step === totalSteps}>
            {step === totalSteps ? 'Finish' : 'Next'}
          </Button>
        </CardFooter>
      </Card>
      <Card className="w-64">
        <CardContent className="pt-6">
          <StatusSidebar steps={completedSteps} currentStep={step} />
        </CardContent>
      </Card>
    </div>
  )
}

