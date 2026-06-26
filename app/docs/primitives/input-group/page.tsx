import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import InputGroupBasic from "@/ui/components/input-group-basic"
import InputGroupBlockEnd from "@/ui/components/input-group-block-end"
import InputGroupBlockStart from "@/ui/components/input-group-block-start"
import InputGroupButtonGroup from "@/ui/components/input-group-button-group"
import InputGroupDemo from "@/ui/components/input-group-demo"
import InputGroupDropdown from "@/ui/components/input-group-dropdown"
import InputGroupInCard from "@/ui/components/input-group-in-card"
import InputGroupInlineEnd from "@/ui/components/input-group-inline-end"
import InputGroupInlineStart from "@/ui/components/input-group-inline-start"
import InputGroupKbd from "@/ui/components/input-group-kbd"
import InputGroupLabel from "@/ui/components/input-group-label"
import InputGroupSpinner from "@/ui/components/input-group-spinner"
import InputGroupTextExample from "@/ui/components/input-group-text"
import InputGroupTextareaExamples from "@/ui/components/input-group-textarea-examples"
import InputGroupTooltip from "@/ui/components/input-group-tooltip"
import InputGroupWithAddons from "@/ui/components/input-group-with-addons"
import InputGroupWithButtons from "@/ui/components/input-group-with-buttons"
import InputGroupWithKbd from "@/ui/components/input-group-with-kbd"
import InputGroupWithTooltip from "@/ui/components/input-group-with-tooltip"

const examples = [
  {
    id: "basic",
    title: "Basic",
    component: InputGroupBasic,
    sourcePath: "ui/components/input-group-basic.tsx",
  },
  {
    id: "block-end",
    title: "Block End",
    component: InputGroupBlockEnd,
    sourcePath: "ui/components/input-group-block-end.tsx",
  },
  {
    id: "block-start",
    title: "Block Start",
    component: InputGroupBlockStart,
    sourcePath: "ui/components/input-group-block-start.tsx",
  },
  {
    id: "button-group",
    title: "Button Group",
    component: InputGroupButtonGroup,
    sourcePath: "ui/components/input-group-button-group.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: InputGroupDemo,
    sourcePath: "ui/components/input-group-demo.tsx",
  },
  {
    id: "dropdown",
    title: "Dropdown",
    component: InputGroupDropdown,
    sourcePath: "ui/components/input-group-dropdown.tsx",
  },
  {
    id: "in-card",
    title: "In Card",
    component: InputGroupInCard,
    sourcePath: "ui/components/input-group-in-card.tsx",
  },
  {
    id: "inline-end",
    title: "Inline End",
    component: InputGroupInlineEnd,
    sourcePath: "ui/components/input-group-inline-end.tsx",
  },
  {
    id: "inline-start",
    title: "Inline Start",
    component: InputGroupInlineStart,
    sourcePath: "ui/components/input-group-inline-start.tsx",
  },
  {
    id: "kbd",
    title: "Kbd",
    component: InputGroupKbd,
    sourcePath: "ui/components/input-group-kbd.tsx",
  },
  {
    id: "label",
    title: "Label",
    component: InputGroupLabel,
    sourcePath: "ui/components/input-group-label.tsx",
  },
  {
    id: "spinner",
    title: "Spinner",
    component: InputGroupSpinner,
    sourcePath: "ui/components/input-group-spinner.tsx",
  },
  {
    id: "text",
    title: "Text",
    component: InputGroupTextExample,
    sourcePath: "ui/components/input-group-text.tsx",
  },
  {
    id: "textarea-examples",
    title: "Textarea Examples",
    component: InputGroupTextareaExamples,
    sourcePath: "ui/components/input-group-textarea-examples.tsx",
  },
  {
    id: "tooltip",
    title: "Tooltip",
    component: InputGroupTooltip,
    sourcePath: "ui/components/input-group-tooltip.tsx",
  },
  {
    id: "with-addons",
    title: "With Addons",
    component: InputGroupWithAddons,
    sourcePath: "ui/components/input-group-with-addons.tsx",
  },
  {
    id: "with-buttons",
    title: "With Buttons",
    component: InputGroupWithButtons,
    sourcePath: "ui/components/input-group-with-buttons.tsx",
  },
  {
    id: "with-kbd",
    title: "With Kbd",
    component: InputGroupWithKbd,
    sourcePath: "ui/components/input-group-with-kbd.tsx",
  },
  {
    id: "with-tooltip",
    title: "With Tooltip",
    component: InputGroupWithTooltip,
    sourcePath: "ui/components/input-group-with-tooltip.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
    { id: "basic", title: "Basic" },
    { id: "block-end", title: "Block End" },
    { id: "block-start", title: "Block Start" },
    { id: "button-group", title: "Button Group" },
    { id: "demo", title: "Demo" },
    { id: "dropdown", title: "Dropdown" },
    { id: "in-card", title: "In Card" },
    { id: "inline-end", title: "Inline End" },
    { id: "inline-start", title: "Inline Start" },
    { id: "kbd", title: "Kbd" },
    { id: "label", title: "Label" },
    { id: "spinner", title: "Spinner" },
    { id: "text", title: "Text" },
    { id: "textarea-examples", title: "Textarea Examples" },
    { id: "tooltip", title: "Tooltip" },
    { id: "with-addons", title: "With Addons" },
    { id: "with-buttons", title: "With Buttons" },
    { id: "with-kbd", title: "With Kbd" },
    { id: "with-tooltip", title: "With Tooltip" },
]

export default function InputGroupPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="InputGroup"
        description="InputGroup component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the input-group primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add input-group" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the InputGroup component."
      >
        <CodeBlock
          code={`import { InputGroup } from "@/primitives/input-group"`}
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
