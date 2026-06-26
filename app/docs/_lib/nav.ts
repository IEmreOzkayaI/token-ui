export type NavItem = {
  label: string
  href: string
}

export type NavSection = {
  title: string
  items: NavItem[]
}

export const docsNav: NavSection[] = [
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
    title: "Components",
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
    title: "Examples",
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
      { label: "Overview", href: "/docs/changelog" },
      { label: "v1.1.0", href: "/docs/changelog/v1.1.0" },
      { label: "v1.0.0", href: "/docs/changelog/v1.0.0" },
    ],
  },
]

export function getFlatNavItems(): NavItem[] {
  return docsNav.flatMap((section) => section.items)
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
