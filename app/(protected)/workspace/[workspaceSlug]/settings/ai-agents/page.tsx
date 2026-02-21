import { redirect } from "next/navigation";
import { Bot, Sparkles } from "lucide-react";

import { getCurrentUser } from "@/lib/session";
import { getWorkspaceBySlug, requireWorkspaceRole } from "@/lib/workspace";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = constructMetadata({
  title: "AI Agents – GudDesk",
  description: "Configure AI agents that automate your customer support.",
});

const agents = [
  {
    name: "GudBot",
    description:
      "First responder — answers questions using your knowledge base, resolves conversations, or escalates to a human.",
    trigger: "All new conversations",
    color: "bg-emerald-500",
  },
  {
    name: "TriageBot",
    description:
      "Routes conversations to the right team or agent based on topic, sentiment, and priority.",
    trigger: "Configurable rules",
    color: "bg-blue-500",
  },
  {
    name: "OnboardBot",
    description:
      "Guides new users through setup and activation with personalized onboarding flows.",
    trigger: "New user sign-up",
    color: "bg-purple-500",
  },
];

export default async function AIAgentsPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = await params;
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const workspace = await getWorkspaceBySlug(workspaceSlug);
  if (!workspace) redirect("/dashboard");

  await requireWorkspaceRole(workspace.id, user.id!, ["OWNER", "ADMIN"]);

  return (
    <>
      <DashboardHeader
        heading="AI Agents"
        text="Automated bots that handle conversations, triage issues, and onboard users."
      />

      <div className="space-y-6">
        {/* Coming Soon Banner */}
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-muted">
              <Sparkles className="size-7 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Coming Soon</h3>
              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                AI agents that autonomously read conversations, search your
                knowledge base, resolve tickets, and escalate to humans — all
                without writing a single line of code.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Agent Preview Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {agents.map((agent) => (
            <Card key={agent.name} className="relative overflow-hidden opacity-75">
              <div className={`absolute left-0 top-0 h-1 w-full ${agent.color}`} />
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-9 items-center justify-center rounded-lg ${agent.color} text-white`}
                  >
                    <Bot className="size-5" />
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2 text-base">
                      {agent.name}
                      <Badge variant="secondary" className="text-[10px]">
                        Coming Soon
                      </Badge>
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <CardDescription className="text-sm">
                  {agent.description}
                </CardDescription>
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium">Trigger:</span> {agent.trigger}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* What's already available */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Available Now: AI-Powered Features
            </CardTitle>
            <CardDescription>
              While full agents are coming soon, you can already use AI to
              assist your team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                AI reply suggestions for agents in the inbox
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Automatic conversation summarization
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Smart article suggestions from your knowledge base
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Conversation categorization and sentiment analysis
              </li>
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
                Set your{" "}
                <code className="rounded bg-muted px-1">ANTHROPIC_API_KEY</code>{" "}
                environment variable to enable AI-powered features.
              </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
