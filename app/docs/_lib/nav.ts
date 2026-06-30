import { blockDocsToNavItems } from "@/app/docs/_lib/block-subcomponents"

export type NavItem = {
  label: string
  href: string
  items?: NavItem[]
}

export type NavSection = {
  title: string
  href?: string
  items: NavItem[]
}

export const docsNav: NavSection[] = [
  {
    title: "Getting Started",
    href: "/docs",
    items: [
      { label: "Introduction", href: "/docs" },
      { label: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "Foundations",
    href: "/docs/foundations",
    items: [
      { label: "Overview", href: "/docs/foundations" },
      { label: "Colors", href: "/docs/foundations/colors" },
      { label: "Typography", href: "/docs/foundations/typography" },
      { label: "Spacing", href: "/docs/foundations/spacing" },
      { label: "Shadows", href: "/docs/foundations/shadows" },
      { label: "Radius", href: "/docs/foundations/radius" },
      { label: "Icons", href: "/docs/foundations/icons" },
    ],
  },
  {
    title: "Components",
    href: "/docs/ui/components/accordion",
    items: [
      { label: "Accordion", href: "/docs/ui/components/accordion" },
      { label: "Alert", href: "/docs/ui/components/alert" },
      { label: "Alert Dialog", href: "/docs/ui/components/alert-dialog" },
      { label: "Aspect Ratio", href: "/docs/ui/components/aspect-ratio" },
      { label: "Avatar", href: "/docs/ui/components/avatar" },
      { label: "Badge", href: "/docs/ui/components/badge" },
      { label: "Breadcrumb", href: "/docs/ui/components/breadcrumb" },
      { label: "Button", href: "/docs/ui/components/button" },
      { label: "Button Group", href: "/docs/ui/components/button-group" },
      { label: "Calendar", href: "/docs/ui/components/calendar" },
      { label: "Card", href: "/docs/ui/components/card" },
      { label: "Carousel", href: "/docs/ui/components/carousel" },
      { label: "Chart", href: "/docs/ui/components/chart" },
      { label: "Checkbox", href: "/docs/ui/components/checkbox" },
      { label: "Collapsible", href: "/docs/ui/components/collapsible" },
      { label: "Combobox", href: "/docs/ui/components/combobox" },
      { label: "Command", href: "/docs/ui/components/command" },
      { label: "Context Menu", href: "/docs/ui/components/context-menu" },
      { label: "DataTable", href: "/docs/ui/components/datatable" },
      { label: "Dialog", href: "/docs/ui/components/dialog" },
      { label: "Direction", href: "/docs/ui/components/direction" },
      { label: "Drawer", href: "/docs/ui/components/drawer" },
      { label: "Dropdown Menu", href: "/docs/ui/components/dropdown-menu" },
      { label: "Empty", href: "/docs/ui/components/empty" },
      { label: "Field", href: "/docs/ui/components/field" },
      { label: "Hover Card", href: "/docs/ui/components/hover-card" },
      { label: "Input", href: "/docs/ui/components/input" },
      { label: "Input Group", href: "/docs/ui/components/input-group" },
      { label: "Input OTP", href: "/docs/ui/components/input-otp" },
      { label: "Item", href: "/docs/ui/components/item" },
      { label: "Kbd", href: "/docs/ui/components/kbd" },
      { label: "Label", href: "/docs/ui/components/label" },
      { label: "List", href: "/docs/ui/components/list" },
      { label: "Menubar", href: "/docs/ui/components/menubar" },
      { label: "Message", href: "/docs/ui/components/message" },
      { label: "Native Select", href: "/docs/ui/components/native-select" },
      { label: "Navigation Menu", href: "/docs/ui/components/navigation-menu" },
      { label: "Pagination", href: "/docs/ui/components/pagination" },
      { label: "Popover", href: "/docs/ui/components/popover" },
      { label: "Progress", href: "/docs/ui/components/progress" },
      { label: "Radio Group", href: "/docs/ui/components/radio-group" },
      { label: "Resizable", href: "/docs/ui/components/resizable" },
      { label: "Scroll Area", href: "/docs/ui/components/scroll-area" },
      { label: "Select", href: "/docs/ui/components/select" },
      { label: "Separator", href: "/docs/ui/components/separator" },
      { label: "Sheet", href: "/docs/ui/components/sheet" },
      { label: "Sidebar", href: "/docs/ui/components/sidebar" },
      { label: "Skeleton", href: "/docs/ui/components/skeleton" },
      { label: "Slider", href: "/docs/ui/components/slider" },
      { label: "Sonner", href: "/docs/ui/components/sonner" },
      { label: "Spinner", href: "/docs/ui/components/spinner" },
      { label: "Stat Card", href: "/docs/ui/components/stat-card" },
      { label: "Switch", href: "/docs/ui/components/switch" },
      { label: "Table", href: "/docs/ui/components/table" },
      { label: "Tabs", href: "/docs/ui/components/tabs" },
      { label: "Textarea", href: "/docs/ui/components/textarea" },
      { label: "Toggle", href: "/docs/ui/components/toggle" },
      { label: "Toggle Group", href: "/docs/ui/components/toggle-group" },
      { label: "Tooltip", href: "/docs/ui/components/tooltip" },
    ],
  },
  {
    title: "Blocks",
    href: "/docs/ui/blocks",
    items: [
      { label: "Overview", href: "/docs/ui/blocks" },
      ...blockDocsToNavItems(),
      { label: "Admin Dashboard", href: "/docs/ui/blocks/admin-dashboard" },
      { label: "Admin Dashboard V2", href: "/docs/ui/blocks/admin-dashboard-v2" },
      { label: "Admin Dashboard V3", href: "/docs/ui/blocks/admin-dashboard-v3" },
    ],
  },
  {
    title: "Prompts",
    href: "/docs/prompts",
    items: [
      { label: "Overview", href: "/docs/prompts" },
      {
        label: "Building", href: "#building", items: [
          { label: "Create Primitive", href: "/docs/prompts/new-primitive" },
          { label: "Extend Primitive", href: "/docs/prompts/enhance-primitive" },
          { label: "Compose Component", href: "/docs/prompts/new-component" },
          { label: "Custom Build", href: "/docs/prompts/from-scratch" },
          { label: "Build Screen", href: "/docs/prompts/build-screen" },
        ]
      },
      {
        label: "Extending", href: "#extending", items: [
          { label: "Add Variant", href: "/docs/prompts/derive-variant" },
          { label: "Targeted Edit", href: "/docs/prompts/modify-existing" },
          { label: "Add Doc Demo", href: "/docs/prompts/demo-generation" },
        ]
      },
      {
        label: "Quality & Maintenance", href: "#quality", items: [
          { label: "Refactor", href: "/docs/prompts/refactor" },
          { label: "Migration", href: "/docs/prompts/migration" },
          { label: "Design System Audit", href: "/docs/prompts/design-system-audit" },
          { label: "Token Compliance", href: "/docs/prompts/token-compliance" },
          { label: "Accessibility Review", href: "/docs/prompts/accessibility" },
        ]
      },
      {
        label: "Documentation", href: "/docs/prompts/documentation", items: [
          { label: "Documentation", href: "/docs/prompts/documentation" },
        ]
      },
    ],
  },
  {
    title: "Changelog",
    href: "/docs/changelog",
    items: [
      { label: "Overview", href: "/docs/changelog" },
      { label: "v1.1.0", href: "/docs/changelog/v1.1.0" },
      { label: "v1.0.0", href: "/docs/changelog/v1.0.0" },
    ],
  },
]

export function getFlatNavItems(): NavItem[] {
  return docsNav.flatMap((section) => section.items)
}

export type SearchItem = NavItem & {
  section: string
}

export function getSearchItems(): SearchItem[] {
  return docsNav.flatMap((section) =>
    section.items.map((item) => ({
      ...item,
      section: section.title,
    }))
  )
}

export function getDocsPager(pathname: string) {
  const items = getFlatNavItems()
  const index = items.findIndex((item) => item.href === pathname)

  if (index === -1) {
    return { prev: null, next: null }
  }

  return {
    prev: index > 0 ? items[index - 1] : null,
    next: index < items.length - 1 ? items[index + 1] : null,
  }
}
