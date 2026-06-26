import { ComponentExample } from "@/app/docs/_components/component-example"
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
    title: "DropdownMenu Avatar",
    component: DropdownMenuAvatar,
    sourcePath: "ui/components/dropdown-menu-avatar.tsx",
  },
  {
    title: "DropdownMenu Basic",
    component: DropdownMenuBasic,
    sourcePath: "ui/components/dropdown-menu-basic.tsx",
  },
  {
    title: "DropdownMenu Checkboxes Icons",
    component: DropdownMenuCheckboxesIcons,
    sourcePath: "ui/components/dropdown-menu-checkboxes-icons.tsx",
  },
  {
    title: "DropdownMenu Checkboxes",
    component: DropdownMenuCheckboxes,
    sourcePath: "ui/components/dropdown-menu-checkboxes.tsx",
  },
  {
    title: "DropdownMenu Complex",
    component: DropdownMenuComplex,
    sourcePath: "ui/components/dropdown-menu-complex.tsx",
  },
  {
    title: "DropdownMenu Demo",
    component: DropdownMenuDemo,
    sourcePath: "ui/components/dropdown-menu-demo.tsx",
  },
  {
    title: "DropdownMenu Destructive",
    component: DropdownMenuDestructive,
    sourcePath: "ui/components/dropdown-menu-destructive.tsx",
  },
  {
    title: "DropdownMenu Icons",
    component: DropdownMenuIcons,
    sourcePath: "ui/components/dropdown-menu-icons.tsx",
  },
  {
    title: "DropdownMenu Radio Group",
    component: DropdownMenuRadioGroupDemo,
    sourcePath: "ui/components/dropdown-menu-radio-group.tsx",
  },
  {
    title: "DropdownMenu Radio Icons",
    component: DropdownMenuRadioIcons,
    sourcePath: "ui/components/dropdown-menu-radio-icons.tsx",
  },
  {
    title: "DropdownMenu Shortcuts",
    component: DropdownMenuShortcuts,
    sourcePath: "ui/components/dropdown-menu-shortcuts.tsx",
  },
  {
    title: "DropdownMenu Submenu",
    component: DropdownMenuSubmenu,
    sourcePath: "ui/components/dropdown-menu-submenu.tsx",
  },
] as const

export default function DropdownMenuPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">DropdownMenu</h1>
        <p className="text-lg text-muted-foreground">
          DropdownMenu component — {examples.length} examples rendered live with source code
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
