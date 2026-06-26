import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import KbdButton from "@/ui/components/kbd-button"
import KbdDemo from "@/ui/components/kbd-demo"
import KbdGroupExample from "@/ui/components/kbd-group"
import KbdInputGroup from "@/ui/components/kbd-input-group"
import KbdTooltip from "@/ui/components/kbd-tooltip"

const examples = [
  {
    id: "button",
    title: "Button",
    component: KbdButton,
    sourcePath: "ui/components/kbd-button.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: KbdDemo,
    sourcePath: "ui/components/kbd-demo.tsx",
  },
  {
    id: "group",
    title: "Group",
    component: KbdGroupExample,
    sourcePath: "ui/components/kbd-group.tsx",
  },
  {
    id: "input-group",
    title: "Input Group",
    component: KbdInputGroup,
    sourcePath: "ui/components/kbd-input-group.tsx",
  },
  {
    id: "tooltip",
    title: "Tooltip",
    component: KbdTooltip,
    sourcePath: "ui/components/kbd-tooltip.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
    { id: "button", title: "Button" },
    { id: "demo", title: "Demo" },
    { id: "group", title: "Group" },
    { id: "input-group", title: "Input Group" },
    { id: "tooltip", title: "Tooltip" },
]

export default function KbdPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Kbd"
        description="Kbd component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the kbd primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add kbd" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the Kbd component."
      >
        <CodeBlock
          code={`import { Kbd } from "@/primitives/kbd"`}
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
