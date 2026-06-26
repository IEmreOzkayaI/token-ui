import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import ContextMenuBasic from "@/ui/components/context-menu/basic"
import ContextMenuCheckboxes from "@/ui/components/context-menu/checkboxes"
import ContextMenuDemo from "@/ui/components/context-menu/demo"
import ContextMenuDestructive from "@/ui/components/context-menu/destructive"
import ContextMenuGroups from "@/ui/components/context-menu/groups"
import ContextMenuIcons from "@/ui/components/context-menu/icons"
import ContextMenuRadio from "@/ui/components/context-menu/radio"
import ContextMenuShortcuts from "@/ui/components/context-menu/shortcuts"
import ContextMenuSides from "@/ui/components/context-menu/sides"
import ContextMenuSubmenu from "@/ui/components/context-menu/submenu"

const examples = [
  {
    id: "basic",
    title: "Basic",
    component: ContextMenuBasic,
    sourcePath: "ui/components/context-menu/basic.tsx",
  },
  {
    id: "checkboxes",
    title: "Checkboxes",
    component: ContextMenuCheckboxes,
    sourcePath: "ui/components/context-menu/checkboxes.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: ContextMenuDemo,
    sourcePath: "ui/components/context-menu/demo.tsx",
  },
  {
    id: "destructive",
    title: "Destructive",
    component: ContextMenuDestructive,
    sourcePath: "ui/components/context-menu/destructive.tsx",
  },
  {
    id: "groups",
    title: "Groups",
    component: ContextMenuGroups,
    sourcePath: "ui/components/context-menu/groups.tsx",
  },
  {
    id: "icons",
    title: "Icons",
    component: ContextMenuIcons,
    sourcePath: "ui/components/context-menu/icons.tsx",
  },
  {
    id: "radio",
    title: "Radio",
    component: ContextMenuRadio,
    sourcePath: "ui/components/context-menu/radio.tsx",
  },
  {
    id: "shortcuts",
    title: "Shortcuts",
    component: ContextMenuShortcuts,
    sourcePath: "ui/components/context-menu/shortcuts.tsx",
  },
  {
    id: "sides",
    title: "Sides",
    component: ContextMenuSides,
    sourcePath: "ui/components/context-menu/sides.tsx",
  },
  {
    id: "submenu",
    title: "Submenu",
    component: ContextMenuSubmenu,
    sourcePath: "ui/components/context-menu/submenu.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "basic", title: "Basic", depth: 3 },
  { id: "checkboxes", title: "Checkboxes", depth: 3 },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "destructive", title: "Destructive", depth: 3 },
  { id: "groups", title: "Groups", depth: 3 },
  { id: "icons", title: "Icons", depth: 3 },
  { id: "radio", title: "Radio", depth: 3 },
  { id: "shortcuts", title: "Shortcuts", depth: 3 },
  { id: "sides", title: "Sides", depth: 3 },
  { id: "submenu", title: "Submenu", depth: 3 },
]

export default function ContextMenuPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="ContextMenu"
        description="Displays a menu triggered by a right-click or long-press action."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add context-menu" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { ContextMenu } from "@/primitives/context-menu"`}
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
