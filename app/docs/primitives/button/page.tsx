"use client"

import { Button } from "@/primitives/button"
import { Card } from "@/primitives/card"
import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/primitives/tabs"
import { ButtonDefault, ButtonIcon, ButtonSize, ButtonDestructive } from "@/components/button-showcase"

function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => {
          navigator.clipboard.writeText(children)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }}
        className="absolute top-2 right-2 p-2 rounded-lg hover:bg-muted transition-colors z-10"
        title="Copy code"
      >
        {copied ? (
          <Check className="size-4 text-green-600" />
        ) : (
          <Copy className="size-4" />
        )}
      </button>
      <Card className="p-4 bg-slate-950 text-slate-50">
        <pre className="text-sm overflow-x-auto font-mono pr-12">
          <code>{children}</code>
        </pre>
      </Card>
    </div>
  )
}

function Preview({ children }: { children: React.ReactNode }) {
  return (
    <Card className="p-8 border-dashed flex items-center justify-center min-h-40">
      <div className="flex flex-wrap gap-4 items-center justify-center w-full">
        {children}
      </div>
    </Card>
  )
}

export default function ButtonPage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Button</h1>
        <p className="text-lg text-muted-foreground">
          Interactive element for user actions, form submission, and navigation. Supports multiple variants and sizes.
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <Card className="p-3">
            <div className="font-mono font-bold">Variants</div>
            <div className="text-muted-foreground">6 variants</div>
          </Card>
          <Card className="p-3">
            <div className="font-mono font-bold">Sizes</div>
            <div className="text-muted-foreground">4 sizes</div>
          </Card>
        </div>
      </section>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Import</h2>
        <CodeBlock>{`import { Button } from "@/primitives/button"`}</CodeBlock>
      </section>

      {/* Examples Tabs */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Examples</h2>
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-6">
            {/* Default */}
            <div className="space-y-2">
              <h3 className="font-semibold">Default</h3>
              <Preview>
                <ButtonDefault />
              </Preview>
            </div>

            {/* Icon */}
            <div className="space-y-2">
              <h3 className="font-semibold">With Icon</h3>
              <Preview>
                <ButtonIcon />
              </Preview>
            </div>

            {/* Size */}
            <div className="space-y-2">
              <h3 className="font-semibold">Sizes</h3>
              <Preview>
                <ButtonSize />
              </Preview>
            </div>

            {/* Destructive */}
            <div className="space-y-2">
              <h3 className="font-semibold">Destructive</h3>
              <Preview>
                <ButtonDestructive />
              </Preview>
            </div>
          </TabsContent>

          <TabsContent value="code" className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Default</h3>
              <CodeBlock>{`<Button>Button</Button>`}</CodeBlock>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Variants</h3>
              <CodeBlock>{`<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`}</CodeBlock>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Sizes</h3>
              <CodeBlock>{`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">+</Button>`}</CodeBlock>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-sm">With Icon</h3>
              <CodeBlock>{`import { ArrowRight } from "lucide-react"

<Button>
  Click me
  <ArrowRight className="ml-2 size-4" />
</Button>`}</CodeBlock>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* API Reference */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Props</h2>
        <Card className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b">
              <tr>
                <th className="text-left p-3 font-semibold">Prop</th>
                <th className="text-left p-3 font-semibold">Type</th>
                <th className="text-left p-3 font-semibold">Default</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">variant</td>
                <td className="p-3 text-xs text-muted-foreground">
                  "default" | "secondary" | "outline" | "ghost" | "destructive" | "link"
                </td>
                <td className="p-3 text-xs">"default"</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">size</td>
                <td className="p-3 text-xs text-muted-foreground">
                  "sm" | "default" | "lg" | "icon"
                </td>
                <td className="p-3 text-xs">"default"</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">asChild</td>
                <td className="p-3 text-xs text-muted-foreground">boolean</td>
                <td className="p-3 text-xs">false</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  )
}
