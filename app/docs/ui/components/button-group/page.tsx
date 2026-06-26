import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import ButtonGroupDemo from "@/ui/components/button-group-demo"
import ButtonGroupDropdown from "@/ui/components/button-group-dropdown"
import ButtonGroupInputGroup from "@/ui/components/button-group-input-group"
import ButtonGroupInput from "@/ui/components/button-group-input"
import ButtonGroupNested from "@/ui/components/button-group-nested"
import ButtonGroupOrientation from "@/ui/components/button-group-orientation"
import ButtonGroupPopover from "@/ui/components/button-group-popover"
import ButtonGroupSelect from "@/ui/components/button-group-select"
import ButtonGroupSeparatorDemo from "@/ui/components/button-group-separator"
import ButtonGroupSize from "@/ui/components/button-group-size"

const examples = [
  {
    id: "demo",
    title: "Demo",
    component: ButtonGroupDemo,
    sourcePath: "ui/components/button-group-demo.tsx",
  },
  {
    id: "dropdown",
    title: "Dropdown",
    component: ButtonGroupDropdown,
    sourcePath: "ui/components/button-group-dropdown.tsx",
  },
  {
    id: "input-group",
    title: "Input Group",
    component: ButtonGroupInputGroup,
    sourcePath: "ui/components/button-group-input-group.tsx",
  },
  {
    id: "input",
    title: "Input",
    component: ButtonGroupInput,
    sourcePath: "ui/components/button-group-input.tsx",
  },
  {
    id: "nested",
    title: "Nested",
    component: ButtonGroupNested,
    sourcePath: "ui/components/button-group-nested.tsx",
  },
  {
    id: "orientation",
    title: "Orientation",
    component: ButtonGroupOrientation,
    sourcePath: "ui/components/button-group-orientation.tsx",
  },
  {
    id: "popover",
    title: "Popover",
    component: ButtonGroupPopover,
    sourcePath: "ui/components/button-group-popover.tsx",
  },
  {
    id: "select",
    title: "Select",
    component: ButtonGroupSelect,
    sourcePath: "ui/components/button-group-select.tsx",
  },
  {
    id: "separator",
    title: "Separator",
    component: ButtonGroupSeparatorDemo,
    sourcePath: "ui/components/button-group-separator.tsx",
  },
  {
    id: "size",
    title: "Size",
    component: ButtonGroupSize,
    sourcePath: "ui/components/button-group-size.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "dropdown", title: "Dropdown", depth: 3 },
  { id: "input-group", title: "Input Group", depth: 3 },
  { id: "input", title: "Input", depth: 3 },
  { id: "nested", title: "Nested", depth: 3 },
  { id: "orientation", title: "Orientation", depth: 3 },
  { id: "popover", title: "Popover", depth: 3 },
  { id: "select", title: "Select", depth: 3 },
  { id: "separator", title: "Separator", depth: 3 },
  { id: "size", title: "Size", depth: 3 },
]

export default function ButtonGroupPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="ButtonGroup"
        description="Groups related buttons together with consistent spacing and optional separators."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add button-group" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { ButtonGroup } from "@/primitives/button-group"`}
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
