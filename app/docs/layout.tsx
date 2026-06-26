"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { Search, Menu, X, ChevronRight, Code } from "lucide-react"
import { Input } from "@/primitives/input"
import { Button } from "@/primitives/button"
import { usePathname } from "next/navigation"

const navConfig = [
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
      { label: "Colors", href: "/docs/foundations/colors", icon: "🎨" },
      { label: "Typography", href: "/docs/foundations/typography", icon: "✍️" },
      { label: "Spacing", href: "/docs/foundations/spacing", icon: "📏" },
      { label: "Radius", href: "/docs/foundations/radius", icon: "⬜" },
      { label: "Shadows", href: "/docs/foundations/shadows", icon: "🌑" },
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
  {
    title: "Components (Examples)",
    items: [
      { label: "Button", href: "/docs/components/button" },
      { label: "Card", href: "/docs/components/card" },
      { label: "Dialog", href: "/docs/components/dialog" },
      { label: "Form", href: "/docs/components/form" },
      { label: "Navigation", href: "/docs/components/navigation" },
    ],
  },
  {
    title: "Changelog",
    items: [
      { label: "v1.0.0", href: "/docs/changelog/v1.0.0" },
      { label: "All Versions", href: "/docs/changelog" },
    ],
  },
]

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 overflow-y-auto border-r bg-background transition-transform duration-200 md:relative md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6 p-4 pt-6">
          {/* Logo */}
          <Link href="/docs" className="block text-2xl font-bold">
            UI Tokens
          </Link>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8 text-sm"
            />
          </div>

          {/* Navigation */}
          <nav className="space-y-6">
            {navConfig.map((section) => (
              <div key={section.title} className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                          onClick={() => onClose()}
                        >
                          {item.icon && <span>{item.icon}</span>}
                          {item.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}

export default function DocsLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex-1">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="flex items-center justify-between px-4 py-3 md:px-6">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden"
            >
              {mobileOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>

            <div className="flex-1" />

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Code className="size-4" />
                </a>
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="mx-auto max-w-4xl px-4 py-8 md:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}
