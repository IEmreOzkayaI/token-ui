import { DocsCallout } from "@/app/docs/_components/docs-callout"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { DocsStep } from "@/app/docs/_components/docs-step"
import {
  DocsTable,
  DocsTableCell,
  DocsTableRow,
} from "@/app/docs/_components/docs-table"
import { CodeBlock } from "@/app/docs/_components/code-block"

const toc = [
  { id: "overview", title: "Overview" },
  { id: "prerequisites", title: "Prerequisites" },
  { id: "structure", title: "Project Structure" },
  { id: "setup", title: "Setup" },
  { id: "dark-mode", title: "Dark Mode" },
  { id: "providers", title: "Providers" },
  { id: "verify", title: "Verify" },
  { id: "faq", title: "FAQ" },
]

const prerequisites = [
  { name: "Node.js", version: "20+", notes: "LTS recommended for Next.js 16" },
  { name: "React", version: "19+", notes: "Server Components and hooks supported" },
  { name: "Next.js", version: "16+", notes: "App Router required" },
  { name: "Tailwind CSS", version: "4+", notes: "CSS-first configuration via @theme" },
  { name: "TypeScript", version: "5+", notes: "Optional but strongly recommended" },
]

export default function InstallationPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Installation"
        description="Set up Token UI in a new or existing Next.js project. This guide covers dependencies, design tokens, path aliases, and your first component."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground">
          Token UI is distributed as source files, not a published npm component
          library. You copy primitives into your codebase and wire them to your
          Tailwind theme. The setup takes roughly 15 minutes for a greenfield
          Next.js app.
        </p>
        <DocsCallout title="Already using shadcn/ui?" variant="tip">
          This system follows the same mental model: Radix primitives, Tailwind
          styling, <code>cn()</code> helper, and CSS variable tokens. Migration
          is mostly a path and naming alignment exercise.
        </DocsCallout>
      </DocsSection>

      <DocsSection id="prerequisites" title="Prerequisites">
        <DocsTable headers={["Requirement", "Version", "Notes"]}>
          {prerequisites.map((item) => (
            <DocsTableRow key={item.name}>
              <DocsTableCell className="font-medium">{item.name}</DocsTableCell>
              <DocsTableCell mono>{item.version}</DocsTableCell>
              <DocsTableCell className="text-muted-foreground">
                {item.notes}
              </DocsTableCell>
            </DocsTableRow>
          ))}
        </DocsTable>
      </DocsSection>

      <DocsSection
        id="structure"
        title="Project Structure"
        description="Recommended folder layout after installation."
      >
        <CodeBlock
          code={`your-app/
├── app/
│   ├── globals.css          # Paste design tokens here
│   └── layout.tsx           # Fonts + optional providers
├── lib/
│   └── utils.ts             # cn() helper
├── ui/
│   └── primitives/          # Copied components
│       ├── button.tsx
│       └── ...
└── tsconfig.json            # Path aliases`}
        />
      </DocsSection>

      <DocsSection id="setup" title="Setup">
        <DocsStep
          step={1}
          title="Install dependencies"
          description="Core utilities used by every primitive."
        >
          <CodeBlock code="pnpm add clsx tailwind-merge class-variance-authority lucide-react" />
          <p className="text-sm text-muted-foreground">
            Individual primitives may require additional Radix packages. Install
            them when you copy a component — import errors will list the exact
            package name.
          </p>
        </DocsStep>

        <DocsStep
          step={2}
          title="Add the cn() utility"
          description="Merges Tailwind classes without conflicts."
        >
          <CodeBlock
            code={`// lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
          />
        </DocsStep>

        <DocsStep
          step={3}
          title="Configure design tokens"
          description="Copy the token block from this repo's app/globals.css into your global stylesheet."
        >
          <CodeBlock
            code={`/* app/globals.css */
@import "tailwindcss";

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.488 0.243 264.376);
  --primary-foreground: oklch(0.97 0.014 254.604);
  --radius: 0.625rem;
  /* …copy remaining tokens from this repo */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* …dark overrides */
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  /* …map tokens to Tailwind */
}`}
          />
          <DocsCallout>
            See the{" "}
            <a href="/docs/foundations/colors" className="text-foreground underline">
              Colors foundation
            </a>{" "}
            for the full token reference and usage guidelines.
          </DocsCallout>
        </DocsStep>

        <DocsStep
          step={4}
          title="Configure path aliases"
          description="Match the import paths used throughout the documentation."
        >
          <CodeBlock
            code={`// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/primitives/*": ["./ui/primitives/*"]
    }
  }
}`}
          />
        </DocsStep>

        <DocsStep
          step={5}
          title="Copy your first primitive"
          description="Start with Button — it has minimal dependencies and validates your setup."
        >
          <CodeBlock code={`# From this repository
