"use client"

import { Button } from "@/primitives/button"
import { Card } from "@/primitives/card"
import { Copy, Check, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/primitives/tabs"
import { ButtonDefault, ButtonIcon, ButtonSize, ButtonDestructive } from "@/components/button-showcase"

function CodeBlock({ children, language = "tsx" }: { children: string; language?: string }) {
  const [copied, setCopied] = useState(false)
  const lines = children.split("\n")

  return (
    <div className="relative group">
      <button
        onClick={() => {
          navigator.clipboard.writeText(children)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }}
        className="absolute top-3 right-3 p-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors z-10"
        title="Copy code"
      >
        {copied ? (
          <Check className="size-4 text-green-500" />
        ) : (
          <Copy className="size-4" />
        )}
      </button>
      <Card className="p-4 bg-slate-950 text-slate-50 border-slate-800 overflow-hidden">
        <pre className="text-sm overflow-x-auto font-mono">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="flex">
                <span className="inline-block w-8 text-right pr-4 text-slate-600 select-none">
                  {i + 1}
                </span>
                <span>{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </Card>
    </div>
  )
}

function Preview({ children }: { children: React.ReactNode }) {
  return (
    <Card className="p-8 border bg-white flex items-center justify-center min-h-48 rounded-lg">
      <div className="flex flex-wrap gap-4 items-center justify-center w-full">
        {children}
      </div>
    </Card>
  )
}

function CommandBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <div className="relative group">
      <button
        onClick={() => {
          navigator.clipboard.writeText(children)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }}
        className="absolute top-3 right-3 p-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors z-10"
      >
        {copied ? (
          <Check className="size-4 text-green-500" />
        ) : (
          <Copy className="size-4" />
        )}
      </button>
      <Card className="p-4 bg-slate-950 text-slate-50 border-slate-800">
        <pre className="text-sm overflow-x-auto font-mono">{children}</pre>
      </Card>
    </div>
  )
}

function TableOfContents() {
  const headings = [
    { id: "installation", label: "Installation", level: 2 },
    { id: "usage", label: "Usage", level: 2 },
    { id: "variants", label: "Variants", level: 3 },
    { id: "sizes", label: "Sizes", level: 3 },
    { id: "props", label: "Props", level: 2 },
  ]

  return (
    <div className="fixed right-0 top-20 w-64 h-screen overflow-y-auto border-l bg-background/50 p-6 hidden lg:block">
      <div className="space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          On This Page
        </h3>
        <ul className="space-y-2 text-sm">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`${
                heading.level === 3 ? "ml-4" : ""
              } text-muted-foreground hover:text-foreground transition-colors`}
            >
              <a href={`#${heading.id}`}>{heading.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function ButtonPage() {
  return (
    <div className="flex gap-12">
      <TableOfContents />

      <div className="flex-1 max-w-2xl space-y-8">
        {/* Hero */}
        <section className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold tracking-tight">Button</h1>
              <p className="text-lg text-muted-foreground">
                Clickable interactive element for actions and navigation.
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-md text-sm border hover:bg-muted transition-colors">
              <Copy className="size-4" />
              Copy Page
            </button>
          </div>
        </section>

        {/* Preview */}
        <section id="usage" className="space-y-4">
          <h2 className="text-2xl font-bold">Usage</h2>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="space-y-6">
              <Preview>
                <ButtonDefault />
              </Preview>
            </TabsContent>

            <TabsContent value="code" className="space-y-4">
              <CodeBlock>{`import { Button } from "@/primitives/button"

export function ButtonDefault() {
  return <Button>Button</Button>
}`}</CodeBlock>
            </TabsContent>
          </Tabs>
        </section>

        {/* Variants */}
        <section id="variants" className="space-y-4">
          <h2 className="text-2xl font-bold">Variants</h2>
          <Preview>
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </Preview>
          <CodeBlock>{`<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`}</CodeBlock>
        </section>

        {/* Sizes */}
        <section id="sizes" className="space-y-4">
          <h2 className="text-2xl font-bold">Sizes</h2>
          <Preview>
            <ButtonSize />
          </Preview>
          <CodeBlock>{`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">+</Button>`}</CodeBlock>
        </section>

        {/* Installation */}
        <section id="installation" className="space-y-4">
          <h2 className="text-2xl font-bold">Installation</h2>

          <Tabs defaultValue="cli" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cli">Command</TabsTrigger>
              <TabsTrigger value="manual">Manual</TabsTrigger>
            </TabsList>

            <TabsContent value="cli" className="space-y-4">
              <div className="space-y-2">
                <div className="flex gap-1 border-b bg-slate-950 rounded-t-lg p-2">
                  {["pnpm", "npm", "yarn", "bun"].map((pm) => (
                    <button
                      key={pm}
                      className="px-3 py-1 text-sm text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      {pm}
                    </button>
                  ))}
                </div>
                <CommandBlock>{`pnpm dlx shadcn@latest add button`}</CommandBlock>
              </div>
            </TabsContent>

            <TabsContent value="manual" className="space-y-4">
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                <li>Copy button.tsx from ui/primitives/</li>
                <li>Paste into your components directory</li>
                <li>Update import paths as needed</li>
              </ol>
            </TabsContent>
          </Tabs>
        </section>

        {/* Props */}
        <section id="props" className="space-y-4">
          <h2 className="text-2xl font-bold">Props</h2>
          <Card className="overflow-hidden border">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold">Prop</th>
                  <th className="text-left p-4 font-semibold">Type</th>
                  <th className="text-left p-4 font-semibold">Default</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono text-xs font-semibold">variant</td>
                  <td className="p-4 text-xs font-mono text-slate-600">
                    "default" | "secondary" | "outline" | "ghost" | "destructive" | "link"
                  </td>
                  <td className="p-4 text-xs">"default"</td>
                </tr>
                <tr className="border-b hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono text-xs font-semibold">size</td>
                  <td className="p-4 text-xs font-mono text-slate-600">
                    "sm" | "default" | "lg" | "icon"
                  </td>
                  <td className="p-4 text-xs">"default"</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono text-xs font-semibold">asChild</td>
                  <td className="p-4 text-xs font-mono text-slate-600">boolean</td>
                  <td className="p-4 text-xs">false</td>
                </tr>
              </tbody>
            </table>
          </Card>
        </section>

        {/* Footer */}
        <section className="flex items-center justify-between pt-8 border-t">
          <div className="text-sm text-muted-foreground">
            Last updated: June 26, 2025
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              ← Previous
            </Button>
            <Button variant="outline" size="sm">
              Next →
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
