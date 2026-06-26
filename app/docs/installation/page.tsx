import { CheckCircle2 } from "lucide-react"

import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"

const toc = [
  { id: "prerequisites", title: "Prerequisites" },
  { id: "dependencies", title: "Dependencies" },
  { id: "utils", title: "Utils" },
  { id: "components", title: "Components" },
  { id: "customization", title: "Customization" },
]

export default function InstallationPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Installation"
        description="How to set up UI Tokens components in your project."
      />

      <DocsSection id="prerequisites" title="Prerequisites">
        <div className="space-y-4">
          {[
            {
              title: "React 18+",
              description: "Components use React hooks and server components.",
            },
            {
              title: "Next.js 14+ with App Router",
              description: "Recommended framework for this design system.",
            },
            {
              title: "Tailwind CSS v4",
              description: "Utility-first styling with design tokens.",
            },
            {
              title: "TypeScript (optional)",
              description: "Full type safety for all primitives.",
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-3">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection
        id="dependencies"
        title="Install Dependencies"
        description="Install the required utility packages."
      >
        <CodeBlock code="pnpm add clsx tailwind-merge class-variance-authority" />
      </DocsSection>

      <DocsSection
        id="utils"
        title="Configure Utils"
        description="Add the cn utility helper to your project."
      >
        <CodeBlock
          code={`import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
        />
      </DocsSection>

      <DocsSection
        id="components"
        title="Add Components"
        description="Copy primitives from this repo into your project."
      >
        <CodeBlock
          code={`import { Button } from "@/primitives/button"

export function MyComponent() {
  return <Button>Click me</Button>
}`}
        />
      </DocsSection>

      <DocsSection id="customization" title="Customization">
        <p className="text-muted-foreground">
          Edit CSS variables in{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            app/globals.css
          </code>{" "}
          to change colors, radius, and more. Components use Tailwind classes
          you can modify directly in source files.
        </p>
        <CodeBlock
          code={`:root {
  --primary: oklch(0.488 0.243 264.376);
  --radius: 0.625rem;
}`}
        />
      </DocsSection>
    </DocsPage>
  )
}
