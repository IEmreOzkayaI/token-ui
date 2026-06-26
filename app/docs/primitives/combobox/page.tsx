import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import ComboboxAutoHighlight from "@/ui/components/combobox-auto-highlight"
import ComboboxBasic from "@/ui/components/combobox-basic"
import ComboboxWithClear from "@/ui/components/combobox-clear"
import ComboboxWithCustomItems from "@/ui/components/combobox-custom"
import ComboboxDisabled from "@/ui/components/combobox-disabled"
import ComboboxWithGroupsAndSeparator from "@/ui/components/combobox-groups"
import ComboxboxInputGroup from "@/ui/components/combobox-input-group"
import ComboboxInvalid from "@/ui/components/combobox-invalid"
import ComboboxMultiple from "@/ui/components/combobox-multiple"
import ComboboxPopup from "@/ui/components/combobox-popup"

const examples = [
  {
    id: "auto-highlight",
    title: "Auto Highlight",
    component: ComboboxAutoHighlight,
    sourcePath: "ui/components/combobox-auto-highlight.tsx",
  },
  {
    id: "basic",
    title: "Basic",
    component: ComboboxBasic,
    sourcePath: "ui/components/combobox-basic.tsx",
  },
  {
    id: "clear",
    title: "Clear",
    component: ComboboxWithClear,
    sourcePath: "ui/components/combobox-clear.tsx",
  },
  {
    id: "custom",
    title: "Custom",
    component: ComboboxWithCustomItems,
    sourcePath: "ui/components/combobox-custom.tsx",
  },
  {
    id: "disabled",
    title: "Disabled",
    component: ComboboxDisabled,
    sourcePath: "ui/components/combobox-disabled.tsx",
  },
  {
    id: "groups",
    title: "Groups",
    component: ComboboxWithGroupsAndSeparator,
    sourcePath: "ui/components/combobox-groups.tsx",
  },
  {
    id: "input-group",
    title: "Input Group",
    component: ComboxboxInputGroup,
    sourcePath: "ui/components/combobox-input-group.tsx",
  },
  {
    id: "invalid",
    title: "Invalid",
    component: ComboboxInvalid,
    sourcePath: "ui/components/combobox-invalid.tsx",
  },
  {
    id: "multiple",
    title: "Multiple",
    component: ComboboxMultiple,
    sourcePath: "ui/components/combobox-multiple.tsx",
  },
  {
    id: "popup",
    title: "Popup",
    component: ComboboxPopup,
    sourcePath: "ui/components/combobox-popup.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "auto-highlight", title: "Auto Highlight", depth: 3 },
  { id: "basic", title: "Basic", depth: 3 },
  { id: "clear", title: "Clear", depth: 3 },
  { id: "custom", title: "Custom", depth: 3 },
  { id: "disabled", title: "Disabled", depth: 3 },
  { id: "groups", title: "Groups", depth: 3 },
  { id: "input-group", title: "Input Group", depth: 3 },
  { id: "invalid", title: "Invalid", depth: 3 },
  { id: "multiple", title: "Multiple", depth: 3 },
  { id: "popup", title: "Popup", depth: 3 },
]

export default function ComboboxPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Combobox"
        description="Autocomplete input with a filterable dropdown list of options."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add combobox" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { Combobox } from "@/primitives/combobox"`}
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
