"use client"

import { Input } from "@/primitives/input"
import { Card } from "@/primitives/card"
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
        {copied ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
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
    <Card className="p-8 border bg-white flex items-center justify-center min-h-40 rounded-lg">
      <div className="w-full max-w-xs space-y-4">
        {children}
      </div>
    </Card>
  )
}

export default function InputPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed right-0 top-20 w-64 h-screen overflow-y-auto border-l bg-background/50 p-6 hidden lg:block">
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">On This Page</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#examples" className="hover:text-foreground">Examples</a></li>
            <li className="ml-4"><a href="#basic" className="hover:text-foreground">Basic</a></li>
            <li className="ml-4"><a href="#types" className="hover:text-foreground">Types</a></li>
            <li><a href="#installation" className="hover:text-foreground">Installation</a></li>
          </ul>
        </div>
      </div>

      <div className="flex-1 max-w-2xl space-y-8">
        <section className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">Input</h1>
          <p className="text-lg text-muted-foreground">Text input field component</p>
        </section>

        <section id="examples" className="space-y-4">
          <h2 className="text-2xl font-bold">Examples</h2>

          <div id="basic" className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Input</h3>
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              <TabsContent value="preview">
                <Preview>
                  <Input placeholder="Enter text..." />
                  <Input placeholder="Disabled" disabled />
                </Preview>
              </TabsContent>
              <TabsContent value="code">
                <CodeBlock>{`import { Input } from "@/primitives/input"

export function InputBasic() {
  return (
    <>
      <Input placeholder="Enter text..." />
      <Input placeholder="Disabled" disabled />
    </>
  )
}`}</CodeBlock>
              </TabsContent>
            </Tabs>
          </div>

          <div id="types" className="space-y-4">
            <h3 className="text-lg font-semibold">Input Types</h3>
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              <TabsContent value="preview">
                <Preview>
                  <div className="space-y-3">
                    <Input type="text" placeholder="Text" />
                    <Input type="email" placeholder="Email" />
                    <Input type="password" placeholder="Password" />
                    <Input type="number" placeholder="Number" />
                    <Input type="search" placeholder="Search" />
                  </div>
                </Preview>
              </TabsContent>
              <TabsContent value="code">
                <CodeBlock>{`<Input type="text" placeholder="Text" />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
<Input type="number" placeholder="Number" />
<Input type="search" placeholder="Search" />`}</CodeBlock>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section id="installation" className="space-y-4">
          <h2 className="text-2xl font-bold">Installation</h2>
          <CodeBlock>{`pnpm dlx shadcn@latest add input`}</CodeBlock>
        </section>

        <section className="flex items-center justify-between pt-8 border-t">
          <div className="text-sm text-muted-foreground">Last updated: June 26, 2025</div>
        </section>
      </div>
    </div>
  )
}
