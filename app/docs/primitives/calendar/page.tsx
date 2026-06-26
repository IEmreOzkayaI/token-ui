import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import CalendarBasic from "@/ui/components/calendar-basic"
import CalendarCaption from "@/ui/components/calendar-caption"
import CalendarDemo from "@/ui/components/calendar-demo"
import CalendarMultiple from "@/ui/components/calendar-multiple"
import CalendarWithTime from "@/ui/components/calendar-time"
import CalendarWeekNumbers from "@/ui/components/calendar-week-numbers"

const examples = [
  {
    title: "Calendar Basic",
    component: CalendarBasic,
    sourcePath: "ui/components/calendar-basic.tsx",
  },
  {
    title: "Calendar Caption",
    component: CalendarCaption,
    sourcePath: "ui/components/calendar-caption.tsx",
  },
  {
    title: "Calendar Demo",
    component: CalendarDemo,
    sourcePath: "ui/components/calendar-demo.tsx",
  },
  {
    title: "Calendar Multiple",
    component: CalendarMultiple,
    sourcePath: "ui/components/calendar-multiple.tsx",
  },
  {
    title: "Calendar Time",
    component: CalendarWithTime,
    sourcePath: "ui/components/calendar-time.tsx",
  },
  {
    title: "Calendar Week Numbers",
    component: CalendarWeekNumbers,
    sourcePath: "ui/components/calendar-week-numbers.tsx",
  },
] as const

export default function CalendarPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Calendar</h1>
        <p className="text-lg text-muted-foreground">
          Calendar component — {examples.length} examples rendered live with source code
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
