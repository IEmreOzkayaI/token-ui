import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import SkeletonAvatar from "@/ui/components/skeleton-avatar"
import SkeletonCard from "@/ui/components/skeleton-card"
import SkeletonDemo from "@/ui/components/skeleton-demo"
import SkeletonForm from "@/ui/components/skeleton-form"
import SkeletonTable from "@/ui/components/skeleton-table"
import SkeletonText from "@/ui/components/skeleton-text"

const examples = [
  {
    title: "Skeleton Avatar",
    component: SkeletonAvatar,
    sourcePath: "ui/components/skeleton-avatar.tsx",
  },
  {
    title: "Skeleton Card",
    component: SkeletonCard,
    sourcePath: "ui/components/skeleton-card.tsx",
  },
  {
    title: "Skeleton Demo",
    component: SkeletonDemo,
    sourcePath: "ui/components/skeleton-demo.tsx",
  },
  {
    title: "Skeleton Form",
    component: SkeletonForm,
    sourcePath: "ui/components/skeleton-form.tsx",
  },
  {
    title: "Skeleton Table",
    component: SkeletonTable,
    sourcePath: "ui/components/skeleton-table.tsx",
  },
  {
    title: "Skeleton Text",
    component: SkeletonText,
    sourcePath: "ui/components/skeleton-text.tsx",
  },
] as const

export default function SkeletonPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Skeleton</h1>
        <p className="text-lg text-muted-foreground">
          Skeleton component — {examples.length} examples rendered live with source code
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
