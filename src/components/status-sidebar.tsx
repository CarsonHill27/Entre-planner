import { CheckCircle, Loader2 } from 'lucide-react'

type Step = {
  name: string
  completed: boolean
}

type StatusSidebarProps = {
  steps: Step[]
  currentStep: number
}

export default function StatusSidebar({ steps, currentStep }: StatusSidebarProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Progress</h3>
      <ul className="space-y-2">
        {steps.map((step, index) => (
          <li key={step.name} className="flex items-center space-x-2">
            {step.completed ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : index === currentStep - 1 ? (
              <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
            )}
            <span className={step.completed ? "text-green-500" : "text-gray-500"}>
              {step.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

