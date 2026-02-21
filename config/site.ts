import { SidebarNavItem, SiteConfig } from "types";
import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "GudDesk",
  description:
    "Open-source customer messaging platform. Live chat, shared inbox, knowledge base, and AI-powered support — all in one place.",
  url: site_url,
  ogImage: `${site_url}/_static/og.jpg`,
  links: {
    twitter: "https://twitter.com/guddesk",
    github: "https://github.com/gudlab/guddesk-core",
  },
  mailSupport: "support@guddesk.com",
};

export const footerLinks: SidebarNavItem[] = [
  {
    title: "Product",
    items: [
      { title: "Features", href: "/#features" },
      { title: "Integrations", href: "/integrations" },
      { title: "Documentation", href: "/docs" },
      { title: "GitHub", href: "https://github.com/gudlab/guddesk-core" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Blog", href: "/blog" },
      { title: "Help Center", href: "/help" },
      { title: "Alternatives", href: "/alternatives/intercom" },
      { title: "Self-Hosting Guide", href: "/docs/self-hosting" },
    ],
  },
  {
    title: "Company",
    items: [
      { title: "Terms", href: "/terms" },
      { title: "Privacy", href: "/privacy" },
    ],
  },
];
