import { Badge } from "@/primitives/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/primitives/card"

import type {
  ConsumptionRecord,
  ExpiringItem,
  StockRiskItem,
  WasteRecord,
} from "../types"
import {
  formatCurrency,
  formatPercent,
  getInventoryStatusLabel,
} from "../utils"

type InventoryIntelligenceProps = {
  stockRisk: StockRiskItem[]
  waste: WasteRecord[]
  expiring: ExpiringItem[]
  consumption: ConsumptionRecord[]
  currency?: "TRY"
}

function InventoryIntelligence({
  stockRisk,
  waste,
  expiring,
  consumption,
  currency = "TRY",
}: InventoryIntelligenceProps) {
  return (
    <Card data-slot="pastry-admin-dashboard-inventory">
      <CardHeader>
        <CardTitle>Stok Zekası</CardTitle>
        <CardDescription>
          Stok riski, fire, son kullanma tarihi yaklaşan ürünler ve tüketim trendleri
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Stok Riski</h4>
            <ul className="space-y-2">
              {stockRisk.map((item) => (
                <li key={item.id} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                  <div>
                    <p className="font-medium">{item.ingredient}</p>
                    <p className="text-muted-foreground">{item.daysRemaining} gün kaldı</p>
                  </div>
                  <Badge
                    variant={item.riskLevel === "critical" ? "destructive" : "outline"}
                  >
                    {getInventoryStatusLabel(item.riskLevel)}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Fire Kayıtları</h4>
            <ul className="space-y-2">
              {waste.map((item) => (
                <li key={item.id} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                  <div>
                    <p className="font-medium">{item.item}</p>
                    <p className="text-muted-foreground">{item.amount}</p>
                  </div>
                  <span className="text-muted-foreground">
                    {formatCurrency(item.cost, currency)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Yakında Sona Erecek</h4>
            <ul className="space-y-2">
              {expiring.map((item) => (
                <li key={item.id} className="rounded-lg border p-3 text-sm">
                  <p className="font-medium">{item.item}</p>
                  <p className="text-muted-foreground">
                    {item.quantity} · {item.expiresInHours} saat içinde
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Tüketim Trendi</h4>
            <ul className="space-y-2">
              {consumption.map((item) => (
                <li key={item.id} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                  <div>
                    <p className="font-medium">{item.ingredient}</p>
                    <p className="text-muted-foreground">Günlük {item.dailyUsage}</p>
                  </div>
                  <Badge variant={item.trend >= 0 ? "secondary" : "outline"}>
                    {formatPercent(item.trend)}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { InventoryIntelligence }
