'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import NameStep from './name-step'
import DescriptionStep from './description-step'
import AudienceStep from './audience-step'
import ProgressBar from './progress-bar'
import StatusSidebar from './status-sidebar'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

type ProjectData = {
  name: string
  description: string
  audience: string
}

const steps = [
  { name: "Project Name", completed: false },
  { name: "Description", completed: false },
  { name: "Target Audience", completed: false },
  { name: "Finalize", completed: false },
]

export default function ProjectCreator() {
  const [step, setStep] = useState(1);
  const router = useRouter()

  const [projectData, setProjectData] = useState<ProjectData>({
    name: '',
    description: '',
    audience: '',
  })

  const [completedSteps, setCompletedSteps] = useState(steps)
  const { user } = useUser()

  const totalSteps = steps.length

  const handleCreateProject = async () => {
    const response = await fetch('/api/project', {
      method: 'POST',
      body: JSON.stringify({
        name: projectData.name,
        description: projectData.description,
        audience: projectData.audience,
        userId: user?.id
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const body = await response.json();
    if (response.ok) {
      router.push(`/projects/${body.id}`)
    } else {
      alert('Project could not be created')
    }
  }

  const handleNext = async () => {

    if (step === 4) {
      await handleCreateProject();
    }

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
          {step === 4 &&
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Project overview</h2>
              <div className="flex flex-col gap-2 px-2">
                <h1><span className="text-muted-foreground">Project Name:</span> {projectData.name}</h1>
                <h1><span className="text-muted-foreground">Description:</span> {projectData.description}</h1>
                <h1><span className="text-muted-foreground">Audience:</span> {projectData.audience}</h1>
              </div>
            </div>
          }
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleBack} disabled={step === 1}>
            Back
          </Button>
          <Button onClick={handleNext} disabled={step === totalSteps + 1}>

            {step === totalSteps ? 'Finish' : 'Next'}
          </Button>
        </CardFooter>
      </Card>
      <Card className="w-64">
        <CardContent className="pt-6">
          <StatusSidebar steps={completedSteps} currentStep={step} />
        </CardContent>
      </Card>
    </div >
  )
}

