import { SidebarNavItem } from "types";

export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "MENU",
    items: [
      { href: "/dashboard", icon: "dashboard", title: "Dashboard" },
      { href: "/dashboard/charts", icon: "analytics", title: "Analytics" },
    ],
  },
  {
    title: "OPTIONS",
    items: [
      { href: "/dashboard/settings", icon: "settings", title: "Settings" },
      { href: "/", icon: "home", title: "Homepage" },
      { href: "/docs", icon: "bookOpen", title: "Documentation" },
    ],
  },
];

// Workspace-scoped sidebar links (used in /workspace/[slug]/ layout)
// Href uses [slug] as placeholder — replaced at render time
export const workspaceSidebarLinks: SidebarNavItem[] = [
  {
    title: "CONVERSATIONS",
    items: [
      {
        href: "/workspace/[slug]/inbox",
        icon: "inbox",
        title: "Inbox",
      },
    ],
  },
  {
    title: "CONTENT",
    items: [
      {
        href: "/workspace/[slug]/articles",
        icon: "bookOpen",
        title: "Knowledge Base",
      },
    ],
  },
  {
    title: "INSIGHTS",
    items: [
      {
        href: "/workspace/[slug]/analytics",
        icon: "analytics",
        title: "Analytics",
      },
      {
        href: "/workspace/[slug]/automations",
        icon: "automations",
        title: "Automations",
        authorizeOnly: "ADMIN",
      },
    ],
  },
  {
    title: "WORKSPACE",
    items: [
      {
        href: "/workspace/[slug]/settings",
        icon: "settings",
        title: "Workspace Settings",
        authorizeOnly: "OWNER",
      },
      {
        href: "/workspace/[slug]/settings/members",
        icon: "users",
        title: "Members",
        authorizeOnly: "ADMIN",
      },
      {
        href: "/workspace/[slug]/settings/widget",
        icon: "code",
        title: "Chat Widget",
        authorizeOnly: "ADMIN",
      },
      {
        href: "/workspace/[slug]/settings/help-center",
        icon: "bookOpen",
        title: "Help Center",
        authorizeOnly: "ADMIN",
      },
      {
        href: "/workspace/[slug]/settings/ai-agents",
        icon: "bot",
        title: "AI Agents",
        authorizeOnly: "ADMIN",
      },
      {
        href: "/workspace/[slug]/settings/integrations",
        icon: "integrations",
        title: "Integrations",
        authorizeOnly: "ADMIN",
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      { href: "/dashboard/settings", icon: "user", title: "My Account" },
      { href: "/", icon: "home", title: "Homepage" },
    ],
  },
];
