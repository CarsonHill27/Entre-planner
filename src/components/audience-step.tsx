import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

type AudienceStepProps = {
  audience: string
  updateAudience: (value: string) => void
}

export default function AudienceStep({ audience, updateAudience }: AudienceStepProps) {
  const audienceOptions = [
    "General Public",
    "Professionals",
    "Students",
    "Developers",
    "Entrepreneurs",
    "Other"
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Who is your target audience?</h2>
      <div className="space-y-2">
        <Label htmlFor="project-audience">Target Audience</Label>
        <Select value={audience} onValueChange={updateAudience}>
          <SelectTrigger id="project-audience">
            <SelectValue placeholder="Select your target audience" />
          </SelectTrigger>
          <SelectContent>
            {audienceOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

