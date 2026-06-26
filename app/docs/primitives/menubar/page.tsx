import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import MenubarCheckbox from "@/ui/components/menubar-checkbox"
import MenubarDemo from "@/ui/components/menubar-demo"
import MenubarIcons from "@/ui/components/menubar-icons"
import MenubarRadio from "@/ui/components/menubar-radio"
import MenubarSubmenu from "@/ui/components/menubar-submenu"

const examples = [
  {
    title: "Menubar Checkbox",
    component: MenubarCheckbox,
    sourcePath: "ui/components/menubar-checkbox.tsx",
  },
  {
    title: "Menubar Demo",
    component: MenubarDemo,
    sourcePath: "ui/components/menubar-demo.tsx",
  },
  {
    title: "Menubar Icons",
    component: MenubarIcons,
    sourcePath: "ui/components/menubar-icons.tsx",
  },
  {
    title: "Menubar Radio",
    component: MenubarRadio,
    sourcePath: "ui/components/menubar-radio.tsx",
  },
  {
    title: "Menubar Submenu",
    component: MenubarSubmenu,
    sourcePath: "ui/components/menubar-submenu.tsx",
  },
] as const

export default function MenubarPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Menubar</h1>
        <p className="text-lg text-muted-foreground">
          Menubar component — {examples.length} examples rendered live with source code
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
