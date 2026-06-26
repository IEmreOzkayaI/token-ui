import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import CarouselDApiDemo from "@/ui/components/carousel-api"
import CarouselDemo from "@/ui/components/carousel-demo"
import CarouselMultiple from "@/ui/components/carousel-multiple"
import CarouselOrientation from "@/ui/components/carousel-orientation"
import CarouselSize from "@/ui/components/carousel-size"
import CarouselSpacing from "@/ui/components/carousel-spacing"

const examples = [
  {
    id: "api",
    title: "Api",
    component: CarouselDApiDemo,
    sourcePath: "ui/components/carousel-api.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: CarouselDemo,
    sourcePath: "ui/components/carousel-demo.tsx",
  },
  {
    id: "multiple",
    title: "Multiple",
    component: CarouselMultiple,
    sourcePath: "ui/components/carousel-multiple.tsx",
  },
  {
    id: "orientation",
    title: "Orientation",
    component: CarouselOrientation,
    sourcePath: "ui/components/carousel-orientation.tsx",
  },
  {
    id: "size",
    title: "Size",
    component: CarouselSize,
    sourcePath: "ui/components/carousel-size.tsx",
  },
  {
    id: "spacing",
    title: "Spacing",
    component: CarouselSpacing,
    sourcePath: "ui/components/carousel-spacing.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
    { id: "api", title: "Api" },
    { id: "demo", title: "Demo" },
    { id: "multiple", title: "Multiple" },
    { id: "orientation", title: "Orientation" },
    { id: "size", title: "Size" },
    { id: "spacing", title: "Spacing" },
]

export default function CarouselPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Carousel"
        description="Carousel component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the carousel primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add carousel" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the Carousel component."
      >
        <CodeBlock
          code={`import { Carousel } from "@/primitives/carousel"`}
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
