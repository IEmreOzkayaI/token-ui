import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
]

export default function DirectionPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Direction"
        description="Provides right-to-left (RTL) and left-to-right (LTR) direction context."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add direction" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { DirectionProvider } from "@/primitives/direction"`}
        />
      </DocsSection>
    </DocsPage>
  )
}
