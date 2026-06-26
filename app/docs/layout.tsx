import { ReactNode } from "react"
import Link from "next/link"
import { Search, Menu } from "lucide-react"
import { Input } from "@/components/primitives/input"
import { Button } from "@/components/primitives/button"

const docs = [
  {
    title: "Getting Started",
    items: [
      { label: "Introduction", href: "/docs" },
      { label: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "Foundations",
    items: [
      { label: "Colors", href: "/docs/foundations/colors" },
      { label: "Typography", href: "/docs/foundations/typography" },
      { label: "Spacing", href: "/docs/foundations/spacing" },
      { label: "Radius", href: "/docs/foundations/radius" },
      { label: "Shadows", href: "/docs/foundations/shadows" },
    ],
  },
  {
    title: "Primitives (55)",
    items: [
      { label: "Accordion", href: "/docs/primitives/accordion" },
      { label: "Alert", href: "/docs/primitives/alert" },
      { label: "Alert Dialog", href: "/docs/primitives/alert-dialog" },
      { label: "Aspect Ratio", href: "/docs/primitives/aspect-ratio" },
      { label: "Avatar", href: "/docs/primitives/avatar" },
      { label: "Badge", href: "/docs/primitives/badge" },
      { label: "Breadcrumb", href: "/docs/primitives/breadcrumb" },
      { label: "Button", href: "/docs/primitives/button" },
      { label: "Button Group", href: "/docs/primitives/button-group" },
      { label: "Calendar", href: "/docs/primitives/calendar" },
      { label: "Card", href: "/docs/primitives/card" },
      { label: "Carousel", href: "/docs/primitives/carousel" },
      { label: "Chart", href: "/docs/primitives/chart" },
      { label: "Checkbox", href: "/docs/primitives/checkbox" },
      { label: "Collapsible", href: "/docs/primitives/collapsible" },
      { label: "Combobox", href: "/docs/primitives/combobox" },
      { label: "Command", href: "/docs/primitives/command" },
      { label: "Context Menu", href: "/docs/primitives/context-menu" },
      { label: "Dialog", href: "/docs/primitives/dialog" },
      { label: "Direction", href: "/docs/primitives/direction" },
      { label: "Drawer", href: "/docs/primitives/drawer" },
      { label: "Dropdown Menu", href: "/docs/primitives/dropdown-menu" },
      { label: "Empty", href: "/docs/primitives/empty" },
      { label: "Field", href: "/docs/primitives/field" },
      { label: "Hover Card", href: "/docs/primitives/hover-card" },
      { label: "Input", href: "/docs/primitives/input" },
      { label: "Input Group", href: "/docs/primitives/input-group" },
      { label: "Input OTP", href: "/docs/primitives/input-otp" },
      { label: "Item", href: "/docs/primitives/item" },
      { label: "Kbd", href: "/docs/primitives/kbd" },
      { label: "Label", href: "/docs/primitives/label" },
      { label: "Menubar", href: "/docs/primitives/menubar" },
      { label: "Native Select", href: "/docs/primitives/native-select" },
      { label: "Navigation Menu", href: "/docs/primitives/navigation-menu" },
      { label: "Pagination", href: "/docs/primitives/pagination" },
      { label: "Popover", href: "/docs/primitives/popover" },
      { label: "Progress", href: "/docs/primitives/progress" },
      { label: "Radio Group", href: "/docs/primitives/radio-group" },
      { label: "Resizable", href: "/docs/primitives/resizable" },
      { label: "Scroll Area", href: "/docs/primitives/scroll-area" },
      { label: "Select", href: "/docs/primitives/select" },
      { label: "Separator", href: "/docs/primitives/separator" },
      { label: "Sheet", href: "/docs/primitives/sheet" },
      { label: "Sidebar", href: "/docs/primitives/sidebar" },
      { label: "Skeleton", href: "/docs/primitives/skeleton" },
      { label: "Slider", href: "/docs/primitives/slider" },
      { label: "Sonner", href: "/docs/primitives/sonner" },
      { label: "Spinner", href: "/docs/primitives/spinner" },
      { label: "Switch", href: "/docs/primitives/switch" },
      { label: "Table", href: "/docs/primitives/table" },
      { label: "Tabs", href: "/docs/primitives/tabs" },
      { label: "Textarea", href: "/docs/primitives/textarea" },
      { label: "Toggle", href: "/docs/primitives/toggle" },
      { label: "Toggle Group", href: "/docs/primitives/toggle-group" },
      { label: "Tooltip", href: "/docs/primitives/tooltip" },
    ],
  },
]

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col border-r border-border overflow-y-auto">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link href="/docs" className="font-bold text-lg">
            Design System
          </Link>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9 h-9" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          {docs.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-3 px-2">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-14 border-b border-border bg-card flex items-center px-6 gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="size-5" />
          </Button>
          <div className="flex-1" />
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 py-8 lg:py-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
