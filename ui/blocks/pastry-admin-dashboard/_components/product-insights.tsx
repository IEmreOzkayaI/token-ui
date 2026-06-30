"use client"

import { Cell, Pie, PieChart } from "recharts"

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

import type { ProductRecord } from "../types"
import {
  chartConfig,
  formatCurrency,
  formatNumber,
  formatPercent,
  getInventoryStatusLabel,
  type CategoryDistributionRow,
} from "../utils"

type ProductInsightsProps = {
  bestsellers: ProductRecord[]
  growing: ProductRecord[]
  lowStock: ProductRecord[]
  categoryDistribution: CategoryDistributionRow[]
  currency?: "TRY"
}

function ProductInsights({
  bestsellers,
  growing,
  lowStock,
  categoryDistribution,
  currency = "TRY",
}: ProductInsightsProps) {
  return (
    <Card data-slot="pastry-admin-dashboard-products">
      <CardHeader>
        <CardTitle>Ürün İçgörüleri</CardTitle>
        <CardDescription>
          En çok satanlar, büyüyen ürünler, düşük stok uyarıları ve kategori dağılımı
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-sm font-medium">En Çok Satanlar</h4>
              <ul className="space-y-2">
                {bestsellers.map((product) => (
                  <li
                    key={product.productId}
                    className="flex flex-col gap-2 rounded-lg border px-3 py-2 text-sm sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span>{product.productName}</span>
                    <span className="text-muted-foreground">
                      {formatCurrency(product.revenue, currency)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-medium">Büyüyen Ürünler</h4>
              <ul className="space-y-2">
                {growing.map((product) => (
                  <li
                    key={product.productId}
                    className="flex flex-col gap-2 rounded-lg border px-3 py-2 text-sm sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span>{product.productName}</span>
                    <Badge variant="secondary">{formatPercent(product.growthRate)}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-sm font-medium">Düşük Stok</h4>
              <ul className="space-y-2">
                {lowStock.map((product) => (
                  <li
                    key={product.productId}
                    className="flex flex-col gap-2 rounded-lg border px-3 py-2 text-sm sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span>{product.productName}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">
                        {formatNumber(product.stockLevel)} adet
                      </span>
                      <Badge
                        variant={
                          product.stockStatus === "critical" ? "destructive" : "outline"
                        }
                      >
                        {getInventoryStatusLabel(product.stockStatus)}
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-medium">Kategori Dağılımı</h4>
              <ChartContainer config={chartConfig} className="min-h-[200px] w-full aspect-auto">
                <PieChart>
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => formatCurrency(Number(value), currency)}
                      />
                    }
                  />
                  <Pie
                    data={categoryDistribution}
                    dataKey="revenue"
                    nameKey="category"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                  >
                    {categoryDistribution.map((entry) => (
                      <Cell key={entry.category} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { ProductInsights }
