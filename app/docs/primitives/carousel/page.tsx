import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import CarouselDApiDemo from "@/ui/components/carousel-api"
import CarouselDemo from "@/ui/components/carousel-demo"
import { CarouselMultiple } from "@/ui/components/carousel-multiple"
import CarouselOrientation from "@/ui/components/carousel-orientation"
import CarouselSize from "@/ui/components/carousel-size"
import CarouselSpacing from "@/ui/components/carousel-spacing"

const examples = [
  {
    title: "Carousel Api",
    component: CarouselDApiDemo,
    sourcePath: "ui/components/carousel-api.tsx",
  },
  {
    title: "Carousel Demo",
    component: CarouselDemo,
    sourcePath: "ui/components/carousel-demo.tsx",
  },
  {
    title: "Carousel Multiple",
    component: CarouselMultiple,
    sourcePath: "ui/components/carousel-multiple.tsx",
  },
  {
    title: "Carousel Orientation",
    component: CarouselOrientation,
    sourcePath: "ui/components/carousel-orientation.tsx",
  },
  {
    title: "Carousel Size",
    component: CarouselSize,
    sourcePath: "ui/components/carousel-size.tsx",
  },
  {
    title: "Carousel Spacing",
    component: CarouselSpacing,
    sourcePath: "ui/components/carousel-spacing.tsx",
  },
] as const

export default function CarouselPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Carousel</h1>
        <p className="text-lg text-muted-foreground">
          Carousel component — {examples.length} examples rendered live with source code
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
