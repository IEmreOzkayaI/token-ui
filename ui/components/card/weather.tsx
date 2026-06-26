import { Cloud, CloudRain } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/primitives/card"

const forecast = [
  { day: "Tomorrow", temp: "23°C", icon: CloudRain },
  { day: "Wednesday", temp: "22°C", icon: CloudRain },
  { day: "Thursday", temp: "25°C", icon: Cloud },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 mb-4 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
      {children}
    </p>
  )
}

export default function CardWeather() {
  return (
    <Card className="w-full max-w-sm transition-shadow hover:shadow-md">
      <CardHeader className="border-b">
        <CardTitle>Istanbul, Turkey</CardTitle>
        <CardDescription>Today&apos;s weather</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-5xl font-bold">24°C</p>
            <p className="text-sm text-muted-foreground">Partly Cloudy</p>
          </div>
          <Cloud className="size-20 text-muted-foreground/50" />
        </div>

        <SectionLabel>Details</SectionLabel>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-muted p-3">
            <p className="text-xs text-muted-foreground">Humidity</p>
            <p className="mt-2 text-sm font-semibold">65%</p>
          </div>
          <div className="rounded-lg bg-muted p-3">
            <p className="text-xs text-muted-foreground">Wind</p>
            <p className="mt-2 text-sm font-semibold">12 km/h</p>
          </div>
        </div>

        <SectionLabel>3-Day Forecast</SectionLabel>
        <div className="divide-y divide-border">
          {forecast.map((item) => (
            <div
              key={item.day}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-2">
                <item.icon className="size-4 text-muted-foreground" />
                <span className="text-sm">{item.day}</span>
              </div>
              <span className="text-sm font-medium">{item.temp}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
