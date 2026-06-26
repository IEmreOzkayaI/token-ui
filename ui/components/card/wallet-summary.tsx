import {
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/primitives/card"

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 mb-4 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
      {children}
    </p>
  )
}

export default function CardWalletSummary() {
  return (
    <Card className="w-full max-w-sm transition-shadow hover:shadow-md">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center justify-between">
          <span>Total Balance</span>
          <span className="text-xs font-normal text-muted-foreground">TRY</span>
        </CardTitle>
        <CardDescription>Your available balance</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">₺24,850.50</p>
        <p className="text-sm text-muted-foreground">+2.5% from last month</p>

        <SectionLabel>Last Transaction</SectionLabel>
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ArrowDownLeft className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium">Payment Received</p>
              <p className="text-xs text-muted-foreground">Today at 2:30 PM</p>
            </div>
          </div>
          <p className="shrink-0 font-semibold text-primary">+₺1,250.00</p>
        </div>

        <SectionLabel>Account Status</SectionLabel>
        <div className="flex items-center justify-between rounded-lg bg-muted p-3">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500" />
            <span className="text-sm font-medium">Active</span>
          </div>
          <ArrowUpRight className="size-4 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  )
}
