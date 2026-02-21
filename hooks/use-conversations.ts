"use client";

import { useState, useEffect, useCallback } from "react";
import { usePusher } from "./use-pusher";

export interface ConversationListItem {
  id: string;
  status: "OPEN" | "SNOOZED" | "CLOSED";
  lastMessageAt: string | null;
  lastMessagePreview: string | null;
  tags: string[];
  assigneeId: string | null;
  visitor: {
    id: string;
    name: string | null;
    email: string | null;
    avatarUrl: string | null;
  };
  assignee: {
    id: string;
    user: { name: string | null; image: string | null };
  } | null;
  _count: { messages: number };
}

interface UseConversationsOptions {
  workspaceId: string;
  status?: "OPEN" | "SNOOZED" | "CLOSED";
  assigneeId?: string;
}

export function useConversations({
  workspaceId,
  status = "OPEN",
  assigneeId,
}: UseConversationsOptions) {
  const [conversations, setConversations] = useState<ConversationListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchConversations = useCallback(async () => {
    try {
      const params = new URLSearchParams({ workspaceId, status });
      if (assigneeId) params.set("assigneeId", assigneeId);

      const res = await fetch(`/api/inbox/conversations?${params}`);
      if (res.ok) {
        const data = await res.json();
        setConversations(data.conversations);
      }
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    } finally {
      setIsLoading(false);
    }
  }, [workspaceId, status, assigneeId]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // Real-time updates
  usePusher(`private-workspace-${workspaceId}`, "conversation:created", () => {
    fetchConversations();
  });

  usePusher(`private-workspace-${workspaceId}`, "conversation:updated", () => {
    fetchConversations();
  });

  usePusher(`private-workspace-${workspaceId}`, "conversation:new-message", () => {
    fetchConversations();
  });

  usePusher(`private-workspace-${workspaceId}`, "conversations:bulk-updated", () => {
    fetchConversations();
  });

  return { conversations, isLoading, refetch: fetchConversations };
}