cp ui/primitives/button.tsx your-app/ui/primitives/button.tsx`} />
          <CodeBlock
            code={`// app/page.tsx
import { Button } from "@/primitives/button"

export default function Page() {
  return <Button>It works</Button>
}`}
          />
        </DocsStep>

        <DocsStep
          step={6}
          title="Load fonts"
          description="Inter (sans) and Geist Mono (mono) are the documented defaults."
        >
          <CodeBlock
            code={`// app/layout.tsx
import { Inter, Geist_Mono } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={\`\${inter.variable} \${geistMono.variable}\`}>
      <body>{children}</body>
    </html>
  )
}`}
          />
        </DocsStep>
      </DocsSection>

      <DocsSection id="dark-mode" title="Dark Mode">
        <p className="text-muted-foreground">
          Tokens switch automatically when the <code>.dark</code> class is
          present on <code>html</code> or any ancestor. Toggle it manually or
          use <code>next-themes</code> for persisted user preference.
        </p>
        <CodeBlock
          code={`// Manual toggle
document.documentElement.classList.toggle("dark")

// With next-themes
import { ThemeProvider } from "next-themes"

<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>`}
        />
      </DocsSection>

      <DocsSection id="providers" title="Providers">
        <p className="text-muted-foreground">
          Some primitives require a root-level provider. Add these to{" "}
          <code>app/layout.tsx</code> as you adopt each component.
        </p>
        <DocsTable headers={["Component", "Provider", "When needed"]}>
          <DocsTableRow>
            <DocsTableCell mono>Tooltip</DocsTableCell>
            <DocsTableCell mono>TooltipProvider</DocsTableCell>
            <DocsTableCell className="text-muted-foreground">
              Any page using tooltips
            </DocsTableCell>
          </DocsTableRow>
          <DocsTableRow>
            <DocsTableCell mono>Sonner</DocsTableCell>
            <DocsTableCell mono>Toaster</DocsTableCell>
            <DocsTableCell className="text-muted-foreground">
              Toast notifications
            </DocsTableCell>
          </DocsTableRow>
        </DocsTable>
      </DocsSection>

      <DocsSection id="verify" title="Verify">
        <p className="text-muted-foreground">
          Confirm your installation with this checklist before building screens.
        </p>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>Button renders with correct primary color and border radius</li>
          <li>Toggling <code>.dark</code> updates background and foreground</li>
          <li>
            <code>cn()</code> resolves conflicting Tailwind classes as expected
          </li>
          <li>Path alias <code>@/primitives/*</code> resolves without TypeScript errors</li>
        </ul>
      </DocsSection>

      <DocsSection id="faq" title="FAQ">
        <div className="space-y-6">
          {[
            {
              q: "Do I need to copy every primitive?",
              a: "No. Copy only what you use. Each file is independent aside from shared utils and tokens.",
            },
            {
              q: "Can I change the primary brand color?",
              a: "Yes. Update --primary and --primary-foreground in globals.css. All components pick up the change automatically.",
            },
            {
              q: "Does this work outside Next.js?",
              a: "Primitives are React components. They work in Vite, Remix, or any React 19 setup with Tailwind CSS v4 configured.",
            },
          ].map((item) => (
            <div key={item.q}>
              <h3 className="font-medium">{item.q}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>
      </DocsSection>
    </DocsPage>
  )
}
