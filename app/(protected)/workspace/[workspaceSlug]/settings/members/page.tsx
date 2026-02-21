import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import {
  getWorkspaceBySlug,
  getWorkspaceInvitations,
  getWorkspaceMembers,
  requireWorkspaceRole,
} from "@/lib/workspace";
import { DashboardHeader } from "@/components/dashboard/header";
import { InviteMemberForm } from "@/components/workspace/invite-member-form";
import { MembersTable } from "@/components/workspace/members-table";

export default async function WorkspaceMembersPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = await params;
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const workspace = await getWorkspaceBySlug(workspaceSlug);
  if (!workspace) redirect("/dashboard");

  const membership = await requireWorkspaceRole(workspace.id, user.id!, [
    "OWNER",
    "ADMIN",
  ]);
  const members = await getWorkspaceMembers(workspace.id);
  const invitations = await getWorkspaceInvitations(workspace.id);

  return (
    <>
      <DashboardHeader
        heading="Workspace Members"
        text="Manage your workspace members and send invitations."
      />

      <div className="space-y-8">
        {/* Invite form */}
        <div className="rounded-lg border p-6">
          <h3 className="mb-4 text-sm font-medium">Invite a new member</h3>
          <InviteMemberForm workspaceId={workspace.id} />
        </div>

        {/* Members list */}
        <div>
          <h3 className="mb-4 text-sm font-medium">
            Members ({members.length})
          </h3>
          <MembersTable
            workspaceId={workspace.id}
            members={members}
            currentUserId={user.id!}
            currentUserRole={membership.role}
          />
        </div>

        {/* Pending invitations */}
        {invitations.length > 0 && (
          <div>
            <h3 className="mb-4 text-sm font-medium">
              Pending Invitations ({invitations.length})
            </h3>
            <div className="space-y-2">
              {invitations.map((inv) => (
                <div
                  key={inv.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="text-sm font-medium">{inv.email}</p>
                    <p className="text-xs text-muted-foreground">
                      Invited as {inv.role} by{" "}
                      {inv.invitedBy.name ?? inv.invitedBy.email}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Expires{" "}
                    {inv.expiresAt.toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
