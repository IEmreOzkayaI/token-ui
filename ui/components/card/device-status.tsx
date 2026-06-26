import { AlertTriangle, Cpu } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/primitives/card"
import { Progress } from "@/primitives/progress"
import { cn } from "@/lib/utils"

const metrics = [
  { label: "CPU", value: 42, display: "42%", icon: Cpu },
  { label: "Memory", value: 51, display: "8.2 / 16 GB" },
  { label: "Storage", value: 95, display: "487 / 512 GB", destructive: true },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
      {children}
    </p>
  )
}

export default function CardDeviceStatus() {
  return (
    <Card className="w-full max-w-sm transition-shadow hover:shadow-md">
      <CardHeader className="border-b">
        <CardTitle>Device Health</CardTitle>
        <CardDescription>MacBook Pro 16&quot; M3</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-3 dark:bg-emerald-950/40">
          <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
            All Systems Optimal
          </span>
          <span className="size-2 rounded-full bg-emerald-500" />
        </div>

        <SectionLabel>System Metrics</SectionLabel>
        <div className="space-y-4">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  {metric.icon && (
                    <metric.icon className="size-4 text-primary" />
                  )}
                  {metric.label}
                </span>
                <span className="text-sm font-semibold">{metric.display}</span>
              </div>
              <Progress
                value={metric.value}
                className={cn(
                  "h-2",
                  metric.destructive &&
                    "**:data-[slot=progress-indicator]:bg-destructive"
                )}
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-700 dark:text-amber-400" />
          <div>
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
              Storage Running Low
            </p>
            <p className="mt-1 text-xs text-amber-800 dark:text-amber-300/80">
              Only 25 GB remaining
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
