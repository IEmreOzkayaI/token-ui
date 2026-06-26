import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import { ContextMenuBasic } from "@/ui/components/context-menu-basic"
import { ContextMenuCheckboxes } from "@/ui/components/context-menu-checkboxes"
import { ContextMenuDemo } from "@/ui/components/context-menu-demo"
import { ContextMenuDestructive } from "@/ui/components/context-menu-destructive"
import { ContextMenuGroups } from "@/ui/components/context-menu-groups"
import { ContextMenuIcons } from "@/ui/components/context-menu-icons"
import { ContextMenuRadio } from "@/ui/components/context-menu-radio"
import { ContextMenuShortcuts } from "@/ui/components/context-menu-shortcuts"
import { ContextMenuSides } from "@/ui/components/context-menu-sides"
import { ContextMenuSubmenu } from "@/ui/components/context-menu-submenu"

const examples = [
  {
    title: "ContextMenu Basic",
    component: ContextMenuBasic,
    sourcePath: "ui/components/context-menu-basic.tsx",
  },
  {
    title: "ContextMenu Checkboxes",
    component: ContextMenuCheckboxes,
    sourcePath: "ui/components/context-menu-checkboxes.tsx",
  },
  {
    title: "ContextMenu Demo",
    component: ContextMenuDemo,
    sourcePath: "ui/components/context-menu-demo.tsx",
  },
  {
    title: "ContextMenu Destructive",
    component: ContextMenuDestructive,
    sourcePath: "ui/components/context-menu-destructive.tsx",
  },
  {
    title: "ContextMenu Groups",
    component: ContextMenuGroups,
    sourcePath: "ui/components/context-menu-groups.tsx",
  },
  {
    title: "ContextMenu Icons",
    component: ContextMenuIcons,
    sourcePath: "ui/components/context-menu-icons.tsx",
  },
  {
    title: "ContextMenu Radio",
    component: ContextMenuRadio,
    sourcePath: "ui/components/context-menu-radio.tsx",
  },
  {
    title: "ContextMenu Shortcuts",
    component: ContextMenuShortcuts,
    sourcePath: "ui/components/context-menu-shortcuts.tsx",
  },
  {
    title: "ContextMenu Sides",
    component: ContextMenuSides,
    sourcePath: "ui/components/context-menu-sides.tsx",
  },
  {
    title: "ContextMenu Submenu",
    component: ContextMenuSubmenu,
    sourcePath: "ui/components/context-menu-submenu.tsx",
  },
] as const

export default function ContextMenuPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">ContextMenu</h1>
        <p className="text-lg text-muted-foreground">
          ContextMenu component — {examples.length} examples rendered live with source code
        </p>

        <div className="flex flex-col gap-10">
          {examples.map((example) => {
            const Component = example.component

            return (
              <ComponentExample
                key={example.sourcePath}
                title={example.title}
                source={readSource(example.sourcePath)}
              >
                <Component />
              </ComponentExample>
            )
          })}
        </div>
      </div>
    </div>
  )
}
