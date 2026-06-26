import { Card } from "@/primitives/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function InstallationPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Installation</h1>
        <p className="text-lg text-muted-foreground">
          How to set up components in your project.
        </p>
      </section>

      {/* Prerequisites */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Prerequisites</h2>
        <div className="space-y-3">
          <div className="flex gap-3">
            <CheckCircle2 className="size-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">React 18+</p>
              <p className="text-sm text-muted-foreground">Components use React hooks.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 className="size-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Next.js 13+ with App Router</p>
              <p className="text-sm text-muted-foreground">Uses server components and async layouts.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 className="size-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Tailwind CSS v4</p>
              <p className="text-sm text-muted-foreground">Utility-first CSS framework.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 className="size-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">TypeScript (optional)</p>
              <p className="text-sm text-muted-foreground">Type safety for components.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Step 1 */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
          <h2 className="text-2xl font-bold">Install Dependencies</h2>
        </div>
        <Card className="p-4">
          <pre className="text-sm overflow-x-auto font-mono">
{`npm install clsx tailwind-merge`}
          </pre>
        </Card>
        <Card className="p-4">
          <pre className="text-sm overflow-x-auto font-mono">
{`pnpm add clsx tailwind-merge`}
          </pre>
        </Card>
        <Card className="p-4">
          <pre className="text-sm overflow-x-auto font-mono">
{`yarn add clsx tailwind-merge`}
          </pre>
        </Card>
      </section>

      {/* Step 2 */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
          <h2 className="text-2xl font-bold">Copy Utils</h2>
        </div>
        <p className="text-muted-foreground">
          Copy the <code className="bg-muted px-2 py-1 rounded text-sm">lib/utils.ts</code> file to your project.
        </p>
        <Card className="p-4">
          <pre className="text-sm overflow-x-auto font-mono">
{`import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
          </pre>
        </Card>
      </section>

      {/* Step 3 */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
          <h2 className="text-2xl font-bold">Copy Components</h2>
        </div>
        <p className="text-muted-foreground">
          Copy component files from <code className="bg-muted px-2 py-1 rounded text-sm">components/primitives/</code> to your project.
        </p>
        <Card className="p-4 space-y-2 text-sm">
          <p>Example: To use Button component:</p>
          <pre className="bg-background p-3 rounded overflow-x-auto font-mono">
{`import { Button } from "@/primitives/button"

export function MyComponent() {
  return <Button>Click me</Button>
}`}
          </pre>
        </Card>
      </section>

      {/* Step 4 */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">4</div>
          <h2 className="text-2xl font-bold">Add TooltipProvider</h2>
        </div>
        <p className="text-muted-foreground">
          Wrap your app with <code className="bg-muted px-2 py-1 rounded text-sm">TooltipProvider</code>:
        </p>
        <Card className="p-4">
          <pre className="text-sm overflow-x-auto font-mono">
{`// app/layout.tsx
import { TooltipProvider } from "@/primitives/tooltip"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  )
}`}
          </pre>
        </Card>
      </section>

      {/* About Copy-Paste */}
      <section className="space-y-4 pt-8 border-t border-border">
        <h2 className="text-2xl font-bold">Why Copy-Paste?</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Components are designed to be copied into your project. You own the code. You can modify it as needed.
          </p>
          <ul className="space-y-2">
            <li className="flex gap-3">
              <span>✓</span>
              <span>Full control over component behavior</span>
            </li>
            <li className="flex gap-3">
              <span>✓</span>
              <span>No dependency on package updates</span>
            </li>
            <li className="flex gap-3">
              <span>✓</span>
              <span>Customizable without forking</span>
            </li>
            <li className="flex gap-3">
              <span>✓</span>
              <span>Same approach as shadcn/ui</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Customization */}
      <section className="space-y-4 pt-8 border-t border-border">
        <h2 className="text-2xl font-bold">Customization</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Change Color Scheme</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Edit CSS variables in <code className="bg-muted px-2 py-1 rounded">app/globals.css</code>:
            </p>
            <Card className="p-4">
              <pre className="text-sm overflow-x-auto font-mono">
{`:root {
  --primary: oklch(0.488 0.243 264.376);
  --primary-foreground: oklch(0.97 0.014 254.604);
  /* ... other colors ... */
}`}
              </pre>
            </Card>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Change Component Styles</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Components use Tailwind classes. Modify directly in component files:
            </p>
            <Card className="p-4">
              <pre className="text-sm overflow-x-auto font-mono">
{`// components/primitives/button.tsx
className={cn(
  "inline-flex items-center justify-center rounded-md", // ← Customize here
  buttonVariants({ variant, size, className })
)}`}
              </pre>
            </Card>
          </div>
        </div>
      </section>

      {/* Dark Mode */}
      <section className="space-y-4 pt-8 border-t border-border">
        <h2 className="text-2xl font-bold">Dark Mode</h2>
        <p className="text-muted-foreground mb-3">
          Dark mode CSS variables are automatically applied with <code className="bg-muted px-2 py-1 rounded text-sm">.dark</code> class:
        </p>
        <Card className="p-4">
          <pre className="text-sm overflow-x-auto font-mono">
{`<html className="dark">
  {/* All colors switch automatically */}
</html>`}
          </pre>
        </Card>
      </section>
    </div>
  )
}
