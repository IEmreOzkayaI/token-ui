import { Button } from "@/primitives/button"

export default function ButtonPremium() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="premium">Upgrade to Pro</Button>
      <Button variant="premium" size="sm">
        Get started
      </Button>
      <Button variant="premium" size="lg">
        Start free trial
      </Button>
    </div>
  )
}
