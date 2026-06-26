import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import CommandBasic from "@/ui/components/command/basic"
import CommandDemo from "@/ui/components/command/demo"
import CommandDialogDemo from "@/ui/components/command/dialog"
import CommandWithGroups from "@/ui/components/command/groups"
import CommandManyItems from "@/ui/components/command/scrollable"
import CommandWithShortcuts from "@/ui/components/command/shortcuts"

const examples = [
  {
    id: "basic",
    title: "Basic",
    component: CommandBasic,
    sourcePath: "ui/components/command/basic.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: CommandDemo,
    sourcePath: "ui/components/command/demo.tsx",
  },
  {
    id: "dialog",
    title: "Dialog",
    component: CommandDialogDemo,
    sourcePath: "ui/components/command/dialog.tsx",
  },
  {
    id: "groups",
    title: "Groups",
    component: CommandWithGroups,
    sourcePath: "ui/components/command/groups.tsx",
  },
  {
    id: "scrollable",
    title: "Scrollable",
    component: CommandManyItems,
    sourcePath: "ui/components/command/scrollable.tsx",
  },
  {
    id: "shortcuts",
    title: "Shortcuts",
    component: CommandWithShortcuts,
    sourcePath: "ui/components/command/shortcuts.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "basic", title: "Basic", depth: 3 },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "dialog", title: "Dialog", depth: 3 },
  { id: "groups", title: "Groups", depth: 3 },
  { id: "scrollable", title: "Scrollable", depth: 3 },
  { id: "shortcuts", title: "Shortcuts", depth: 3 },
]

export default function CommandPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Command"
        description="Fast, composable command menu for searching and executing actions."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add command" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { Command } from "@/primitives/command"`}
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
