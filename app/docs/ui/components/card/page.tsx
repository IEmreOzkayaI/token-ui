import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import CardCargoTracker from "@/ui/components/card/cargo-tracker"
import CardDemo from "@/ui/components/card/demo"
import CardDeviceStatus from "@/ui/components/card/device-status"
import CardEdgeToEdge from "@/ui/components/card/edge-to-edge"
import CardImage from "@/ui/components/card/image"
import CardMonthlyOverview from "@/ui/components/card/monthly-overview"
import CardPaymentMethod from "@/ui/components/card/payment-method"
import CardProduct from "@/ui/components/card/product"
import CardSmall from "@/ui/components/card/small"
import CardSpacing from "@/ui/components/card/spacing"
import CardWalletSummary from "@/ui/components/card/wallet-summary"
import CardWeather from "@/ui/components/card/weather"

const examples = [
  {
    id: "demo",
    title: "Demo",
    component: CardDemo,
    sourcePath: "ui/components/card/demo.tsx",
  },
  {
    id: "edge-to-edge",
    title: "Edge To Edge",
    component: CardEdgeToEdge,
    sourcePath: "ui/components/card/edge-to-edge.tsx",
  },
  {
    id: "image",
    title: "Image",
    component: CardImage,
    sourcePath: "ui/components/card/image.tsx",
  },
  {
    id: "small",
    title: "Small",
    component: CardSmall,
    sourcePath: "ui/components/card/small.tsx",
  },
  {
    id: "spacing",
    title: "Spacing",
    component: CardSpacing,
    sourcePath: "ui/components/card/spacing.tsx",
  },
  {
    id: "wallet-summary",
    title: "Wallet Summary",
    component: CardWalletSummary,
    sourcePath: "ui/components/card/wallet-summary.tsx",
  },
  {
    id: "weather",
    title: "Weather",
    component: CardWeather,
    sourcePath: "ui/components/card/weather.tsx",
  },
  {
    id: "cargo-tracker",
    title: "Cargo Tracker",
    component: CardCargoTracker,
    sourcePath: "ui/components/card/cargo-tracker.tsx",
  },
  {
    id: "device-status",
    title: "Device Status",
    component: CardDeviceStatus,
    sourcePath: "ui/components/card/device-status.tsx",
  },
  {
    id: "payment-method",
    title: "Payment Method",
    component: CardPaymentMethod,
    sourcePath: "ui/components/card/payment-method.tsx",
  },
  {
    id: "product",
    title: "Product",
    component: CardProduct,
    sourcePath: "ui/components/card/product.tsx",
  },
  {
    id: "monthly-overview",
    title: "Monthly Overview",
    component: CardMonthlyOverview,
    sourcePath: "ui/components/card/monthly-overview.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  ...examples.map((ex) => ({ id: ex.id, title: ex.title, depth: 3 })),
]

export default function CardPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Card"
        description="Displays a card with header, content, and footer."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the card primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add card" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the Card component."
      >
        <CodeBlock
          code={`import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/primitives/card"`}
        />
      </DocsSection>

      <DocsSection id="examples" title="Examples">
        <div className="space-y-10">
          {examples.map((example) => {
            const Component = example.component

            return (
              <DocsSection
                key={example.id}
                id={example.id}
                title={example.title}
              >
                <ComponentExample
                  source={readSource(example.sourcePath)}
                >
                  <Component />
                </ComponentExample>
              </DocsSection>
            )
          })}
        </div>
      </DocsSection>
    </DocsPage>
  )
}
