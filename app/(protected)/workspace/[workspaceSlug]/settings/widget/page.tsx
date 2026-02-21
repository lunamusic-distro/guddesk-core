import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { getWorkspaceBySlug, requireWorkspaceRole } from "@/lib/workspace";
import { prisma } from "@/lib/db";
import { env } from "@/env.mjs";
import { DashboardHeader } from "@/components/dashboard/header";
import { WidgetConfigurator } from "@/components/widget-preview/widget-configurator";

export default async function WidgetSettingsPage({
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

  const widgetSettings = await prisma.widgetSettings.findUnique({
    where: { workspaceId: workspace.id },
  });

  const appUrl = env.NEXT_PUBLIC_APP_URL;

  return (
    <>
      <DashboardHeader
        heading="Chat Widget"
        text="Configure and install the chat widget on your website."
      />

      <div className="space-y-8">
        {/* Install snippet */}
        <div className="rounded-lg border p-6">
          <h3 className="mb-2 text-sm font-medium">Installation</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Add this snippet to your website, just before the closing{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              &lt;/body&gt;
            </code>{" "}
            tag.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
            <code>{`<script>
  window.GudDeskSettings = {
    appId: "gd_pub_${workspace.appId}"
  };
</script>
<script src="${appUrl}/widget.js" async></script>`}</code>
          </pre>
        </div>

        {/* Widget configurator */}
        <WidgetConfigurator
          workspaceId={workspace.id}
          settings={{
            primaryColor: widgetSettings?.primaryColor ?? "#3ECF8E",
            position: (widgetSettings?.position as "bottom-right" | "bottom-left") ?? "bottom-right",
            welcomeMessage:
              widgetSettings?.welcomeMessage ?? "Hi! How can we help you?",
            workspaceName: widgetSettings?.workspaceName ?? workspace.name,
            showBranding: widgetSettings?.showBranding ?? true,
            requireEmail: widgetSettings?.requireEmail ?? false,
            offlineFormTimeout: widgetSettings?.offlineFormTimeout ?? null,
            pageVisibilityMode:
              (widgetSettings?.pageVisibilityMode as "exclude" | "include") ??
              "exclude",
            pageVisibilityPatterns:
              (widgetSettings?.pageVisibilityPatterns as string[]) ?? [],
          }}
        />
      </div>
    </>
  );
}
