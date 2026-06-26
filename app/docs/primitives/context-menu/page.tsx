import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import ContextMenuBasic from "@/ui/components/context-menu-basic"
import ContextMenuCheckboxes from "@/ui/components/context-menu-checkboxes"
import ContextMenuDemo from "@/ui/components/context-menu-demo"
import ContextMenuDestructive from "@/ui/components/context-menu-destructive"
import ContextMenuGroups from "@/ui/components/context-menu-groups"
import ContextMenuIcons from "@/ui/components/context-menu-icons"
import ContextMenuRadio from "@/ui/components/context-menu-radio"
import ContextMenuShortcuts from "@/ui/components/context-menu-shortcuts"
import ContextMenuSides from "@/ui/components/context-menu-sides"
import ContextMenuSubmenu from "@/ui/components/context-menu-submenu"

const examples = [
  {
    id: "basic",
    title: "Basic",
    component: ContextMenuBasic,
    sourcePath: "ui/components/context-menu-basic.tsx",
  },
  {
    id: "checkboxes",
    title: "Checkboxes",
    component: ContextMenuCheckboxes,
    sourcePath: "ui/components/context-menu-checkboxes.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: ContextMenuDemo,
    sourcePath: "ui/components/context-menu-demo.tsx",
  },
  {
    id: "destructive",
    title: "Destructive",
    component: ContextMenuDestructive,
    sourcePath: "ui/components/context-menu-destructive.tsx",
  },
  {
    id: "groups",
    title: "Groups",
    component: ContextMenuGroups,
    sourcePath: "ui/components/context-menu-groups.tsx",
  },
  {
    id: "icons",
    title: "Icons",
    component: ContextMenuIcons,
    sourcePath: "ui/components/context-menu-icons.tsx",
  },
  {
    id: "radio",
    title: "Radio",
    component: ContextMenuRadio,
    sourcePath: "ui/components/context-menu-radio.tsx",
  },
  {
    id: "shortcuts",
    title: "Shortcuts",
    component: ContextMenuShortcuts,
    sourcePath: "ui/components/context-menu-shortcuts.tsx",
  },
  {
    id: "sides",
    title: "Sides",
    component: ContextMenuSides,
    sourcePath: "ui/components/context-menu-sides.tsx",
  },
  {
    id: "submenu",
    title: "Submenu",
    component: ContextMenuSubmenu,
    sourcePath: "ui/components/context-menu-submenu.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
    { id: "basic", title: "Basic" },
    { id: "checkboxes", title: "Checkboxes" },
    { id: "demo", title: "Demo" },
    { id: "destructive", title: "Destructive" },
    { id: "groups", title: "Groups" },
    { id: "icons", title: "Icons" },
    { id: "radio", title: "Radio" },
    { id: "shortcuts", title: "Shortcuts" },
    { id: "sides", title: "Sides" },
    { id: "submenu", title: "Submenu" },
]

export default function ContextMenuPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="ContextMenu"
        description="ContextMenu component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the context-menu primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add context-menu" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the ContextMenu component."
      >
        <CodeBlock
          code={`import { ContextMenu } from "@/primitives/context-menu"`}
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
