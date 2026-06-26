import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import ButtonAsChild from "@/ui/components/button-aschild"
import ButtonDefault from "@/ui/components/button-default"
import ButtonDemo from "@/ui/components/button-demo"
import ButtonDestructive from "@/ui/components/button-destructive"
import ButtonGhost from "@/ui/components/button-ghost"
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
import ButtonIcon from "@/ui/components/button-icon"
import ButtonLink from "@/ui/components/button-link"
import ButtonOutline from "@/ui/components/button-outline"
import ButtonRounded from "@/ui/components/button-rounded"
import ButtonSecondary from "@/ui/components/button-secondary"
import ButtonSize from "@/ui/components/button-size"
import ButtonSpinner from "@/ui/components/button-spinner"

const examples = [
  {
    id: "aschild",
    title: "Aschild",
    component: ButtonAsChild,
    sourcePath: "ui/components/button-aschild.tsx",
  },
  {
    id: "default",
    title: "Default",
    component: ButtonDefault,
    sourcePath: "ui/components/button-default.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: ButtonDemo,
    sourcePath: "ui/components/button-demo.tsx",
  },
  {
    id: "destructive",
    title: "Destructive",
    component: ButtonDestructive,
    sourcePath: "ui/components/button-destructive.tsx",
  },
  {
    id: "ghost",
    title: "Ghost",
    component: ButtonGhost,
    sourcePath: "ui/components/button-ghost.tsx",
  },
  {
    id: "group-demo",
    title: "Group Demo",
    component: ButtonGroupDemo,
    sourcePath: "ui/components/button-group-demo.tsx",
  },
  {
    id: "group-dropdown",
    title: "Group Dropdown",
    component: ButtonGroupDropdown,
    sourcePath: "ui/components/button-group-dropdown.tsx",
  },
  {
    id: "group-input-group",
    title: "Group Input Group",
    component: ButtonGroupInputGroup,
    sourcePath: "ui/components/button-group-input-group.tsx",
  },
  {
    id: "group-input",
    title: "Group Input",
    component: ButtonGroupInput,
    sourcePath: "ui/components/button-group-input.tsx",
  },
  {
    id: "group-nested",
    title: "Group Nested",
    component: ButtonGroupNested,
    sourcePath: "ui/components/button-group-nested.tsx",
  },
  {
    id: "group-orientation",
    title: "Group Orientation",
    component: ButtonGroupOrientation,
    sourcePath: "ui/components/button-group-orientation.tsx",
  },
  {
    id: "group-popover",
    title: "Group Popover",
    component: ButtonGroupPopover,
    sourcePath: "ui/components/button-group-popover.tsx",
  },
  {
    id: "group-select",
    title: "Group Select",
    component: ButtonGroupSelect,
    sourcePath: "ui/components/button-group-select.tsx",
  },
  {
    id: "group-separator",
    title: "Group Separator",
    component: ButtonGroupSeparatorDemo,
    sourcePath: "ui/components/button-group-separator.tsx",
  },
  {
    id: "group-size",
    title: "Group Size",
    component: ButtonGroupSize,
    sourcePath: "ui/components/button-group-size.tsx",
  },
  {
    id: "icon",
    title: "Icon",
    component: ButtonIcon,
    sourcePath: "ui/components/button-icon.tsx",
  },
  {
    id: "link",
    title: "Link",
    component: ButtonLink,
    sourcePath: "ui/components/button-link.tsx",
  },
  {
    id: "outline",
    title: "Outline",
    component: ButtonOutline,
    sourcePath: "ui/components/button-outline.tsx",
  },
  {
    id: "rounded",
    title: "Rounded",
    component: ButtonRounded,
    sourcePath: "ui/components/button-rounded.tsx",
  },
  {
    id: "secondary",
    title: "Secondary",
    component: ButtonSecondary,
    sourcePath: "ui/components/button-secondary.tsx",
  },
  {
    id: "size",
    title: "Size",
    component: ButtonSize,
    sourcePath: "ui/components/button-size.tsx",
  },
  {
    id: "spinner",
    title: "Spinner",
    component: ButtonSpinner,
    sourcePath: "ui/components/button-spinner.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
    { id: "aschild", title: "Aschild" },
    { id: "default", title: "Default" },
    { id: "demo", title: "Demo" },
    { id: "destructive", title: "Destructive" },
    { id: "ghost", title: "Ghost" },
    { id: "group-demo", title: "Group Demo" },
    { id: "group-dropdown", title: "Group Dropdown" },
    { id: "group-input-group", title: "Group Input Group" },
    { id: "group-input", title: "Group Input" },
    { id: "group-nested", title: "Group Nested" },
    { id: "group-orientation", title: "Group Orientation" },
    { id: "group-popover", title: "Group Popover" },
    { id: "group-select", title: "Group Select" },
    { id: "group-separator", title: "Group Separator" },
    { id: "group-size", title: "Group Size" },
    { id: "icon", title: "Icon" },
    { id: "link", title: "Link" },
    { id: "outline", title: "Outline" },
    { id: "rounded", title: "Rounded" },
    { id: "secondary", title: "Secondary" },
    { id: "size", title: "Size" },
    { id: "spinner", title: "Spinner" },
]

export default function ButtonPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Button"
        description="Button component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the button primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add button" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the Button component."
      >
        <CodeBlock
          code={`import { Button } from "@/primitives/button"`}
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
