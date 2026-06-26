import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import InputBadge from "@/ui/components/input/badge"
import InputBasic from "@/ui/components/input/basic"
import InputButtonGroup from "@/ui/components/input/button-group"
import InputDemo from "@/ui/components/input/demo"
import InputDisabled from "@/ui/components/input/disabled"
import InputField from "@/ui/components/input/field"
import InputFieldgroup from "@/ui/components/input/fieldgroup"
import InputFile from "@/ui/components/input/file"
import InputForm from "@/ui/components/input/form"
import InputGrid from "@/ui/components/input/grid"
import InputInline from "@/ui/components/input/inline"
import InputInputGroup from "@/ui/components/input/input-group"
import InputInvalid from "@/ui/components/input/invalid"
import InputRequired from "@/ui/components/input/required"

const examples = [
  {
    id: "badge",
    title: "Badge",
    component: InputBadge,
    sourcePath: "ui/components/input/badge.tsx",
  },
  {
    id: "basic",
    title: "Basic",
    component: InputBasic,
    sourcePath: "ui/components/input/basic.tsx",
  },
  {
    id: "button-group",
    title: "Button Group",
    component: InputButtonGroup,
    sourcePath: "ui/components/input/button-group.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: InputDemo,
    sourcePath: "ui/components/input/demo.tsx",
  },
  {
    id: "disabled",
    title: "Disabled",
    component: InputDisabled,
    sourcePath: "ui/components/input/disabled.tsx",
  },
  {
    id: "field",
    title: "Field",
    component: InputField,
    sourcePath: "ui/components/input/field.tsx",
  },
  {
    id: "fieldgroup",
    title: "Fieldgroup",
    component: InputFieldgroup,
    sourcePath: "ui/components/input/fieldgroup.tsx",
  },
  {
    id: "file",
    title: "File",
    component: InputFile,
    sourcePath: "ui/components/input/file.tsx",
  },
  {
    id: "form",
    title: "Form",
    component: InputForm,
    sourcePath: "ui/components/input/form.tsx",
  },
  {
    id: "grid",
    title: "Grid",
    component: InputGrid,
    sourcePath: "ui/components/input/grid.tsx",
  },
  {
    id: "inline",
    title: "Inline",
    component: InputInline,
    sourcePath: "ui/components/input/inline.tsx",
  },
  {
    id: "input-group",
    title: "Input Group",
    component: InputInputGroup,
    sourcePath: "ui/components/input/input-group.tsx",
  },
  {
    id: "invalid",
    title: "Invalid",
    component: InputInvalid,
    sourcePath: "ui/components/input/invalid.tsx",
  },
  {
    id: "required",
    title: "Required",
    component: InputRequired,
    sourcePath: "ui/components/input/required.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "badge", title: "Badge", depth: 3 },
  { id: "basic", title: "Basic", depth: 3 },
  { id: "button-group", title: "Button Group", depth: 3 },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "disabled", title: "Disabled", depth: 3 },
  { id: "field", title: "Field", depth: 3 },
  { id: "fieldgroup", title: "Fieldgroup", depth: 3 },
  { id: "file", title: "File", depth: 3 },
  { id: "form", title: "Form", depth: 3 },
  { id: "grid", title: "Grid", depth: 3 },
  { id: "inline", title: "Inline", depth: 3 },
  { id: "input-group", title: "Input Group", depth: 3 },
  { id: "invalid", title: "Invalid", depth: 3 },
  { id: "required", title: "Required", depth: 3 },
]

export default function InputPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Input"
        description="Displays a form input field or a component that looks like an input."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add input" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { Input } from "@/primitives/input"`}
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
