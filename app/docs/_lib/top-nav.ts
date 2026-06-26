export type TopNavLink = {
  label: string
  href: string
  isActive: (pathname: string) => boolean
}

export const docsTopNav: TopNavLink[] = [
  {
    label: "Docs",
    href: "/docs",
    isActive: (pathname) =>
      pathname === "/docs" || pathname === "/docs/installation",
  },
  {
    label: "Components",
    href: "/docs/ui/components/accordion",
    isActive: (pathname) => pathname.startsWith("/docs/ui/components"),
  },
  {
    label: "Foundations",
    href: "/docs/foundations/colors",
    isActive: (pathname) => pathname.startsWith("/docs/foundations"),
  },
  {
    label: "Prompts",
    href: "/docs/prompts",
    isActive: (pathname) => pathname.startsWith("/docs/prompts"),
  },
  {
    label: "Changelog",
    href: "/docs/changelog",
    isActive: (pathname) => pathname.startsWith("/docs/changelog"),
  },
]
