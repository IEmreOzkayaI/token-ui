import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import TabsDemo from "@/ui/components/tabs/demo"
import TabsDisabled from "@/ui/components/tabs/disabled"
import TabsIcons from "@/ui/components/tabs/icons"
import TabsLine from "@/ui/components/tabs/line"
import TabsVertical from "@/ui/components/tabs/vertical"

const examples = [
  {
    id: "demo",
    title: "Demo",
    component: TabsDemo,
    sourcePath: "ui/components/tabs/demo.tsx",
  },
  {
    id: "disabled",
    title: "Disabled",
    component: TabsDisabled,
    sourcePath: "ui/components/tabs/disabled.tsx",
  },
  {
    id: "icons",
    title: "Icons",
    component: TabsIcons,
    sourcePath: "ui/components/tabs/icons.tsx",
  },
  {
    id: "line",
    title: "Line",
    component: TabsLine,
    sourcePath: "ui/components/tabs/line.tsx",
  },
  {
    id: "vertical",
    title: "Vertical",
    component: TabsVertical,
    sourcePath: "ui/components/tabs/vertical.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "disabled", title: "Disabled", depth: 3 },
  { id: "icons", title: "Icons", depth: 3 },
  { id: "line", title: "Line", depth: 3 },
  { id: "vertical", title: "Vertical", depth: 3 },
]

export default function TabsPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Tabs"
        description="A set of layered sections of content — known as tab panels — displayed one at a time."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add tabs" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { Tabs } from "@/primitives/tabs"`}
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
