import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import TooltipDemo from "@/ui/components/tooltip/demo"
import TooltipDisabled from "@/ui/components/tooltip/disabled"
import TooltipKeyboard from "@/ui/components/tooltip/keyboard"
import TooltipSides from "@/ui/components/tooltip/sides"

const examples = [
  {
    id: "demo",
    title: "Demo",
    component: TooltipDemo,
    sourcePath: "ui/components/tooltip/demo.tsx",
  },
  {
    id: "disabled",
    title: "Disabled",
    component: TooltipDisabled,
    sourcePath: "ui/components/tooltip/disabled.tsx",
  },
  {
    id: "keyboard",
    title: "Keyboard",
    component: TooltipKeyboard,
    sourcePath: "ui/components/tooltip/keyboard.tsx",
  },
  {
    id: "sides",
    title: "Sides",
    component: TooltipSides,
    sourcePath: "ui/components/tooltip/sides.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "disabled", title: "Disabled", depth: 3 },
  { id: "keyboard", title: "Keyboard", depth: 3 },
  { id: "sides", title: "Sides", depth: 3 },
]

export default function TooltipPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Tooltip"
        description="A popup that displays information related to an element on hover or focus."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add tooltip" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { Tooltip } from "@/primitives/tooltip"`}
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
