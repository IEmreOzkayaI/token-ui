import { Sparkles } from "lucide-react"

import { Badge } from "@/primitives/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/primitives/card"

import type { BusinessInsight } from "../types"
import { getInsightSeverityLabel } from "../utils"

type BusinessInsightsProps = {
  insights: BusinessInsight[]
}

function severityVariant(severity: BusinessInsight["severity"]) {
  switch (severity) {
    case "info":
      return "secondary" as const
    case "warning":
      return "outline" as const
    case "critical":
      return "destructive" as const
  }
}

function areaLabel(area: BusinessInsight["relatedArea"]) {
  switch (area) {
    case "revenue":
      return "Ciro"
    case "inventory":
      return "Stok"
    case "branch":
      return "Şube"
    case "catering":
      return "Catering"
    case "customer":
      return "Müşteri"
  }
}

function BusinessInsights({ insights }: BusinessInsightsProps) {
  return (
    <Card
      data-slot="pastry-admin-dashboard-insights"
      className="h-full border-primary/15 bg-primary/[0.02]"
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Sparkles className="size-4" aria-hidden />
          </span>
          <div>
            <CardTitle>İş Zekası Özeti</CardTitle>
            <CardDescription>Yönetici brifingi — öncelikli aksiyonlar</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {insights.map((insight) => (
            <li
              key={insight.id}
              className="rounded-lg border border-border/80 bg-background p-4 shadow-sm"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="font-mono text-[10px] uppercase">
                  {areaLabel(insight.relatedArea)}
                </Badge>
                <Badge variant={severityVariant(insight.severity)}>
                  {getInsightSeverityLabel(insight.severity)}
                </Badge>
              </div>
              <p className="font-medium leading-snug">{insight.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {insight.message}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export { BusinessInsights }
