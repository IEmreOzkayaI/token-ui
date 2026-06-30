"use client"

import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { DocsCallout } from "@/app/docs/_components/docs-callout"
import { CodeBlock } from "@/app/docs/_components/code-block"
import * as LucideIcons from "lucide-react"
import { Code, Lightbulb, Ruler, Palette, Zap } from "lucide-react"

const toc = [
  { id: "overview", title: "Overview" },
  { id: "lucide-icons", title: "Lucide Icons Library" },
  { id: "sizing", title: "Icon Sizing" },
  { id: "coloring", title: "Icon Coloring" },
  { id: "usage", title: "Usage" },
]

// Common icon examples by category
const iconExamples = {
  navigation: ["ChevronDown", "ChevronUp", "Menu", "X", "ArrowLeft", "ArrowRight"],
  actions: ["Plus", "Trash2", "Edit", "Check", "Copy", "Download"],
  status: ["AlertCircle", "CheckCircle", "XCircle", "Info", "HelpCircle"],
  social: ["Heart", "MessageSquare", "Share2", "Bookmark", "Flag"],
  utility: ["Search", "Settings", "Bell", "Clock", "Calendar"],
}

export default function IconsPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Icons"
        description="Lucide React icon library for consistent, scalable iconography. 500+ icons with semantic sizing and color support."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-4">
          Token UI uses Lucide React for all icons. Over 500 stroke-based icons with consistent 24x24 viewBox, supporting semantic sizing and color tokens.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2 flex items-center gap-2">
              <Code className="size-4" /> Library
            </p>
            <code className="text-xs">lucide-react (v0.263+)</code>
          </div>
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2 flex items-center gap-2">
              <Lightbulb className="size-4" /> Icons
            </p>
            <p className="text-xs">500+ stroke-based icons</p>
          </div>
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2 flex items-center gap-2">
              <Ruler className="size-4" /> Base Size
            </p>
            <p className="text-xs">24x24px viewBox</p>
          </div>
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2 flex items-center gap-2">
              <Palette className="size-4" /> Format
            </p>
            <p className="text-xs">SVG, stroke-based</p>
          </div>
        </div>
      </DocsSection>

      <DocsSection id="lucide-icons" title="Lucide Icons Library">
        <p className="text-muted-foreground mb-6">
          Lucide provides a comprehensive set of beautiful, consistent icons. All icons follow a 2px stroke width and 24x24 viewBox for consistency.
        </p>
        <CodeBlock code={`/* Common Icon Categories */

Navigation Icons:
ChevronDown, ChevronUp, ChevronLeft, ChevronRight
Menu, X, ArrowLeft, ArrowRight, Home, Settings

Action Icons:
Plus, Minus, Trash2, Edit, Copy, Download, Upload
Check, Clock, Search, Eye, EyeOff

Status Icons:
AlertCircle, CheckCircle, XCircle, Info, HelpCircle
AlertTriangle, CheckCheck, Loader

Social Icons:
Heart, MessageSquare, Share2, Bookmark, Flag
Mail, Phone, MapPin

Utility Icons:
Settings, Bell, Calendar, Clock, Zap, Wifi
Volume2, Moon, Sun, Maximize2, Minimize2

/* Full icon list: https://lucide.dev */`} />
        <DocsCallout title="Lucide Documentation" variant="info">
          Browse all 500+ icons at lucide.dev. Copy icon names directly for use in your components.
        </DocsCallout>
      </DocsSection>

      <DocsSection id="sizing" title="Icon Sizing">
        <p className="text-muted-foreground mb-6">
          Scale icons using the size prop. Base size is 24px (1.5rem). All sizes maintain aspect ratio and visual weight.
        </p>
        <CodeBlock code={`import { ChevronDown, Star, AlertCircle } from "lucide-react"

/* Size Values (recommended) */
16px (xs):     <Star size={16} />
20px (sm):     <Star size={20} />
24px (base):   <Star size={24} />  /* Default */
28px (lg):     <Star size={28} />
32px (xl):     <Star size={32} />
40px (2xl):    <Star size={40} />
48px (3xl):    <Star size={48} />

/* Usage with Tailwind */
<Star className="w-4 h-4" />      {/* 16px */}
<Star className="w-5 h-5" />      {/* 20px */}
<Star className="w-6 h-6" />      {/* 24px (default) */}
<Star className="w-8 h-8" />      {/* 32px */}

/* Responsive sizing */
<Star className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />

/* Within buttons and inputs */
<button className="flex items-center gap-2">
  <ChevronDown size={20} />
  Menu
</button>`} />
      </DocsSection>

      <DocsSection id="coloring" title="Icon Coloring">
        <p className="text-muted-foreground mb-6">
          Control icon color using CSS class names or inline styles. Icons inherit text color by default.
        </p>
        <CodeBlock code={`import { AlertCircle, Check, Heart } from "lucide-react"

/* Semantic Colors (via CSS variables) */
<Check className="text-success" />                    {/* Green */}
<AlertCircle className="text-warning" />             {/* Orange */}
<AlertCircle className="text-destructive" />         {/* Red */}
<AlertCircle className="text-info" />                {/* Blue */}
<Heart className="text-primary" />                   {/* Primary blue */}

/* Tailwind Color Classes */
<Star className="text-foreground" />                 {/* Text color */}
<Star className="text-primary" />                    {/* Primary */}
<Star className="text-success" />                    {/* Success green */}
<Star className="text-destructive" />                {/* Error red */}
<Star className="text-yellow-500" />                 {/* Yellow */}

/* With Opacity */
<Star className="text-foreground/70" />              {/* 70% opacity */}
<Star className="text-primary/50" />                 {/* 50% opacity */}

/* Responsive Colors */
<Star className="text-foreground sm:text-primary lg:text-success" />

/* Active/Hover States */
<button className="text-muted-foreground hover:text-primary transition-colors">
  <Star size={24} />
</button>`} />
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <p className="text-muted-foreground mb-6">
          Import icons from lucide-react and apply styling directly.
        </p>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">1. Basic Import & Usage</h4>
            <CodeBlock code={`import { Star, Heart, Settings, AlertCircle } from "lucide-react"

// Standalone icon
<Star />

// With size
<Star size={32} />

// With color
<Heart className="text-primary" />

// With custom styling
<Settings size={24} className="text-muted-foreground hover:text-foreground transition-colors" />`} />
          </div>

          <div>
            <h4 className="font-semibold mb-3">2. In Components</h4>
            <CodeBlock code={`import { ChevronDown, Copy, Trash2 } from "lucide-react"

// Button with icon
<button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors">
  <ChevronDown size={20} />
  <span>Dropdown</span>
</button>

// Icon-only button
<button className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
  <Copy size={20} aria-label="Copy" />
</button>

// List with icons
<ul className="space-y-2">
  <li className="flex items-center gap-3">
    <Settings className="text-primary" size={20} />
    <span>Settings</span>
  </li>
</ul>`} />
          </div>

          <div>
            <h4 className="font-semibold mb-3">3. Status Icons</h4>
            <CodeBlock code={`import { CheckCircle, AlertCircle, XCircle, Info } from "lucide-react"

// Success state
<div className="flex items-center gap-2 text-success">
  <CheckCircle size={24} />
  <span>Success message</span>
</div>

// Warning state
<div className="flex items-center gap-2 text-warning">
  <AlertCircle size={24} />
  <span>Warning message</span>
</div>

// Error state
<div className="flex items-center gap-2 text-destructive">
  <XCircle size={24} />
  <span>Error message</span>
</div>

// Info state
<div className="flex items-center gap-2 text-info">
  <Info size={24} />
  <span>Information</span>
</div>`} />
          </div>

          <DocsCallout title="Best Practices" variant="tip">
            <ul className="space-y-1 text-sm">
              <li>• Import only icons you use (tree-shaking friendly)</li>
              <li>• Use consistent sizes for related icons</li>
              <li>• Apply semantic colors for status/intent icons</li>
              <li>• Add aria-label to icon-only buttons for accessibility</li>
              <li>• Use stroke-width prop sparingly (default 2px is optimal)</li>
              <li>• Align icons with text using flexbox and gap</li>
            </ul>
          </DocsCallout>
        </div>
      </DocsSection>
    </DocsPage>
  )
}
