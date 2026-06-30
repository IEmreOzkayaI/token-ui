import { StatCard } from "@/ui/components/stat-card/stat-card"

import type { DashboardAggregates } from "../types"
import { formatCurrency, formatNumber, formatPercent, formatScore } from "../utils"

type KpiStripProps = {
  aggregates: DashboardAggregates
  currency?: "TRY"
}

function KpiStrip({ aggregates, currency = "TRY" }: KpiStripProps) {
  return (
    <div
      data-slot="pastry-admin-dashboard-kpis"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6"
    >
      <StatCard
        className="max-w-none w-full"
        label="Bugünkü Ciro"
        value={formatCurrency(aggregates.todayRevenue, currency)}
        description="Seçili kanal ve şube"
        trend={{
          value: formatPercent(Math.abs(aggregates.periodComparison.changePercent)),
          direction:
            aggregates.periodComparison.changePercent > 0
              ? "up"
              : aggregates.periodComparison.changePercent < 0
                ? "down"
                : "neutral",
          label: "Önceki döneme göre",
        }}
      />
      <StatCard
        className="max-w-none w-full"
        label="Aylık Ciro"
        value={formatCurrency(aggregates.monthlyRevenue, currency)}
        description="Seçili tarih aralığı toplamı"
      />
      <StatCard
        className="max-w-none w-full"
        label="Aktif Siparişler"
        value={formatNumber(aggregates.activeOrders)}
        description="Mutfak ve teslimat kuyruğu"
      />
      <StatCard
        className="max-w-none w-full"
        label="Catering Talepleri"
        value={formatNumber(aggregates.cateringRequests)}
        description="Onay bekleyen etkinlikler"
      />
      <StatCard
        className="max-w-none w-full"
        label="Müşteri Memnuniyeti"
        value={formatScore(aggregates.customerSatisfaction)}
        description="5 üzerinden ortalama puan"
      />
      <StatCard
        className="max-w-none w-full"
        label="Stok Sağlık Skoru"
        value={formatPercent(aggregates.inventoryHealthScore, 0)}
        description="Sağlıklı şube oranı"
      />
    </div>
  )
}

export { KpiStrip }
