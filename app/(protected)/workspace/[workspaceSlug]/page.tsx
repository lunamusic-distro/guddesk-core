import { redirect } from "next/navigation";

// Workspace root redirects to inbox
export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = await params;
  redirect(`/workspace/${workspaceSlug}/inbox`);
}
