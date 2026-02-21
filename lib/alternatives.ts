export interface Alternative {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  pricing: string;
  weaknesses: string[];
  features: {
    name: string;
    competitor: string | boolean;
    guddesk: string | boolean;
  }[];
  switchReasons: {
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const alternatives: Alternative[] = [
  {
    slug: "intercom",
    name: "Intercom",
    tagline: "The open-source Intercom alternative",
    description:
      "Intercom is a powerful customer messaging platform, but its per-seat pricing and premium AI add-ons make it prohibitively expensive for most teams. GudDesk gives you the same live chat, inbox, and AI agent features — open source and completely free.",
    pricing: "Starts at $39/seat/month. AI features cost extra. Most teams pay $200-500+/month.",
    weaknesses: [
      "Per-seat pricing adds up fast as your team grows",
      "AI features (Fin) are a premium add-on at $0.99 per resolution",
      "No self-hosting option — your data lives on their servers",
      "Vendor lock-in makes migration difficult",
      "Complex pricing tiers with feature gates",
    ],
    features: [
      { name: "Live chat widget", competitor: true, guddesk: true },
      { name: "Shared inbox", competitor: true, guddesk: true },
      { name: "AI agents", competitor: "Paid add-on ($0.99/resolution)", guddesk: "Included" },
      { name: "Knowledge base", competitor: true, guddesk: true },
      { name: "Workflow automations", competitor: true, guddesk: true },
      { name: "Self-hosting", competitor: false, guddesk: true },
      { name: "Open source", competitor: false, guddesk: "GPL-3.0" },
      { name: "Free tier", competitor: "14-day trial", guddesk: "Free & open source" },
      { name: "Per-seat pricing", competitor: "$39-139/seat/mo", guddesk: "Free, no limits" },
      { name: "Plugin/API ecosystem", competitor: true, guddesk: true },
      { name: "Slack integration", competitor: true, guddesk: true },
      { name: "Email integration", competitor: true, guddesk: true },
    ],
    switchReasons: [
      {
        title: "Stop paying per seat",
        description:
          "Intercom charges $39-139 per agent per month. GudDesk is 100% free and open source with unlimited agents — no per-seat surprises, ever.",
      },
      {
        title: "AI agents included, not upsold",
        description:
          "Intercom charges $0.99 per AI resolution with Fin. GudDesk includes AI agents (GudBot, TriageBot, OnboardBot) out of the box — just bring your own API key.",
      },
      {
        title: "Own your data",
        description:
          "Self-host GudDesk on your own infrastructure. Your customer conversations never leave your servers. No vendor lock-in, ever.",
      },
      {
        title: "Open source transparency",
        description:
          "Every line of GudDesk code is open source under GPL-3.0. Audit it, extend it, or contribute back to the community.",
      },
    ],
    faqs: [
      {
        question: "Can GudDesk really replace Intercom?",
        answer:
          "For most teams, yes. GudDesk covers live chat, shared inbox, knowledge base, AI agents, and automations. If you rely on Intercom's product tours or advanced marketing features, those aren't available yet — but for customer support and messaging, GudDesk is a capable replacement.",
      },
      {
        question: "How do I migrate from Intercom to GudDesk?",
        answer:
          "You can export your Intercom conversations and customer data via their API or CSV export, then import them into GudDesk. We're also building a dedicated migration tool to make this easier.",
      },
      {
        question: "Is GudDesk really free?",
        answer:
          "Yes. GudDesk is 100% free and open source. No credit card required, no time-limited trial, no feature gates. Self-host on your own infrastructure with unlimited agents.",
      },
      {
        question: "What about Intercom's Fin AI?",
        answer:
          "GudDesk includes three built-in AI agents (GudBot, TriageBot, OnboardBot) that are free to use. They search your knowledge base and resolve conversations automatically. For advanced AI reasoning, bring your own Anthropic API key.",
      },
    ],
  },
  {
    slug: "zendesk",
    name: "Zendesk",
    tagline: "The open-source Zendesk alternative",
    description:
      "Zendesk is the enterprise standard for customer support, but its complexity and pricing make it overkill for most teams. GudDesk delivers the core features you actually need — live chat, shared inbox, AI agents — without the enterprise bloat or price tag.",
    pricing: "Starts at $55/agent/month (Suite Team). Enterprise plans run $115-150+/agent/month.",
    weaknesses: [
      "Expensive per-agent pricing even for basic features",
      "Complex setup and configuration — steep learning curve",
      "AI features locked behind premium plans",
      "Overwhelming UI with features most teams never use",
      "Long contract commitments for better pricing",
    ],
    features: [
      { name: "Live chat widget", competitor: true, guddesk: true },
      { name: "Shared inbox / ticketing", competitor: true, guddesk: true },
      { name: "AI agents", competitor: "Suite Professional+ ($115/agent/mo)", guddesk: "Included" },
      { name: "Knowledge base", competitor: true, guddesk: true },
      { name: "Workflow automations", competitor: true, guddesk: true },
      { name: "Self-hosting", competitor: false, guddesk: true },
      { name: "Open source", competitor: false, guddesk: "GPL-3.0" },
      { name: "Free tier", competitor: "14-day trial", guddesk: "Free & open source" },
      { name: "Setup time", competitor: "Days to weeks", guddesk: "5 minutes" },
      { name: "Plugin/API ecosystem", competitor: true, guddesk: true },
      { name: "Slack integration", competitor: true, guddesk: true },
      { name: "Email integration", competitor: true, guddesk: true },
    ],
    switchReasons: [
      {
        title: "Simplicity over complexity",
        description:
          "Zendesk has hundreds of features most teams never touch. GudDesk focuses on the essentials — live chat, inbox, KB, AI agents — and does them well without a steep learning curve.",
      },
      {
        title: "Get started in minutes, not weeks",
        description:
          "Zendesk implementations can take days or weeks. GudDesk takes 5 minutes to set up — just create an account and embed the chat widget.",
      },
      {
        title: "No enterprise tax",
        description:
          "Zendesk charges $55-150 per agent per month. GudDesk is completely free and open source with unlimited agents — no per-agent fees.",
      },
      {
        title: "Modern, AI-first architecture",
        description:
          "GudDesk was built from the ground up for AI agents. Zendesk bolted AI onto a 15-year-old ticketing system. The difference shows in how naturally AI fits into GudDesk workflows.",
      },
    ],
    faqs: [
      {
        question: "Can GudDesk handle the same ticket volume as Zendesk?",
        answer:
          "GudDesk is designed for small to mid-size teams. If you're processing tens of thousands of tickets daily with complex routing rules across dozens of departments, Zendesk's enterprise features may still be a better fit. For teams with up to a few thousand conversations per month, GudDesk handles volume with ease.",
      },
      {
        question: "Does GudDesk have a ticketing system?",
        answer:
          "GudDesk uses a conversation-based model rather than traditional tickets. Every customer interaction (chat, email, bot) is a conversation in your shared inbox. You can assign, tag, prioritize, and track resolution — it's ticketing without the ticket jargon.",
      },
      {
        question: "How do I migrate from Zendesk to GudDesk?",
        answer:
          "Export your Zendesk data using their API or admin tools. GudDesk can import customer profiles and conversation history. We're building a dedicated Zendesk migration tool to streamline this process.",
      },
      {
        question: "Is GudDesk secure enough for our team?",
        answer:
          "GudDesk is open source, so your security team can audit every line of code. Self-host it on your own infrastructure for complete data control. We use encryption in transit and at rest, and follow secure development practices.",
      },
    ],
  },
  {
    slug: "freshdesk",
    name: "Freshdesk",
    tagline: "The open-source Freshdesk alternative",
    description:
      "Freshdesk offers solid support tooling, but AI features and advanced automations are locked behind expensive plans. GudDesk gives you live chat, AI agents, and a modern shared inbox — completely free and open source, with everything included.",
    pricing: "Free tier available but limited. Paid plans start at $15/agent/month, AI features at $29+/agent/month.",
    weaknesses: [
      "Free tier is very limited (no automations, basic reporting)",
      "AI features require Pro plan ($49/agent/month) or higher",
      "Chat widget (Freshchat) is a separate product with separate pricing",
      "Per-agent pricing across multiple products adds up",
      "Dated UI compared to modern alternatives",
    ],
    features: [
      { name: "Live chat widget", competitor: "Separate product (Freshchat)", guddesk: "Included" },
      { name: "Shared inbox", competitor: true, guddesk: true },
      { name: "AI agents", competitor: "Pro plan+ ($49/agent/mo)", guddesk: "Included" },
      { name: "Knowledge base", competitor: true, guddesk: true },
      { name: "Workflow automations", competitor: "Growth plan+ ($15/agent/mo)", guddesk: "Included" },
      { name: "Self-hosting", competitor: false, guddesk: true },
      { name: "Open source", competitor: false, guddesk: "GPL-3.0" },
      { name: "Free tier", competitor: "Limited (10 agents, no automations)", guddesk: "Full features, unlimited" },
      { name: "Unified platform", competitor: "Multiple products", guddesk: "All-in-one" },
      { name: "Plugin/API ecosystem", competitor: true, guddesk: true },
      { name: "Slack integration", competitor: true, guddesk: true },
      { name: "Email integration", competitor: true, guddesk: true },
    ],
    switchReasons: [
      {
        title: "One platform, not three",
        description:
          "Freshworks splits support across Freshdesk, Freshchat, and Freshcaller. GudDesk unifies live chat, email, and bot conversations in a single open-source platform.",
      },
      {
        title: "Everything included, no upsells",
        description:
          "Freshdesk's free tier strips out automations, AI, and advanced reporting. GudDesk is fully open source with everything included — AI agents, automations, knowledge base — unlimited agents.",
      },
      {
        title: "AI that's actually accessible",
        description:
          "Freshdesk locks AI behind the Pro plan at $49/agent/month. GudDesk includes AI agents out of the box. Bring your own Anthropic API key for AI-powered features.",
      },
      {
        title: "Modern developer experience",
        description:
          "GudDesk is built with Next.js, TypeScript, and a Plugin API. If your team is technical, you'll appreciate the modern stack and the ability to extend the platform with custom code.",
      },
    ],
    faqs: [
      {
        question: "How does GudDesk compare to Freshdesk's free tier?",
        answer:
          "Absolutely. Freshdesk's free plan supports 10 agents but excludes automations, AI, and most advanced features. GudDesk is fully open source with unlimited agents and full access to all features including AI, automations, and the knowledge base.",
      },
      {
        question: "Do I need Freshchat too, or does GudDesk cover chat?",
        answer:
          "GudDesk includes live chat as a core feature. Unlike Freshworks, where chat is a separate product (Freshchat) with separate pricing, GudDesk bundles everything in one platform.",
      },
      {
        question: "How does GudDesk compare for larger teams?",
        answer:
          "GudDesk is ideal for small to mid-size teams. For enterprise teams with hundreds of agents and complex ITSM requirements, Freshdesk's enterprise features may be more appropriate. However, GudDesk's self-hosting option and open-source nature make it appealing for organizations that prioritize data control.",
      },
      {
        question: "Can I self-host GudDesk instead of using Freshdesk's cloud?",
        answer:
          "Absolutely. GudDesk is fully open source under GPL-3.0. Clone the repo, run Docker Compose, and you have a complete support platform on your own infrastructure. Freshdesk offers no self-hosting option.",
      },
    ],
  },
];

export function getAlternativeBySlug(slug: string): Alternative | undefined {
  return alternatives.find((alt) => alt.slug === slug);
}

export function getAllAlternativeSlugs(): string[] {
  return alternatives.map((alt) => alt.slug);
}
