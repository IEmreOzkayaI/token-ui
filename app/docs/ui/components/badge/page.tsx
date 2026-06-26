import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import BadgeCustomColors from "@/ui/components/badge/colors"
import BadgeDemo from "@/ui/components/badge/demo"
import BadgeWithIconLeft from "@/ui/components/badge/icon"
import BadgeAsLink from "@/ui/components/badge/link"
import BadgeWithSpinner from "@/ui/components/badge/spinner"
import BadgeVariants from "@/ui/components/badge/variants"

const examples = [
  {
    id: "colors",
    title: "Colors",
    component: BadgeCustomColors,
    sourcePath: "ui/components/badge/colors.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: BadgeDemo,
    sourcePath: "ui/components/badge/demo.tsx",
  },
  {
    id: "icon",
    title: "Icon",
    component: BadgeWithIconLeft,
    sourcePath: "ui/components/badge/icon.tsx",
  },
  {
    id: "link",
    title: "Link",
    component: BadgeAsLink,
    sourcePath: "ui/components/badge/link.tsx",
  },
  {
    id: "spinner",
    title: "Spinner",
    component: BadgeWithSpinner,
    sourcePath: "ui/components/badge/spinner.tsx",
  },
  {
    id: "variants",
    title: "Variants",
    component: BadgeVariants,
    sourcePath: "ui/components/badge/variants.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "colors", title: "Colors", depth: 3 },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "icon", title: "Icon", depth: 3 },
  { id: "link", title: "Link", depth: 3 },
  { id: "spinner", title: "Spinner", depth: 3 },
  { id: "variants", title: "Variants", depth: 3 },
]

export default function BadgePage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Badge"
        description="Displays a badge or a component that looks like a badge."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add badge" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { Badge } from "@/primitives/badge"`}
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
