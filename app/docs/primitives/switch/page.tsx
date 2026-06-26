import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import SwitchChoiceCard from "@/ui/components/switch-choice-card"
import SwitchDemo from "@/ui/components/switch-demo"
import SwitchDescription from "@/ui/components/switch-description"
import SwitchDisabled from "@/ui/components/switch-disabled"
import SwitchInvalid from "@/ui/components/switch-invalid"
import SwitchSizes from "@/ui/components/switch-sizes"

const examples = [
  {
    id: "choice-card",
    title: "Choice Card",
    component: SwitchChoiceCard,
    sourcePath: "ui/components/switch-choice-card.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: SwitchDemo,
    sourcePath: "ui/components/switch-demo.tsx",
  },
  {
    id: "description",
    title: "Description",
    component: SwitchDescription,
    sourcePath: "ui/components/switch-description.tsx",
  },
  {
    id: "disabled",
    title: "Disabled",
    component: SwitchDisabled,
    sourcePath: "ui/components/switch-disabled.tsx",
  },
  {
    id: "invalid",
    title: "Invalid",
    component: SwitchInvalid,
    sourcePath: "ui/components/switch-invalid.tsx",
  },
  {
    id: "sizes",
    title: "Sizes",
    component: SwitchSizes,
    sourcePath: "ui/components/switch-sizes.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "choice-card", title: "Choice Card", depth: 3 },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "description", title: "Description", depth: 3 },
  { id: "disabled", title: "Disabled", depth: 3 },
  { id: "invalid", title: "Invalid", depth: 3 },
  { id: "sizes", title: "Sizes", depth: 3 },
]

export default function SwitchPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Switch"
        description="A control that allows the user to toggle between two states."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add switch" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { Switch } from "@/primitives/switch"`}
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
