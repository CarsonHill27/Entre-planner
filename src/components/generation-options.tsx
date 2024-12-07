import { Button } from "@/components/ui/button"

export default function GenerationOptions() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">What would you like to generate?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="h-24">Logo Generation</Button>
        <Button className="h-24">Slogan Generation</Button>
        <Button className="h-24">Idea/Goal Generator</Button>
      </div>
    </div>
  )
}

