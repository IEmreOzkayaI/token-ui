import { Check, Clock, Package } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/primitives/card"
import { cn } from "@/lib/utils"

const steps = [
  { label: "Picked Up", location: "Istanbul, TR", completed: true },
  { label: "In Transit", location: "Ankara Hub", completed: true },
  { label: "Out for Delivery", location: "Izmir", completed: false },
  { label: "Delivered", location: "Final Destination", completed: false },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 mb-4 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
      {children}
    </p>
  )
}

export default function CardCargoTracker() {
  return (
    <Card className="w-full max-w-sm transition-shadow hover:shadow-md">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center justify-between">
          <span>Shipment TRK-2024-1847</span>
          <Package className="size-4 text-primary" />
        </CardTitle>
        <CardDescription>DHL International Express</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
          <Check className="size-4" />
          In Transit
        </div>

        <SectionLabel>Route Progress</SectionLabel>
        <div className="ml-1 space-y-0">
          {steps.map((step, index) => (
            <div key={step.label} className="relative flex gap-4 pb-6 last:pb-0">
              {index < steps.length - 1 && (
                <span
                  className={cn(
                    "absolute top-3 left-[5px] h-[calc(100%-4px)] w-px",
                    step.completed ? "bg-primary" : "bg-border"
                  )}
                />
              )}
              <span
                className={cn(
                  "relative z-10 mt-1 size-3 shrink-0 rounded-full",
                  step.completed ? "bg-primary" : "bg-border"
                )}
              />
              <div>
                <p className="text-sm font-medium">{step.label}</p>
                <p className="text-xs text-muted-foreground">{step.location}</p>
              </div>
            </div>
          ))}
        </div>

        <SectionLabel>Estimated Delivery</SectionLabel>
        <div className="flex items-center gap-3">
          <Clock className="size-5 text-primary" />
          <div>
            <p className="text-sm font-medium">Tomorrow, Dec 15</p>
            <p className="text-xs text-muted-foreground">9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
