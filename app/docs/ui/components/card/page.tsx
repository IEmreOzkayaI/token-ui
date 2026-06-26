import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import CardDemo from "@/ui/components/card-demo"
import CardEdgeToEdge from "@/ui/components/card-edge-to-edge"
import CardImage from "@/ui/components/card-image"
import CardSmall from "@/ui/components/card-small"
import CardSpacing from "@/ui/components/card-spacing"

const examples = [
  {
    id: "demo",
    title: "Demo",
    component: CardDemo,
    sourcePath: "ui/components/card-demo.tsx",
  },
  {
    id: "edge-to-edge",
    title: "Edge To Edge",
    component: CardEdgeToEdge,
    sourcePath: "ui/components/card-edge-to-edge.tsx",
  },
  {
    id: "image",
    title: "Image",
    component: CardImage,
    sourcePath: "ui/components/card-image.tsx",
  },
  {
    id: "small",
    title: "Small",
    component: CardSmall,
    sourcePath: "ui/components/card-small.tsx",
  },
  {
    id: "spacing",
    title: "Spacing",
    component: CardSpacing,
    sourcePath: "ui/components/card-spacing.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
    { id: "demo", title: "Demo" },
    { id: "edge-to-edge", title: "Edge To Edge" },
    { id: "image", title: "Image" },
    { id: "small", title: "Small" },
    { id: "spacing", title: "Spacing" },
]

export default function CardPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Card"
        description="Card component"
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
          code={`import { Card } from "@/primitives/card"`}
        />
      </DocsSection>

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
    </DocsPage>
  )
}
