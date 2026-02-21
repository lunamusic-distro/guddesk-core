import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

const agentExamples = [
  {
    name: "GudBot",
    desc: "AI support agent that resolves L1 tickets autonomously — answers FAQs, suggests articles, and escalates when stuck.",
    tags: ["Auto-reply", "KB Search", "Escalation"],
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  {
    name: "TriageBot",
    desc: "Routes conversations by intent. Detects billing, bugs, or feature requests and assigns to the right team instantly.",
    tags: ["Categorize", "Auto-assign", "Tag"],
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  },
  {
    name: "OnboardBot",
    desc: "Greets new visitors, collects context, and walks them through setup — like a concierge in your widget.",
    tags: ["Welcome flow", "Data capture", "Guided setup"],
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  },
];

const pluginCapabilities = [
  {
    icon: Icons.messageCircle,
    title: "Conversational",
    desc: "Agents read messages and reply as BOT — indistinguishable from human agents to the visitor.",
  },
  {
    icon: Icons.automations,
    title: "Event-Driven",
    desc: "Hook into conversation events: created, message received, tag added, closed. React in real-time.",
  },
  {
    icon: Icons.code,
    title: "API-First",
    desc: "Full REST API for conversations, visitors, articles, and messages. Build agents in any language.",
  },
  {
    icon: Icons.sparkles,
    title: "AI-Native",
    desc: "Built-in Claude integration for NLU, sentiment analysis, summarization, and article suggestions.",
  },
];

export default function AgentsShowcase() {
  return (
    <section id="agents" className="py-16 sm:py-20 lg:py-24">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center text-center">
          <div className="text-gradient_brand mb-4 font-semibold">
            Agent-ready platform
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-[40px]">
            Plug in AI agents. Automate support.
          </h2>
          <p className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
            GudDesk is built for the agent era. Connect your own AI bots,
            deploy pre-built agents, or build custom plugins that read, reply,
            and resolve conversations autonomously.
          </p>
        </div>

        {/* Agent architecture diagram */}
        <div className="mx-auto mt-12 max-w-3xl">
          <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
            {/* Header bar */}
            <div className="flex items-center gap-3 border-b bg-muted/30 px-5 py-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10">
                <Icons.sparkles className="size-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <div className="text-sm font-semibold">Agent Pipeline</div>
                <div className="text-[11px] text-muted-foreground">
                  Event → Agent → Action
                </div>
              </div>
            </div>

            {/* Flow */}
            <div className="flex flex-col items-center gap-0 p-6 sm:flex-row sm:gap-0">
              {/* Trigger */}
              <div className="flex w-full flex-col items-center rounded-lg border bg-muted/20 p-4 sm:flex-1">
                <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40">
                  <Icons.automations className="size-5 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Event
                </span>
                <span className="mt-1 text-center text-xs font-medium">
                  Message received
                </span>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center py-2 text-muted-foreground/40 sm:px-2 sm:py-0">
                <Icons.arrowRight className="hidden size-5 sm:block" />
                <svg
                  className="size-5 rotate-90 sm:hidden"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>

              {/* Agent */}
              <div className="flex w-full flex-col items-center rounded-lg border-2 border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950/20 sm:flex-1">
                <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-emerald-500">
                  <Icons.sparkles className="size-5 text-white" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  AI Agent
                </span>
                <span className="mt-1 text-center text-xs font-medium">
                  GudBot processes
                </span>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center py-2 text-muted-foreground/40 sm:px-2 sm:py-0">
                <Icons.arrowRight className="hidden size-5 sm:block" />
                <svg
                  className="size-5 rotate-90 sm:hidden"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>

              {/* Actions */}
              <div className="flex w-full flex-col items-center rounded-lg border bg-muted/20 p-4 sm:flex-1">
                <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40">
                  <Icons.check className="size-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Actions
                </span>
                <span className="mt-1 text-center text-xs font-medium">
                  Reply, tag, resolve
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Agent examples */}
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {agentExamples.map((agent) => (
            <div
              key={agent.name}
              className="group rounded-lg border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-2.5">
                <div
                  className={cn(
                    "flex size-8 items-center justify-center rounded-md text-xs font-bold",
                    agent.color,
                  )}
                >
                  <Icons.sparkles className="size-4" />
                </div>
                <h4 className="font-heading text-base">{agent.name}</h4>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {agent.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {agent.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[10px]">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Plugin capabilities */}
        <div className="mt-14">
          <h3 className="mb-6 text-center font-heading text-xl">
            Build your own or plug in existing agents
          </h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pluginCapabilities.map((cap) => (
              <div key={cap.title} className="text-center">
                <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-lg bg-muted">
                  <cap.icon className="size-5" />
                </div>
                <h4 className="mb-1 font-heading text-sm">{cap.title}</h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center gap-3">
          <Link
            href="/docs"
            className={cn(
              buttonVariants({ rounded: "xl", size: "lg" }),
              "gap-2",
            )}
          >
            View Agent Docs
            <Icons.arrowRight className="size-4" />
          </Link>
          <Link
            href="/register"
            className={cn(
              buttonVariants({ variant: "outline", rounded: "xl", size: "lg" }),
            )}
          >
            Try It Free
          </Link>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
