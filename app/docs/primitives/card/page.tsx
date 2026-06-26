"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/primitives/card"
import { Button } from "@/primitives/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/primitives/tabs"

function CodeBlock({ children }: { children: string }) {
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
                <span className="inline-block w-8 text-right pr-4 text-slate-600 select-none">{i + 1}</span>
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
      {children}
    </Card>
  )
}

export default function CardPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed right-0 top-20 w-64 h-screen overflow-y-auto border-l bg-background/50 p-6 hidden lg:block">
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">On This Page</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#usage" className="hover:text-foreground">Usage</a></li>
            <li><a href="#installation" className="hover:text-foreground">Installation</a></li>
            <li><a href="#props" className="hover:text-foreground">Props</a></li>
          </ul>
        </div>
      </div>

      <div className="flex-1 max-w-2xl space-y-8">
        <section className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold tracking-tight">Card</h1>
              <p className="text-lg text-muted-foreground">Container component for organizing content.</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-md text-sm border hover:bg-muted transition-colors">
              <Copy className="size-4" /> Copy Page
            </button>
          </div>
        </section>

        <section id="usage" className="space-y-4">
          <h2 className="text-2xl font-bold">Usage</h2>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <Preview>
                <Card className="w-full max-w-sm">
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card description</CardDescription>
                  </CardHeader>
                  <CardContent>Content area</CardContent>
                  <CardFooter>
                    <Button>Action</Button>
                  </CardFooter>
                </Card>
              </Preview>
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock>{`import { Card, CardHeader, CardTitle, CardContent } from "@/primitives/card"

export function CardBasic() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>Content</CardContent>
    </Card>
  )
}`}</CodeBlock>
            </TabsContent>
          </Tabs>
        </section>

        <section id="installation" className="space-y-4">
          <h2 className="text-2xl font-bold">Installation</h2>
          <CodeBlock>{`pnpm dlx shadcn@latest add card`}</CodeBlock>
        </section>

        <section id="props" className="space-y-4">
          <h2 className="text-2xl font-bold">Props</h2>
          <Card className="overflow-hidden border">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold">Component</th>
                  <th className="text-left p-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-slate-50">
                  <td className="p-4 font-mono text-xs">Card</td>
                  <td className="p-4 text-xs">Container element</td>
                </tr>
                <tr className="border-b hover:bg-slate-50">
                  <td className="p-4 font-mono text-xs">CardHeader</td>
                  <td className="p-4 text-xs">Header section</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-mono text-xs">CardContent</td>
                  <td className="p-4 text-xs">Main content</td>
                </tr>
              </tbody>
            </table>
          </Card>
        </section>

        <section className="flex items-center justify-between pt-8 border-t">
          <div className="text-sm text-muted-foreground">Last updated: June 26, 2025</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">← Previous</Button>
            <Button variant="outline" size="sm">Next →</Button>
          </div>
        </section>
      </div>
    </div>
  )
}
