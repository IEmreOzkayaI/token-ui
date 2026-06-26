import { Card } from "@/primitives/card"
import { Button } from "@/primitives/button"
import Link from "next/link"
import { ArrowRight, Code2, Palette, Package } from "lucide-react"

export default function DocsHome() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="space-y-4">
        <h1 className="text-5xl font-bold tracking-tight">
          Build Beautiful UIs<br />
          <span className="text-primary">Faster</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          A comprehensive design system with 50+ production-ready components. Copy, paste, customize.
        </p>
        <div className="flex gap-3 pt-4">
          <Button size="lg" asChild>
            <Link href="/docs/installation" className="gap-2">
              Get Started
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/docs/components/button">Browse Components</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 pt-8">
        <Card className="p-6 space-y-3">
          <Palette className="size-6 text-primary" />
          <h3 className="font-semibold">50+ Components</h3>
          <p className="text-sm text-muted-foreground">
            Carefully crafted components built on shadcn/ui and Radix UI. Copy and customize freely.
          </p>
        </Card>

        <Card className="p-6 space-y-3">
          <Code2 className="size-6 text-primary" />
          <h3 className="font-semibold">Copy-Paste Ready</h3>
          <p className="text-sm text-muted-foreground">
            Components are designed to be copied into your project. Own your code, no dependencies.
          </p>
        </Card>

        <Card className="p-6 space-y-3">
          <Package className="size-6 text-primary" />
          <h3 className="font-semibold">Fully Styled</h3>
          <p className="text-sm text-muted-foreground">
            Built with Tailwind CSS. Comes with dark mode support and semantic color tokens.
          </p>
        </Card>
      </section>

      {/* Code Example */}
      <section className="space-y-4 pt-8">
        <h2 className="text-2xl font-bold">Quick Start</h2>
        <Card className="p-4">
          <pre className="text-sm overflow-x-auto">
{`import { Button } from "@/primitives/button"

export function MyComponent() {
  return <Button>Click me</Button>
}`}
          </pre>
        </Card>
      </section>

      {/* Foundations */}
      <section className="space-y-4 pt-8">
        <h2 className="text-2xl font-bold">Design Foundations</h2>
        <p className="text-muted-foreground">
          Everything is built on solid foundations: semantic color tokens, proportional spacing, accessible typography.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/docs/foundations/colors" className="group">
            <Card className="p-4 hover:border-primary/50 transition-colors">
              <h3 className="font-semibold group-hover:text-primary transition-colors">Colors</h3>
              <p className="text-sm text-muted-foreground mt-1">OKLCH color space. Light & dark modes.</p>
            </Card>
          </Link>
          <Link href="/docs/foundations/typography" className="group">
            <Card className="p-4 hover:border-primary/50 transition-colors">
              <h3 className="font-semibold group-hover:text-primary transition-colors">Typography</h3>
              <p className="text-sm text-muted-foreground mt-1">System fonts, scales & weights.</p>
            </Card>
          </Link>
          <Link href="/docs/foundations/spacing" className="group">
            <Card className="p-4 hover:border-primary/50 transition-colors">
              <h3 className="font-semibold group-hover:text-primary transition-colors">Spacing</h3>
              <p className="text-sm text-muted-foreground mt-1">4px base unit. Proportional scale.</p>
            </Card>
          </Link>
          <Link href="/docs/foundations/radius" className="group">
            <Card className="p-4 hover:border-primary/50 transition-colors">
              <h3 className="font-semibold group-hover:text-primary transition-colors">Radius</h3>
              <p className="text-sm text-muted-foreground mt-1">7 levels. Consistent rounding.</p>
            </Card>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid md:grid-cols-4 gap-4 pt-8">
        {[
          { value: "50+", label: "Components" },
          { value: "100%", label: "Copy-Paste" },
          { value: "WCAG AA", label: "Accessible" },
          { value: "Dark Mode", label: "Included" },
        ].map((item) => (
          <Card key={item.label} className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{item.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
          </Card>
        ))}
      </section>
    </div>
  )
}
