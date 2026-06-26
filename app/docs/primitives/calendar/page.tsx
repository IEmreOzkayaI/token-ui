import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import CalendarBasic from "@/ui/components/calendar-basic"
import CalendarCaption from "@/ui/components/calendar-caption"
import CalendarDemo from "@/ui/components/calendar-demo"
import CalendarMultiple from "@/ui/components/calendar-multiple"
import CalendarWithTime from "@/ui/components/calendar-time"
import CalendarWeekNumbers from "@/ui/components/calendar-week-numbers"

const examples = [
  {
    id: "basic",
    title: "Basic",
    component: CalendarBasic,
    sourcePath: "ui/components/calendar-basic.tsx",
  },
  {
    id: "caption",
    title: "Caption",
    component: CalendarCaption,
    sourcePath: "ui/components/calendar-caption.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: CalendarDemo,
    sourcePath: "ui/components/calendar-demo.tsx",
  },
  {
    id: "multiple",
    title: "Multiple",
    component: CalendarMultiple,
    sourcePath: "ui/components/calendar-multiple.tsx",
  },
  {
    id: "time",
    title: "Time",
    component: CalendarWithTime,
    sourcePath: "ui/components/calendar-time.tsx",
  },
  {
    id: "week-numbers",
    title: "Week Numbers",
    component: CalendarWeekNumbers,
    sourcePath: "ui/components/calendar-week-numbers.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
    { id: "basic", title: "Basic" },
    { id: "caption", title: "Caption" },
    { id: "demo", title: "Demo" },
    { id: "multiple", title: "Multiple" },
    { id: "time", title: "Time" },
    { id: "week-numbers", title: "Week Numbers" },
]

export default function CalendarPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Calendar"
        description="Calendar component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the calendar primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add calendar" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the Calendar component."
      >
        <CodeBlock
          code={`import { Calendar } from "@/primitives/calendar"`}
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
