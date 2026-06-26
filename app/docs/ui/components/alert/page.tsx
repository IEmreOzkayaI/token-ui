import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import AlertActionExample from "@/ui/components/alert-action"
import AlertBasic from "@/ui/components/alert-basic"
import AlertColors from "@/ui/components/alert-colors"
import AlertDemo from "@/ui/components/alert-demo"
import AlertDestructive from "@/ui/components/alert-destructive"

const examples = [
  {
    id: "action",
    title: "Action",
    component: AlertActionExample,
    sourcePath: "ui/components/alert-action.tsx",
  },
  {
    id: "basic",
    title: "Basic",
    component: AlertBasic,
    sourcePath: "ui/components/alert-basic.tsx",
  },
  {
    id: "colors",
    title: "Colors",
    component: AlertColors,
    sourcePath: "ui/components/alert-colors.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: AlertDemo,
    sourcePath: "ui/components/alert-demo.tsx",
  },
  {
    id: "destructive",
    title: "Destructive",
    component: AlertDestructive,
    sourcePath: "ui/components/alert-destructive.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "action", title: "Action", depth: 3 },
  { id: "basic", title: "Basic", depth: 3 },
  { id: "colors", title: "Colors", depth: 3 },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "destructive", title: "Destructive", depth: 3 },
]

export default function AlertPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Alert"
        description="Displays a callout for important messages, warnings, or contextual information."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add alert" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { Alert } from "@/primitives/alert"`}
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
