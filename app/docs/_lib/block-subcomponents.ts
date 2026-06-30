export type BlockSubcomponentEntry = {
  /** PascalCase URL segment, e.g. BranchPerformanceSection */
  slug: string
  label: string
  description: string
  sourcePath: string
  importPath: string
  usageCode: string
  propsDoc: string
}

export type BlockDocsEntry = {
  slug: string
  label: string
  baseHref: string
  blockFolder: string
  subcomponents: BlockSubcomponentEntry[]
}

export const blockDocsRegistry: BlockDocsEntry[] = [
  {
    slug: "pastry-admin-dashboard",
    label: "Pastry Admin Dashboard",
    baseHref: "/docs/ui/blocks/pastry-admin-dashboard",
    blockFolder: "ui/blocks/pastry-admin-dashboard",
    subcomponents: [
      {
        slug: "DashboardToolbar",
        label: "DashboardToolbar",
        description: "Sayfa başlığı, tarih aralığı, şube ve kanal filtreleri, dışa aktar aksiyonu.",
        sourcePath:
          "ui/blocks/pastry-admin-dashboard/_components/dashboard-toolbar.tsx",
        importPath:
          "@/ui/blocks/pastry-admin-dashboard/_components/dashboard-toolbar",
        usageCode: `import { DashboardToolbar } from "@/ui/blocks/pastry-admin-dashboard/_components/dashboard-toolbar"

<DashboardToolbar
  title="Executive Dashboard"
  subtitle="..."
  branches={branches}
  dateRange="30d"
  branchId="all"
  channel="all"
  onDateRangeChange={setDateRange}
  onBranchChange={setBranch}
  onChannelChange={setChannel}
  onExport={handleExport}
  interactive
/>`,
        propsDoc: `title, subtitle, branches, dateRange, branchId, channel, onDateRangeChange, onBranchChange, onChannelChange, onExport?, interactive?`,
      },
      {
        slug: "KpiStrip",
        label: "KpiStrip",
        description: "Altı StatCard KPI: günlük/aylık ciro, aktif sipariş, catering, memnuniyet, stok skoru.",
        sourcePath: "ui/blocks/pastry-admin-dashboard/_components/kpi-strip.tsx",
        importPath: "@/ui/blocks/pastry-admin-dashboard/_components/kpi-strip",
        usageCode: `import { KpiStrip } from "@/ui/blocks/pastry-admin-dashboard/_components/kpi-strip"

<KpiStrip aggregates={aggregates} currency="TRY" />`,
        propsDoc: `aggregates: DashboardAggregates, currency?: "TRY"`,
      },
      {
        slug: "RevenueOverview",
        label: "RevenueOverview",
        description: "Birincil ciro grafiği, kanal dağılımı ve dönem karşılaştırması.",
        sourcePath:
          "ui/blocks/pastry-admin-dashboard/_components/revenue-overview.tsx",
        importPath:
          "@/ui/blocks/pastry-admin-dashboard/_components/revenue-overview",
        usageCode: `import { RevenueOverview } from "@/ui/blocks/pastry-admin-dashboard/_components/revenue-overview"

<RevenueOverview
  revenueData={revenueData}
  channelComparison={channelComparison}
  periodComparison={periodComparison}
  channel="all"
  changePercent={12.4}
  currency="TRY"
/>`,
        propsDoc: `revenueData, channelComparison, periodComparison, channel, changePercent, currency?`,
      },
      {
        slug: "BranchPerformanceSection",
        label: "BranchPerformanceSection",
        description: "Şube ciro sıralama grafiği ve detay tablosu.",
        sourcePath:
          "ui/blocks/pastry-admin-dashboard/_components/branch-performance.tsx",
        importPath:
          "@/ui/blocks/pastry-admin-dashboard/_components/branch-performance",
        usageCode: `import { BranchPerformanceSection } from "@/ui/blocks/pastry-admin-dashboard/_components/branch-performance"

<BranchPerformanceSection branches={branches} currency="TRY" />`,
        propsDoc: `branches: BranchPerformance[], currency?: "TRY"`,
      },
      {
        slug: "ProductInsights",
        label: "ProductInsights",
        description: "En çok satanlar, büyüyen ürünler, düşük stok ve kategori pasta grafiği.",
        sourcePath:
          "ui/blocks/pastry-admin-dashboard/_components/product-insights.tsx",
        importPath:
          "@/ui/blocks/pastry-admin-dashboard/_components/product-insights",
        usageCode: `import { ProductInsights } from "@/ui/blocks/pastry-admin-dashboard/_components/product-insights"

<ProductInsights
  bestsellers={bestsellers}
  growing={growing}
  lowStock={lowStock}
  categoryDistribution={categoryDistribution}
  currency="TRY"
/>`,
        propsDoc: `bestsellers, growing, lowStock, categoryDistribution, currency?`,
      },
      {
        slug: "OperationsCenter",
        label: "OperationsCenter",
        description: "Mutfak, teslimat, üretim kuyrukları, olaylar ve kalite uyarıları.",
        sourcePath:
          "ui/blocks/pastry-admin-dashboard/_components/operations-center.tsx",
        importPath:
          "@/ui/blocks/pastry-admin-dashboard/_components/operations-center",
        usageCode: `import { OperationsCenter } from "@/ui/blocks/pastry-admin-dashboard/_components/operations-center"

<OperationsCenter
  kitchenOrders={kitchenOrders}
  deliveryQueue={deliveryQueue}
  productionQueue={productionQueue}
  incidents={incidents}
  qualityAlerts={qualityAlerts}
/>`,
        propsDoc: `kitchenOrders, deliveryQueue, productionQueue, incidents, qualityAlerts`,
      },
      {
        slug: "InventoryIntelligence",
        label: "InventoryIntelligence",
        description: "Stok riski, fire, son kullanma ve tüketim trendleri.",
        sourcePath:
          "ui/blocks/pastry-admin-dashboard/_components/inventory-intelligence.tsx",
        importPath:
          "@/ui/blocks/pastry-admin-dashboard/_components/inventory-intelligence",
        usageCode: `import { InventoryIntelligence } from "@/ui/blocks/pastry-admin-dashboard/_components/inventory-intelligence"

<InventoryIntelligence
  stockRisk={stockRisk}
  waste={waste}
  expiring={expiring}
  consumption={consumption}
  currency="TRY"
/>`,
        propsDoc: `stockRisk, waste, expiring, consumption, currency?`,
      },
      {
        slug: "CateringOverview",
        label: "CateringOverview",
        description: "Catering etkinlikleri, kurumsal müşteriler ve beklenen ciro KPI'ları.",
        sourcePath:
          "ui/blocks/pastry-admin-dashboard/_components/catering-overview.tsx",
        importPath:
          "@/ui/blocks/pastry-admin-dashboard/_components/catering-overview",
        usageCode: `import { CateringOverview } from "@/ui/blocks/pastry-admin-dashboard/_components/catering-overview"

<CateringOverview
  events={events}
  corporateClients={corporateClients}
  expectedRevenue={expectedRevenue}
  pendingApprovals={pendingApprovals}
  currency="TRY"
/>`,
        propsDoc: `events, corporateClients, expectedRevenue, pendingApprovals, currency?`,
      },
      {
        slug: "CustomerIntelligence",
        label: "CustomerIntelligence",
        description: "Müşteri segment KPI'ları ve memnuniyet trend grafiği.",
        sourcePath:
          "ui/blocks/pastry-admin-dashboard/_components/customer-intelligence.tsx",
        importPath:
          "@/ui/blocks/pastry-admin-dashboard/_components/customer-intelligence",
        usageCode: `import { CustomerIntelligence } from "@/ui/blocks/pastry-admin-dashboard/_components/customer-intelligence"

<CustomerIntelligence
  aggregates={aggregates}
  satisfactionTrend={satisfactionTrend}
  currency="TRY"
/>`,
        propsDoc: `aggregates, satisfactionTrend, currency?`,
      },
      {
        slug: "BusinessInsights",
        label: "BusinessInsights",
        description: "Yönetici brifingi — öncelikli AI destekli iş içgörüleri paneli.",
        sourcePath:
          "ui/blocks/pastry-admin-dashboard/_components/business-insights.tsx",
        importPath:
          "@/ui/blocks/pastry-admin-dashboard/_components/business-insights",
        usageCode: `import { BusinessInsights } from "@/ui/blocks/pastry-admin-dashboard/_components/business-insights"

<BusinessInsights insights={insights} />`,
        propsDoc: `insights: BusinessInsight[]`,
      },
    ],
  },
  {
    slug: "station-sales-dashboard",
    label: "Station Sales Dashboard",
    baseHref: "/docs/ui/blocks/station-sales-dashboard",
    blockFolder: "ui/blocks/station-sales-dashboard",
    subcomponents: [
      {
        slug: "DashboardHeader",
        label: "DashboardHeader",
        description: "Block başlık ve açıklama alanı.",
        sourcePath:
          "ui/blocks/station-sales-dashboard/_components/dashboard-header.tsx",
        importPath:
          "@/ui/blocks/station-sales-dashboard/_components/dashboard-header",
        usageCode: `import { DashboardHeader } from "@/ui/blocks/station-sales-dashboard/_components/dashboard-header"

<DashboardHeader title="İstasyon Satış Özeti" description="..." />`,
        propsDoc: `title: string, description: string`,
      },
      {
        slug: "DashboardToolbar",
        label: "DashboardToolbar",
        description: "Şehir filtresi Select + Label (demo toolbar).",
        sourcePath:
          "ui/blocks/station-sales-dashboard/_components/dashboard-toolbar.tsx",
        importPath:
          "@/ui/blocks/station-sales-dashboard/_components/dashboard-toolbar",
        usageCode: `import { DashboardToolbar } from "@/ui/blocks/station-sales-dashboard/_components/dashboard-toolbar"

<DashboardToolbar cities={cities} value={city} onValueChange={setCity} />`,
        propsDoc: `cities: string[], value: string, onValueChange: (value: string) => void`,
      },
      {
        slug: "KpiStrip",
        label: "KpiStrip",
        description: "Dört StatCard: toplam ciro, litre, istasyon sayısı, en çok satan ürün.",
        sourcePath: "ui/blocks/station-sales-dashboard/_components/kpi-strip.tsx",
        importPath: "@/ui/blocks/station-sales-dashboard/_components/kpi-strip",
        usageCode: `import { KpiStrip } from "@/ui/blocks/station-sales-dashboard/_components/kpi-strip"

<KpiStrip
  totalRevenue={totalRevenue}
  totalLiters={totalLiters}
  stationCount={stationCount}
  topProduct={topProduct}
  currency="TRY"
/>`,
        propsDoc: `totalRevenue, totalLiters, stationCount, topProduct, currency?`,
      },
      {
        slug: "ProductSalesChart",
        label: "ProductSalesChart",
        description: "İstasyon × ürün grouped bar chart, horizontal scroll.",
        sourcePath:
          "ui/blocks/station-sales-dashboard/_components/product-sales-chart.tsx",
        importPath:
          "@/ui/blocks/station-sales-dashboard/_components/product-sales-chart",
        usageCode: `import { ProductSalesChart } from "@/ui/blocks/station-sales-dashboard/_components/product-sales-chart"

<ProductSalesChart data={groupedData} />`,
        propsDoc: `data: GroupedChartRow[]`,
      },
      {
        slug: "StationRankingChart",
        label: "StationRankingChart",
        description: "Yatay bar ile istasyon ciro sıralaması.",
        sourcePath:
          "ui/blocks/station-sales-dashboard/_components/station-ranking-chart.tsx",
        importPath:
          "@/ui/blocks/station-sales-dashboard/_components/station-ranking-chart",
        usageCode: `import { StationRankingChart } from "@/ui/blocks/station-sales-dashboard/_components/station-ranking-chart"

<StationRankingChart data={rankingData} />`,
        propsDoc: `data: RankingChartRow[]`,
      },
    ],
  },
]

export function getBlockDocs(blockSlug: string) {
  return blockDocsRegistry.find((block) => block.slug === blockSlug)
}

export function getBlockSubcomponent(blockSlug: string, part: string) {
  const block = getBlockDocs(blockSlug)
  return block?.subcomponents.find((entry) => entry.slug === part)
}

export function blockDocsToNavItems(): NavItemFromRegistry[] {
  return blockDocsRegistry.map((block) => ({
    label: block.label,
    href: block.baseHref,
    items: block.subcomponents.map((sc) => ({
      label: sc.slug,
      href: `${block.baseHref}/${sc.slug}`,
    })),
  }))
}

type NavItemFromRegistry = {
  label: string
  href: string
  items: { label: string; href: string }[]
}
