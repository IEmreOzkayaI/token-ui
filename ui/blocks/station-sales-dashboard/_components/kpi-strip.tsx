import { StatCard } from "@/ui/components/stat-card/stat-card"

import {
  chartConfig,
  formatCurrency,
  formatLiters,
  type ProductCategory,
} from "../utils"

type KpiStripProps = {
  totalRevenue: number
  totalLiters: number
  stationCount: number
  topProduct: { category: ProductCategory; revenue: number }
  currency?: "TRY"
}

function KpiStrip({
  totalRevenue,
  totalLiters,
  stationCount,
  topProduct,
  currency = "TRY",
}: KpiStripProps) {
  return (
    <div
      data-slot="station-sales-dashboard-kpis"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      <StatCard
        className="max-w-none w-full"
        label="Toplam Ciro"
        value={formatCurrency(totalRevenue, currency)}
        description="Tüm istasyonlar, tüm ürünler"
      />
      <StatCard
        className="max-w-none w-full"
        label="Toplam Litre"
        value={formatLiters(totalLiters)}
        description="Litre bazında toplam hacim"
      />
      <StatCard
        className="max-w-none w-full"
        label="Aktif İstasyon"
        value={String(stationCount)}
        description="Sistemdeki istasyon sayısı"
      />
      <StatCard
        className="max-w-none w-full"
        label="En Çok Satan Ürün"
        value={chartConfig[topProduct.category].label}
        description={formatCurrency(topProduct.revenue, currency)}
      />
    </div>
  )
}

export { KpiStrip }
