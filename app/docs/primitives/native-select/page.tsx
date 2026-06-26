import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import NativeSelectDemo from "@/ui/components/native-select-demo"
import NativeSelectDisabled from "@/ui/components/native-select-disabled"
import NativeSelectGroups from "@/ui/components/native-select-groups"
import NativeSelectInvalid from "@/ui/components/native-select-invalid"

const examples = [
  {
    id: "demo",
    title: "Demo",
    component: NativeSelectDemo,
    sourcePath: "ui/components/native-select-demo.tsx",
  },
  {
    id: "disabled",
    title: "Disabled",
    component: NativeSelectDisabled,
    sourcePath: "ui/components/native-select-disabled.tsx",
  },
  {
    id: "groups",
    title: "Groups",
    component: NativeSelectGroups,
    sourcePath: "ui/components/native-select-groups.tsx",
  },
  {
    id: "invalid",
    title: "Invalid",
    component: NativeSelectInvalid,
    sourcePath: "ui/components/native-select-invalid.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
    { id: "demo", title: "Demo" },
    { id: "disabled", title: "Disabled" },
    { id: "groups", title: "Groups" },
    { id: "invalid", title: "Invalid" },
]

export default function NativeSelectPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="NativeSelect"
        description="NativeSelect component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the native-select primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add native-select" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the NativeSelect component."
      >
        <CodeBlock
          code={`import { NativeSelect } from "@/primitives/native-select"`}
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
