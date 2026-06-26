import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import { BadgeCustomColors } from "@/ui/components/badge-colors"
import BadgeDemo from "@/ui/components/badge-demo"
import { BadgeWithIconLeft } from "@/ui/components/badge-icon"
import { BadgeAsLink } from "@/ui/components/badge-link"
import { BadgeWithSpinner } from "@/ui/components/badge-spinner"
import { BadgeVariants } from "@/ui/components/badge-variants"

const examples = [
  {
    title: "Badge Colors",
    component: BadgeCustomColors,
    sourcePath: "ui/components/badge-colors.tsx",
  },
  {
    title: "Badge Demo",
    component: BadgeDemo,
    sourcePath: "ui/components/badge-demo.tsx",
  },
  {
    title: "Badge Icon",
    component: BadgeWithIconLeft,
    sourcePath: "ui/components/badge-icon.tsx",
  },
  {
    title: "Badge Link",
    component: BadgeAsLink,
    sourcePath: "ui/components/badge-link.tsx",
  },
  {
    title: "Badge Spinner",
    component: BadgeWithSpinner,
    sourcePath: "ui/components/badge-spinner.tsx",
  },
  {
    title: "Badge Variants",
    component: BadgeVariants,
    sourcePath: "ui/components/badge-variants.tsx",
  },
] as const

export default function BadgePage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Badge</h1>
        <p className="text-lg text-muted-foreground">
          Badge component — {examples.length} examples rendered live with source code
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
