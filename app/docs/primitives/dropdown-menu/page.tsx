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
    { id: "avatar", title: "Avatar" },
    { id: "basic", title: "Basic" },
    { id: "checkboxes-icons", title: "Checkboxes Icons" },
    { id: "checkboxes", title: "Checkboxes" },
    { id: "complex", title: "Complex" },
    { id: "demo", title: "Demo" },
    { id: "destructive", title: "Destructive" },
    { id: "icons", title: "Icons" },
    { id: "radio-group", title: "Radio Group" },
    { id: "radio-icons", title: "Radio Icons" },
    { id: "shortcuts", title: "Shortcuts" },
    { id: "submenu", title: "Submenu" },
]

export default function DropdownMenuPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="DropdownMenu"
        description="DropdownMenu component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the dropdown-menu primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add dropdown-menu" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the DropdownMenu component."
      >
        <CodeBlock
          code={`import { DropdownMenu } from "@/primitives/dropdown-menu"`}
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
