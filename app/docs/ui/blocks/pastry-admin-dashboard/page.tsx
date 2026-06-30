import Link from "next/link"

import { BlockExample } from "@/app/docs/_components/block-example"
import { DocsCallout } from "@/app/docs/_components/docs-callout"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { getBlockDocs } from "@/app/docs/_lib/block-subcomponents"
import { readSource } from "@/app/docs/_lib/read-source"
import type { TocItem } from "@/app/docs/_lib/toc"
import PastryAdminDashboardDefault from "@/ui/blocks/pastry-admin-dashboard/default"
import PastryAdminDashboardDemo from "@/ui/blocks/pastry-admin-dashboard/demo"
import PastryAdminDashboardEmpty from "@/ui/blocks/pastry-admin-dashboard/empty"
import PastryAdminDashboardLoading from "@/ui/blocks/pastry-admin-dashboard/loading"

const examples = [
  {
    id: "default",
    title: "Default",
    description:
      "Divan benzeri pastane markası için tam yönetici paneli — KPI, ciro, şube, ürün, operasyon ve catering bölümleri.",
    component: PastryAdminDashboardDefault,
    sourcePath: "ui/blocks/pastry-admin-dashboard/default.tsx",
  },
  {
    id: "demo",
    title: "Interactive Filters",
    description: "Tarih aralığı, şube ve kanal filtreleri ile mock veri daraltma.",
    component: PastryAdminDashboardDemo,
    sourcePath: "ui/blocks/pastry-admin-dashboard/demo.tsx",
  },
  {
    id: "loading",
    title: "Loading",
    description: "Veri yüklenirken bölüm başlıklarını yansıtan skeleton durumu.",
    component: PastryAdminDashboardLoading,
    sourcePath: "ui/blocks/pastry-admin-dashboard/loading.tsx",
  },
  {
    id: "empty",
    title: "Empty",
    description: "Şube verisi olmadığında aynı layout ile boş durum mesajları.",
    component: PastryAdminDashboardEmpty,
    sourcePath: "ui/blocks/pastry-admin-dashboard/empty.tsx",
  },
] as const

const blockDoc = getBlockDocs("pastry-admin-dashboard")!

