import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import DropdownMenuAvatar from "@/ui/components/dropdown-menu-avatar"
import DropdownMenuBasic from "@/ui/components/dropdown-menu-basic"
import DropdownMenuCheckboxesIcons from "@/ui/components/dropdown-menu-checkboxes-icons"
import DropdownMenuCheckboxes from "@/ui/components/dropdown-menu-checkboxes"
import DropdownMenuComplex from "@/ui/components/dropdown-menu-complex"
import DropdownMenuDemo from "@/ui/components/dropdown-menu-demo"
import DropdownMenuDestructive from "@/ui/components/dropdown-menu-destructive"
import DropdownMenuIcons from "@/ui/components/dropdown-menu-icons"
import DropdownMenuRadioGroupDemo from "@/ui/components/dropdown-menu-radio-group"
import DropdownMenuRadioIcons from "@/ui/components/dropdown-menu-radio-icons"
import DropdownMenuShortcuts from "@/ui/components/dropdown-menu-shortcuts"
import DropdownMenuSubmenu from "@/ui/components/dropdown-menu-submenu"

const examples = [
  {
    id: "avatar",
    title: "Avatar",
    component: DropdownMenuAvatar,
    sourcePath: "ui/components/dropdown-menu-avatar.tsx",
  },
  {
    id: "basic",
    title: "Basic",
    component: DropdownMenuBasic,
    sourcePath: "ui/components/dropdown-menu-basic.tsx",
  },
  {
    id: "checkboxes-icons",
    title: "Checkboxes Icons",
    component: DropdownMenuCheckboxesIcons,
    sourcePath: "ui/components/dropdown-menu-checkboxes-icons.tsx",
  },
  {
    id: "checkboxes",
    title: "Checkboxes",
    component: DropdownMenuCheckboxes,
    sourcePath: "ui/components/dropdown-menu-checkboxes.tsx",
  },
  {
    id: "complex",
    title: "Complex",
    component: DropdownMenuComplex,
    sourcePath: "ui/components/dropdown-menu-complex.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: DropdownMenuDemo,
    sourcePath: "ui/components/dropdown-menu-demo.tsx",
  },
  {
    id: "destructive",
    title: "Destructive",
    component: DropdownMenuDestructive,
    sourcePath: "ui/components/dropdown-menu-destructive.tsx",
  },
  {
    id: "icons",
    title: "Icons",
    component: DropdownMenuIcons,
    sourcePath: "ui/components/dropdown-menu-icons.tsx",
  },
  {
    id: "radio-group",
    title: "Radio Group",
    component: DropdownMenuRadioGroupDemo,
    sourcePath: "ui/components/dropdown-menu-radio-group.tsx",
  },
  {
    id: "radio-icons",
    title: "Radio Icons",
    component: DropdownMenuRadioIcons,
    sourcePath: "ui/components/dropdown-menu-radio-icons.tsx",
  },
  {
    id: "shortcuts",
    title: "Shortcuts",
    component: DropdownMenuShortcuts,
    sourcePath: "ui/components/dropdown-menu-shortcuts.tsx",
  },
  {
    id: "submenu",
    title: "Submenu",
    component: DropdownMenuSubmenu,
    sourcePath: "ui/components/dropdown-menu-submenu.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "avatar", title: "Avatar", depth: 3 },
  { id: "basic", title: "Basic", depth: 3 },
  { id: "checkboxes-icons", title: "Checkboxes Icons", depth: 3 },
  { id: "checkboxes", title: "Checkboxes", depth: 3 },
  { id: "complex", title: "Complex", depth: 3 },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "destructive", title: "Destructive", depth: 3 },
  { id: "icons", title: "Icons", depth: 3 },
  { id: "radio-group", title: "Radio Group", depth: 3 },
  { id: "radio-icons", title: "Radio Icons", depth: 3 },
  { id: "shortcuts", title: "Shortcuts", depth: 3 },
  { id: "submenu", title: "Submenu", depth: 3 },
]

export default function DropdownMenuPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="DropdownMenu"
        description="Displays a menu to the user triggered by a button — typically a list of actions."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add dropdown-menu" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { DropdownMenu } from "@/primitives/dropdown-menu"`}
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
