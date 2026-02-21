import type { UserRole, WorkspaceRole } from "@prisma/client";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

export type ExtendedUser = User & {
  role: UserRole;
  activeWorkspaceId: string | null;
  activeWorkspaceRole: WorkspaceRole | null;
  activeWorkspaceSlug: string | null;
};

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
    activeWorkspaceId: string | null;
    activeWorkspaceRole: WorkspaceRole | null;
    activeWorkspaceSlug: string | null;
  }
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