const toc: TocItem[] = [
  { id: "overview", title: "Overview" },
  { id: "sub-components", title: "Sub-components" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  ...examples.map((ex) => ({ id: ex.id, title: ex.title, depth: 3 as const })),
  { id: "props", title: "Props" },
  { id: "data-shape", title: "Data Shape" },
  { id: "best-practices", title: "Best Practices" },
]

export default function PastryAdminDashboardPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Pastry Admin Dashboard"
        description="Pastane, restoran ve catering markaları için sakin, zarif yönetici paneli — şube, online ve catering kanallarının birleşik operasyon görünümü."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground">
          Pastry Admin Dashboard bir{" "}
          <strong className="text-foreground">screen block</strong>dır;{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            ui/blocks/pastry-admin-dashboard/
          </code>{" "}
          altında on bölüme ayrılmış alt bileşenlerle sunulur. KPI&apos;lar yalnızca{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">StatCard</code> ile
          gösterilir; grafikler <code>--chart-1</code> ile <code>--chart-5</code> token
          aralığını kullanır.
        </p>
      </DocsSection>

      <DocsSection id="sub-components" title="Sub-components">
        <p className="mb-4 text-sm text-muted-foreground">
          Her <code className="rounded bg-muted px-1.5 py-0.5 text-sm">_components/</code>{" "}
          dosyası için ayrı docs sayfası, izole demo ve tam kaynak kodu:
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {blockDoc.subcomponents.map((entry) => (
            <li key={entry.slug}>
              <Link
                href={`${blockDoc.baseHref}/${entry.slug}`}
                className="block rounded-lg border border-border px-3 py-2.5 text-sm transition-colors hover:border-primary/30 hover:bg-primary/5"
              >
                <span className="font-mono font-medium text-foreground">{entry.slug}</span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {entry.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <CodeBlock
          code={`import { PastryAdminDashboard } from "@/ui/blocks/pastry-admin-dashboard"

<PastryAdminDashboard
  data={dashboardData}
  title="Divan Operasyon Paneli"
  subtitle="Şube, online ve catering kanallarının birleşik görünümü"
/>`}
        />
      </DocsSection>

      <DocsSection id="examples" title="Examples">
        <div className="space-y-10">
          {examples.map((example) => {
            const Component = example.component

            return (
              <DocsSection key={example.id} id={example.id} title={example.title}>
                <p className="mb-4 text-sm text-muted-foreground">{example.description}</p>
                <BlockExample title={example.title} source={readSource(example.sourcePath)}>
                  <Component />
                </BlockExample>
              </DocsSection>
            )
          })}
        </div>
      </DocsSection>

      <DocsSection id="props" title="Props">
        <div className="space-y-4 text-sm">
          <ul className="ml-4 space-y-2 text-muted-foreground">
            <li>
              <code className="rounded bg-muted px-2 py-1">data</code>
              <span className="ml-2">
                PastryDashboardData — dashboard verisi (zorunlu)
              </span>
            </li>
            <li>
              <code className="rounded bg-muted px-2 py-1">loading</code>
              <span className="ml-2">boolean (default: false) — skeleton durumu</span>
            </li>
            <li>
              <code className="rounded bg-muted px-2 py-1">filters</code>
              <span className="ml-2">
                DashboardFilters — tarih aralığı, şube ve kanal filtreleri
              </span>
            </li>
            <li>
              <code className="rounded bg-muted px-2 py-1">interactive</code>
              <span className="ml-2">
                boolean — toolbar filtrelerinin etkileşimli olup olmadığı
              </span>
            </li>
            <li>
              <code className="rounded bg-muted px-2 py-1">title</code>
              <span className="ml-2">string — panel başlığı</span>
            </li>
            <li>
              <code className="rounded bg-muted px-2 py-1">subtitle</code>
              <span className="ml-2">string — açıklama metni</span>
            </li>
            <li>
              <code className="rounded bg-muted px-2 py-1">currency</code>
              <span className="ml-2">&quot;TRY&quot; (default) — tr-TR para formatı</span>
            </li>
          </ul>
        </div>
      </DocsSection>

      <DocsSection id="data-shape" title="Data Shape">
        <CodeBlock
          code={`type PastryDashboardData = {
  branches: Branch[]
  dailyRevenue: DailyRevenue[]
  branchPerformance: BranchPerformance[]
  products: ProductRecord[]
  kitchenOrders: KitchenOrder[]
  deliveryQueue: DeliveryQueueItem[]
  productionQueue: ProductionQueueItem[]
  incidents: Incident[]
  qualityAlerts: QualityAlert[]
  stockRisk: StockRiskItem[]
  waste: WasteRecord[]
  expiring: ExpiringItem[]
  consumption: ConsumptionRecord[]
  cateringEvents: CateringEvent[]
  corporateClients: CorporateClient[]
  satisfactionTrend: SatisfactionPoint[]
  businessInsights: BusinessInsight[]
}`}
        />
      </DocsSection>

      <DocsSection id="best-practices" title="Best Practices">
        <DocsCallout title="Aggregates utils katmanında" variant="info">
          KPI ve grafik toplamlarını JSX içinde hesaplamayın.{" "}
          <code>computeAggregates</code> ve <code>filterDashboardData</code> helper&apos;larını
          kullanın.
        </DocsCallout>
        <DocsCallout title="StatCard yalnızca KPI için" variant="info">
          KPI şeridinde <code>className=&quot;max-w-none w-full&quot;</code> ile StatCard
          kullanın. Özel gradient kartlar veya hardcoded hex renkler eklemeyin.
        </DocsCallout>
        <DocsCallout title="Loading ve empty layout tutarlılığı" variant="info">
          Yükleme durumunda bölüm başlıklarını skeleton ile yansıtın. Boş durumda aynı
          bölüm yapısını koruyup <code>Empty</code> bileşenleri gösterin.
        </DocsCallout>
      </DocsSection>
    </DocsPage>
  )
}
