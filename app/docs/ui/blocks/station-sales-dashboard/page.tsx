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
import StationSalesDashboardDefault from "@/ui/blocks/station-sales-dashboard/default"
import StationSalesDashboardDemo from "@/ui/blocks/station-sales-dashboard/demo"
import StationSalesDashboardEmpty from "@/ui/blocks/station-sales-dashboard/empty"
import StationSalesDashboardLoading from "@/ui/blocks/station-sales-dashboard/loading"

const examples = [
  {
    id: "default",
    title: "Default",
    description: "Beş istasyonun ürün bazlı cirosu, KPI kartları ve sıralama grafiği.",
    component: StationSalesDashboardDefault,
    sourcePath: "ui/blocks/station-sales-dashboard/default.tsx",
  },
  {
    id: "demo",
    title: "City Filter",
    description: "Select ile şehir bazlı filtreleme.",
    component: StationSalesDashboardDemo,
    sourcePath: "ui/blocks/station-sales-dashboard/demo.tsx",
  },
  {
    id: "loading",
    title: "Loading",
    description: "Veri yüklenirken skeleton durumu.",
    component: StationSalesDashboardLoading,
    sourcePath: "ui/blocks/station-sales-dashboard/loading.tsx",
  },
  {
    id: "empty",
    title: "Empty",
    description: "İstasyon verisi olmadığında boş durum.",
    component: StationSalesDashboardEmpty,
    sourcePath: "ui/blocks/station-sales-dashboard/empty.tsx",
  },
] as const

const blockDoc = getBlockDocs("station-sales-dashboard")!

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

export default function StationSalesDashboardPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Station Sales Dashboard"
        description="Benzin istasyonlarının ürün bazlı satış cirolarını, toplam KPI'ları ve istasyon sıralamasını gösteren dashboard ekranı."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground">
          Station Sales Dashboard bir <strong className="text-foreground">screen block</strong>dır;{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">ui/blocks/station-sales-dashboard/</code>{" "}
          altında decompose edilmiş alt bileşenlerle sunulur.{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">StatCard</code>,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">Card</code> ve{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">Chart</code> primitive&apos;lerini
          birleştirir. Üst satırda toplam ciro, litre hacmi, aktif istasyon sayısı ve en çok satan
          ürünü gösterir.
        </p>
      </DocsSection>

      <DocsSection id="sub-components" title="Sub-components">
        <p className="mb-4 text-sm text-muted-foreground">
          Alt bileşen docs — izole demo + tam kaynak:
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
          code={`import { StationSalesDashboard } from "@/ui/blocks/station-sales-dashboard/station-sales-dashboard"

<StationSalesDashboard
  data={stationSales}
  title="İstasyon Satış Özeti"
  description="Tüm istasyonların ürün bazlı ciroları"
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
                <BlockExample
                  title={example.title}
                  source={readSource(example.sourcePath)}
                >
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
              <span className="ml-2">StationSale[] — istasyon satış verisi (zorunlu)</span>
            </li>
            <li>
              <code className="rounded bg-muted px-2 py-1">loading</code>
              <span className="ml-2">boolean (default: false) — skeleton durumu</span>
            </li>
            <li>
              <code className="rounded bg-muted px-2 py-1">title</code>
              <span className="ml-2">string — dashboard başlığı</span>
            </li>
            <li>
              <code className="rounded bg-muted px-2 py-1">description</code>
              <span className="ml-2">string — açıklama metni</span>
            </li>
            <li>
              <code className="rounded bg-muted px-2 py-1">currency</code>
              <span className="ml-2">&quot;TRY&quot; (default) — para birimi</span>
            </li>
          </ul>
        </div>
      </DocsSection>

      <DocsSection id="data-shape" title="Data Shape">
        <CodeBlock
          code={`type ProductCategory = "benzin95" | "benzin97" | "motorin" | "lpg"

type StationSale = {
  stationId: string
  stationName: string
  city?: string
  products: Record<ProductCategory, { liters: number; revenue: number }>
}`}
        />
      </DocsSection>

      <DocsSection id="best-practices" title="Best Practices">
        <DocsCallout title="API katmanından hazır veri geçirin" variant="info">
          Ekran presentationaldır — toplam ciro ve ürün kırılımlarını parent veya API
          katmanında hesaplayıp <code>data</code> prop&apos;u olarak iletin. Para formatı{" "}
          <code>formatCurrency</code> helper&apos;ı ile tutarlı kalır.
        </DocsCallout>
        <DocsCallout title="Boş ve yükleme durumlarını kullanın" variant="info">
          Veri fetch edilirken <code>loading</code> prop&apos;unu açın. İstasyon listesi boşsa
          bileşen otomatik empty state gösterir.
        </DocsCallout>
        <DocsCallout title="Chart renkleri token tabanlıdır" variant="info">
          Ürün kategorileri <code>--chart-1</code> ile <code>--chart-4</code> arası CSS
          değişkenlerini kullanır. Hardcoded hex renk kullanmayın.
        </DocsCallout>
      </DocsSection>
    </DocsPage>
  )
}
