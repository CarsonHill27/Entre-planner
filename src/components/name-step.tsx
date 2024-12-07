import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type NameStepProps = {
  name: string
  updateName: (value: string) => void
}

export default function NameStep({ name, updateName }: NameStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">What's the name of your project?</h2>
      <div className="space-y-2">
        <Label htmlFor="project-name">Project Name</Label>
        <Input
          id="project-name"
          value={name}
          onChange={(e) => updateName(e.target.value)}
          placeholder="Enter your project name"
        />
      </div>
    </div>
  )
}

