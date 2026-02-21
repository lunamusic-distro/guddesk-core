"use client";

import { createContext, useContext } from "react";

interface WorkspaceContextValue {
  workspaceSlug: string;
  workspaceRole: string; // OWNER | ADMIN | AGENT | VIEWER
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({
  children,
  workspaceSlug,
  workspaceRole,
}: {
  children: React.ReactNode;
  workspaceSlug: string;
  workspaceRole: string;
}) {
  return (
    <WorkspaceContext.Provider value={{ workspaceSlug, workspaceRole }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspaceContext() {
  return useContext(WorkspaceContext);
}
