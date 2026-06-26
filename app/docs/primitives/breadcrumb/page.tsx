import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import { BreadcrumbBasic } from "@/ui/components/breadcrumb-basic"
import { BreadcrumbDemo } from "@/ui/components/breadcrumb-demo"
import { BreadcrumbDropdown } from "@/ui/components/breadcrumb-dropdown"
import { BreadcrumbEllipsisDemo } from "@/ui/components/breadcrumb-ellipsis"
import { BreadcrumbLinkDemo } from "@/ui/components/breadcrumb-link"
import { BreadcrumbSeparatorDemo } from "@/ui/components/breadcrumb-separator"

const examples = [
  {
    title: "Breadcrumb Basic",
    component: BreadcrumbBasic,
    sourcePath: "ui/components/breadcrumb-basic.tsx",
  },
  {
    title: "Breadcrumb Demo",
    component: BreadcrumbDemo,
    sourcePath: "ui/components/breadcrumb-demo.tsx",
  },
  {
    title: "Breadcrumb Dropdown",
    component: BreadcrumbDropdown,
    sourcePath: "ui/components/breadcrumb-dropdown.tsx",
  },
  {
    title: "Breadcrumb Ellipsis",
    component: BreadcrumbEllipsisDemo,
    sourcePath: "ui/components/breadcrumb-ellipsis.tsx",
  },
  {
    title: "Breadcrumb Link",
    component: BreadcrumbLinkDemo,
    sourcePath: "ui/components/breadcrumb-link.tsx",
  },
  {
    title: "Breadcrumb Separator",
    component: BreadcrumbSeparatorDemo,
    sourcePath: "ui/components/breadcrumb-separator.tsx",
  },
] as const

export default function BreadcrumbPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Breadcrumb</h1>
        <p className="text-lg text-muted-foreground">
          Breadcrumb component — {examples.length} examples rendered live with source code
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
