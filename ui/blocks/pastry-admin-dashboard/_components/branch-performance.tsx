"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Badge } from "@/primitives/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/primitives/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/primitives/chart"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/primitives/table"

import type { BranchPerformance } from "../types"
import {
  chartConfig,
  formatCurrency,
  formatNumber,
  formatScore,
  getInventoryStatusLabel,
} from "../utils"

type BranchPerformanceSectionProps = {
  branches: BranchPerformance[]
  currency?: "TRY"
}

function inventoryBadgeVariant(status: BranchPerformance["inventoryStatus"]) {
  switch (status) {
    case "healthy":
      return "secondary" as const
    case "warning":
      return "outline" as const
    case "critical":
      return "destructive" as const
  }
}

function BranchPerformanceSection({
  branches,
  currency = "TRY",
}: BranchPerformanceSectionProps) {
  const chartData = branches.map((branch) => ({
    branch: branch.branchName,
    revenue: branch.revenue,
  }))

  return (
    <Card data-slot="pastry-admin-dashboard-branches">
      <CardHeader>
        <CardTitle>Şube Performansı</CardTitle>
        <CardDescription>
          Ciro, sipariş, sepet ortalaması, memnuniyet ve stok durumu sıralaması
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="overflow-x-auto no-scrollbar">
          <ChartContainer config={chartConfig} className="min-h-[220px] w-full aspect-auto sm:min-h-[240px]">
            <BarChart accessibilityLayer data={chartData} layout="vertical">
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="branch"
                type="category"
                tickLine={false}
                axisLine={false}
                width={96}
                tickFormatter={(value: string) =>
                  value.length > 14 ? `${value.slice(0, 12)}…` : value
                }
              />
            <XAxis type="number" hide />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => formatCurrency(Number(value), currency)}
                />
              }
            />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ChartContainer>
        </div>

        <div className="-mx-1 overflow-x-auto px-1">
          <Table className="min-w-[640px]">
            <TableHeader>
              <TableRow>
                <TableHead>Şube</TableHead>
                <TableHead className="text-right">Ciro</TableHead>
                <TableHead className="text-right">Sipariş</TableHead>
                <TableHead className="text-right">Sepet Ort.</TableHead>
                <TableHead className="text-right">Memnuniyet</TableHead>
                <TableHead>Stok</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branches.map((branch) => (
                <TableRow key={branch.branchId}>
                  <TableCell className="font-medium">{branch.branchName}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(branch.revenue, currency)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(branch.orders)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(branch.basketAverage, currency)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatScore(branch.satisfaction)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={inventoryBadgeVariant(branch.inventoryStatus)}>
                      {getInventoryStatusLabel(branch.inventoryStatus)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export { BranchPerformanceSection }
