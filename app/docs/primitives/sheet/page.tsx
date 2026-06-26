import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import SheetDemo from "@/ui/components/sheet-demo"
import SheetNoCloseButton from "@/ui/components/sheet-no-close-button"
import SheetSide from "@/ui/components/sheet-side"

const examples = [
  {
    id: "demo",
    title: "Demo",
    component: SheetDemo,
    sourcePath: "ui/components/sheet-demo.tsx",
  },
  {
    id: "no-close-button",
    title: "No Close Button",
    component: SheetNoCloseButton,
    sourcePath: "ui/components/sheet-no-close-button.tsx",
  },
  {
    id: "side",
    title: "Side",
    component: SheetSide,
    sourcePath: "ui/components/sheet-side.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
    { id: "demo", title: "Demo" },
    { id: "no-close-button", title: "No Close Button" },
    { id: "side", title: "Side" },
]

export default function SheetPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Sheet"
        description="Sheet component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the sheet primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add sheet" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the Sheet component."
      >
        <CodeBlock
          code={`import { Sheet } from "@/primitives/sheet"`}
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
