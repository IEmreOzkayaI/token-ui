import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import AspectRatioDemo from "@/ui/components/aspect-ratio-demo"
import AspectRatioPortrait from "@/ui/components/aspect-ratio-portrait"
import AspectRatioSquare from "@/ui/components/aspect-ratio-square"

const examples = [
  {
    id: "demo",
    title: "Demo",
    component: AspectRatioDemo,
    sourcePath: "ui/components/aspect-ratio-demo.tsx",
  },
  {
    id: "portrait",
    title: "Portrait",
    component: AspectRatioPortrait,
    sourcePath: "ui/components/aspect-ratio-portrait.tsx",
  },
  {
    id: "square",
    title: "Square",
    component: AspectRatioSquare,
    sourcePath: "ui/components/aspect-ratio-square.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "portrait", title: "Portrait", depth: 3 },
  { id: "square", title: "Square", depth: 3 },
]

export default function AspectRatioPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="AspectRatio"
        description="Displays content within a desired ratio, maintaining proportions across viewports."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add aspect-ratio" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { AspectRatio } from "@/primitives/aspect-ratio"`}
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
