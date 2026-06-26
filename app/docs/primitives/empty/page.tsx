import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import EmptyAvatarGroup from "@/ui/components/empty-avatar-group"
import EmptyAvatar from "@/ui/components/empty-avatar"
import EmptyInCard from "@/ui/components/empty-card"
import EmptyInputGroup from "@/ui/components/empty-input-group"

const examples = [
  {
    title: "Empty Avatar Group",
    component: EmptyAvatarGroup,
    sourcePath: "ui/components/empty-avatar-group.tsx",
  },
  {
    title: "Empty Avatar",
    component: EmptyAvatar,
    sourcePath: "ui/components/empty-avatar.tsx",
  },
  {
    title: "Empty Card",
    component: EmptyInCard,
    sourcePath: "ui/components/empty-card.tsx",
  },
  {
    title: "Empty Input Group",
    component: EmptyInputGroup,
    sourcePath: "ui/components/empty-input-group.tsx",
  },
] as const

export default function EmptyPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Empty</h1>
        <p className="text-lg text-muted-foreground">
          Empty component — {examples.length} examples rendered live with source code
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
