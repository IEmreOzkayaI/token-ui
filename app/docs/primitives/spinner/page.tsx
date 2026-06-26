import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import SpinnerBadge from "@/ui/components/spinner-badge"
import SpinnerButton from "@/ui/components/spinner-button"
import SpinnerCustom from "@/ui/components/spinner-custom"
import SpinnerDemo from "@/ui/components/spinner-demo"
import SpinnerEmpty from "@/ui/components/spinner-empty"
import SpinnerInputGroup from "@/ui/components/spinner-input-group"
import SpinnerSize from "@/ui/components/spinner-size"

const examples = [
  {
    id: "badge",
    title: "Badge",
    component: SpinnerBadge,
    sourcePath: "ui/components/spinner-badge.tsx",
  },
  {
    id: "button",
    title: "Button",
    component: SpinnerButton,
    sourcePath: "ui/components/spinner-button.tsx",
  },
  {
    id: "custom",
    title: "Custom",
    component: SpinnerCustom,
    sourcePath: "ui/components/spinner-custom.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: SpinnerDemo,
    sourcePath: "ui/components/spinner-demo.tsx",
  },
  {
    id: "empty",
    title: "Empty",
    component: SpinnerEmpty,
    sourcePath: "ui/components/spinner-empty.tsx",
  },
  {
    id: "input-group",
    title: "Input Group",
    component: SpinnerInputGroup,
    sourcePath: "ui/components/spinner-input-group.tsx",
  },
  {
    id: "size",
    title: "Size",
    component: SpinnerSize,
    sourcePath: "ui/components/spinner-size.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "badge", title: "Badge", depth: 3 },
  { id: "button", title: "Button", depth: 3 },
  { id: "custom", title: "Custom", depth: 3 },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "empty", title: "Empty", depth: 3 },
  { id: "input-group", title: "Input Group", depth: 3 },
  { id: "size", title: "Size", depth: 3 },
]

export default function SpinnerPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Spinner"
        description="Animated loading indicator to show pending state."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add spinner" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { Spinner } from "@/primitives/spinner"`}
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
