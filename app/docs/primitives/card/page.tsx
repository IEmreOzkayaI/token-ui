"use client"

import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/primitives/card"
import { Button } from "@/primitives/button"

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
        className="absolute top-2 right-2 p-2 rounded-lg hover:bg-muted transition-colors"
      >
        {copied ? <Check className="size-4 text-green-600" /> : <Copy className="size-4" />}
      </button>
      <Card className="p-4">
        <pre className="text-sm overflow-x-auto font-mono pr-12">{children}</pre>
      </Card>
    </div>
  )
}

function Preview({ children }: { children: React.ReactNode }) {
  return (
    <Card className="p-8 border-dashed flex items-center justify-center min-h-32">
      <div className="w-full max-w-md">{children}</div>
    </Card>
  )
}

export default function CardPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Card</h1>
        <p className="text-lg text-muted-foreground">
          Container component for organizing content into cards.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Installation</h2>
        <Card className="p-4 space-y-3">
          <div className="text-sm">
            <p className="font-semibold mb-2">Command</p>
            <CodeBlock>{`npx shadcn@latest add card`}</CodeBlock>
          </div>
          <div className="text-sm pt-4 border-t border-border">
            <p className="font-semibold mb-2">Manual</p>
            <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside">
              <li>Copy and paste the code into your project</li>
              <li>Update import paths to match your setup</li>
            </ol>
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Import</h2>
        <CodeBlock>{`import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/primitives/card"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Basic</h2>
        <Preview>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
            </CardHeader>
            <CardContent>
              Card content goes here.
            </CardContent>
          </Card>
        </Preview>
        <CodeBlock>{`<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here.
  </CardContent>
</Card>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">With Description</h2>
        <Preview>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description</CardDescription>
            </CardHeader>
            <CardContent>
              Card content
            </CardContent>
          </Card>
        </Preview>
        <CodeBlock>{`<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">With Footer</h2>
        <Preview>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
            </CardHeader>
            <CardContent>
              Card content goes here.
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button>Save</Button>
              <Button variant="outline">Cancel</Button>
            </CardFooter>
          </Card>
        </Preview>
        <CodeBlock>{`<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter className="flex gap-2">
    <Button>Save</Button>
    <Button variant="outline">Cancel</Button>
  </CardFooter>
</Card>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Composition</h2>
        <Card className="p-4">
          <pre className="text-sm font-mono">{`Card
├── CardHeader
│   ├── CardTitle
│   └── CardDescription
├── CardContent
└── CardFooter`}</pre>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Examples</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Default Size</h3>
            <Preview>
              <Card>
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                  <CardDescription>Standard spacing and size</CardDescription>
                </CardHeader>
                <CardContent>
                  Standard card with default spacing.
                </CardContent>
              </Card>
            </Preview>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Small Size</h3>
            <p className="text-sm text-muted-foreground mb-3">Smaller spacing and padding</p>
            <Preview>
              <Card className="data-[size=sm]">
                <CardHeader>
                  <CardTitle className="text-base">Small Card</CardTitle>
                  <CardDescription className="text-xs">Compact spacing</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  Smaller card with reduced padding.
                </CardContent>
              </Card>
            </Preview>
            <CodeBlock>{`<Card className="data-[size=sm]">
  <CardHeader>
    <CardTitle>Small Card</CardTitle>
    <CardDescription>Compact</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>`}</CodeBlock>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Custom Spacing</h3>
            <p className="text-sm text-muted-foreground mb-3">Use CSS variables to customize spacing</p>
            <Preview>
              <Card className="[--card-spacing:24px]">
                <CardHeader>
                  <CardTitle>Custom Spacing</CardTitle>
                  <CardDescription>Larger gap between sections</CardDescription>
                </CardHeader>
                <CardContent>
                  Custom spacing via CSS variables.
                </CardContent>
              </Card>
            </Preview>
            <CodeBlock>{`<Card className="[--card-spacing:24px]">
  <CardHeader>
    <CardTitle>Custom Spacing</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>`}</CodeBlock>
          </div>

          <div>
            <h3 className="font-semibold mb-3">With Image</h3>
            <p className="text-sm text-muted-foreground mb-3">Image as card header</p>
            <Preview>
              <Card className="overflow-hidden">
                <div className="w-full h-32 bg-gradient-to-r from-primary/50 to-primary/20 flex items-center justify-center text-sm text-muted-foreground">
                  Image goes here
                </div>
                <CardHeader>
                  <CardTitle>Card with Image</CardTitle>
                  <CardDescription>Image at the top</CardDescription>
                </CardHeader>
                <CardContent>
                  Image stretches to card edges.
                </CardContent>
              </Card>
            </Preview>
            <CodeBlock>{`<Card className="overflow-hidden">
  <img src="image.jpg" alt="Card image" className="w-full" />
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>`}</CodeBlock>
          </div>

          <div>
            <h3 className="font-semibold mb-3">With All Elements</h3>
            <Preview>
              <Card>
                <CardHeader>
                  <CardTitle>Complete Card</CardTitle>
                  <CardDescription>All subcomponents included</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Main content area with all sections.</p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button size="sm">Action</Button>
                  <Button size="sm" variant="ghost">Close</Button>
                </CardFooter>
              </Card>
            </Preview>
            <CodeBlock>{`<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Subtitle</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content</p>
  </CardContent>
  <CardFooter className="flex gap-2">
    <Button>Save</Button>
    <Button variant="outline">Cancel</Button>
  </CardFooter>
</Card>`}</CodeBlock>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">API Reference</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Card</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-medium">Prop</th>
                    <th className="text-left py-2 px-3 font-medium">Type</th>
                    <th className="text-left py-2 px-3 font-medium">Default</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-mono text-xs">className</td>
                    <td className="py-2 px-3 text-xs">string</td>
                    <td className="py-2 px-3 text-xs">-</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono text-xs">children</td>
                    <td className="py-2 px-3 text-xs">ReactNode</td>
                    <td className="py-2 px-3 text-xs">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">CardHeader</h3>
            <p className="text-sm text-muted-foreground">Container for title and description</p>
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-medium">Prop</th>
                    <th className="text-left py-2 px-3 font-medium">Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-3 font-mono text-xs">className</td>
                    <td className="py-2 px-3 text-xs">string</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">CardTitle</h3>
            <p className="text-sm text-muted-foreground">Card heading</p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">CardDescription</h3>
            <p className="text-sm text-muted-foreground">Helper text below title</p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">CardContent</h3>
            <p className="text-sm text-muted-foreground">Main card body content</p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">CardFooter</h3>
            <p className="text-sm text-muted-foreground">Bottom section for actions</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Spacing Control</h2>
        <Card className="p-4 space-y-3">
          <p className="text-sm">
            Use the <code className="bg-muted px-2 py-1 rounded text-xs">--card-spacing</code> CSS variable to control padding and gaps:
          </p>
          <CodeBlock>{`// Default spacing (16px)
<Card>...</Card>

// Custom spacing
<Card className="[--card-spacing:24px]">...</Card>

// Small spacing
<Card className="[--card-spacing:12px]">...</Card>`}</CodeBlock>
          <p className="text-xs text-muted-foreground mt-3">
            The variable controls: gap between sections, header/content/footer padding, and internal spacing.
          </p>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Best Practices</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span>✓</span>
            <span>Use CardHeader for titles and descriptions</span>
          </li>
          <li className="flex gap-2">
            <span>✓</span>
            <span>Use CardContent for main content</span>
          </li>
          <li className="flex gap-2">
            <span>✓</span>
            <span>Use CardFooter for actions (buttons)</span>
          </li>
          <li className="flex gap-2">
            <span>✓</span>
            <span>Place images at top with overflow-hidden on Card</span>
          </li>
          <li className="flex gap-2">
            <span>✓</span>
            <span>Use consistent spacing across cards</span>
          </li>
        </ul>
      </section>
    </div>
  )
}