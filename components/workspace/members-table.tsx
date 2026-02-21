"use client";

import { useTransition } from "react";
import { WorkspaceRole } from "@prisma/client";
import { toast } from "sonner";

import { removeWorkspaceMember } from "@/actions/remove-workspace-member";
import { updateWorkspaceMemberRole } from "@/actions/update-workspace-member-role";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Member = {
  id: string;
  role: WorkspaceRole;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  };
};

interface MembersTableProps {
  workspaceId: string;
  members: Member[];
  currentUserId: string;
  currentUserRole: WorkspaceRole;
}

const roleColors: Record<WorkspaceRole, string> = {
  OWNER: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  ADMIN: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  AGENT: "bg-green-500/10 text-green-700 dark:text-green-400",
  VIEWER: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
};

export function MembersTable({
  workspaceId,
  members,
  currentUserId,
  currentUserRole,
}: MembersTableProps) {
  const [isPending, startTransition] = useTransition();

  const canManageRoles = currentUserRole === "OWNER";
  const canRemoveMembers =
    currentUserRole === "OWNER" || currentUserRole === "ADMIN";

  function handleRoleChange(memberId: string, newRole: WorkspaceRole) {
    startTransition(async () => {
      const result = await updateWorkspaceMemberRole(workspaceId, {
        memberId,
        role: newRole,
      });

      if (result.status === "error") {
        toast.error(result.message || "Failed to update role");
        return;
      }

      toast.success("Role updated successfully");
    });
  }

  function handleRemove(memberId: string) {
    startTransition(async () => {
      const result = await removeWorkspaceMember(workspaceId, memberId);

      if (result.status === "error") {
        toast.error(result.message || "Failed to remove member");
        return;
      }

      toast.success("Member removed");
    });
  }

  return (
    <div className="space-y-4">
      {members.map((member) => (
        <div
          key={member.id}
          className="flex items-center justify-between rounded-lg border p-4"
        >
          <div className="flex items-center gap-3">
            <Avatar className="size-9">
              <AvatarImage
                src={member.user.image ?? undefined}
                alt={member.user.name ?? ""}
              />
              <AvatarFallback>
                {member.user.name?.charAt(0).toUpperCase() ??
                  member.user.email?.charAt(0).toUpperCase() ??
                  "?"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">
                {member.user.name ?? "Unnamed"}
                {member.user.id === currentUserId && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    (you)
                  </span>
                )}
              </p>
              <p className="text-xs text-muted-foreground">
                {member.user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {canManageRoles && member.user.id !== currentUserId ? (
              <Select
                defaultValue={member.role}
                onValueChange={(value) =>
                  handleRoleChange(member.id, value as WorkspaceRole)
                }
                disabled={isPending}
              >
                <SelectTrigger className="h-8 w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={WorkspaceRole.OWNER}>Owner</SelectItem>
                  <SelectItem value={WorkspaceRole.ADMIN}>Admin</SelectItem>
                  <SelectItem value={WorkspaceRole.AGENT}>Agent</SelectItem>
                  <SelectItem value={WorkspaceRole.VIEWER}>Viewer</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Badge
                variant="secondary"
                className={roleColors[member.role]}
              >
                {member.role}
              </Badge>
            )}

            {canRemoveMembers && member.user.id !== currentUserId && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-destructive hover:text-destructive"
                onClick={() => handleRemove(member.id)}
                disabled={isPending}
              >
                Remove
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
