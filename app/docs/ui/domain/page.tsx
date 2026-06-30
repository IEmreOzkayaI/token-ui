import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"

const toc = [
  { id: "overview", title: "Overview" },
  { id: "retail", title: "Retail" },
]

export default function DomainComponentsPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Domain Components"
        description="Specialized composite components for specific industries and use cases."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Domain components are industry-specific or use-case-specific composite components
          built from Token UI primitives and general components. They encapsulate domain logic,
          data patterns, and visual conventions for retail, analytics, finance, and other sectors.
        </p>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Unlike general-purpose components, domain components carry opinionated data structures
          and visual patterns tailored to their industry. They serve as templates and reference
          implementations for building similar components in your own domain.
        </p>
      </DocsSection>

      <DocsSection id="retail" title="Retail">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Components for retail operations dashboards, store performance monitoring, and
          point-of-sale systems.
        </p>
      </DocsSection>
    </DocsPage>
  )
}
