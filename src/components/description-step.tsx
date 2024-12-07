import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

type DescriptionStepProps = {
  description: string
  updateDescription: (value: string) => void
}

export default function DescriptionStep({ description, updateDescription }: DescriptionStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Describe your project</h2>
      <div className="space-y-2">
        <Label htmlFor="project-description">Project Description</Label>
        <Textarea
          id="project-description"
          value={description}
          onChange={(e) => updateDescription(e.target.value)}
          placeholder="Write a brief description of what your project does"
          rows={4}
        />
      </div>
    </div>
  )
}

