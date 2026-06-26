import { ArrowDownLeft, ArrowUpRight } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/primitives/card"

const rows = [
  {
    label: "Expenses",
    amount: "-₺8,420.00",
    icon: ArrowUpRight,
    iconClassName: "text-destructive",
  },
  {
    label: "Income",
    amount: "+₺12,150.00",
    icon: ArrowDownLeft,
    iconClassName: "text-emerald-600",
  },
]

export default function CardMonthlyOverview() {
  return (
    <Card className="w-full max-w-sm transition-shadow hover:shadow-md">
      <CardHeader className="border-b">
        <CardTitle>Monthly Overview</CardTitle>
        <CardDescription>Transaction summary</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <row.icon className={`size-4 ${row.iconClassName}`} />
              {row.label}
            </span>
            <span className="text-sm font-medium">{row.amount}</span>
          </div>
        ))}

        <div className="flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm font-medium">Net</span>
          <span className="text-lg font-bold text-primary">+₺3,730.00</span>
        </div>
      </CardContent>
    </Card>
  )
}
