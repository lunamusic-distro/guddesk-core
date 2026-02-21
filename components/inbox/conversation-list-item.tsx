"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { ConversationListItem } from "@/hooks/use-conversations";

interface ConversationListItemProps {
  conversation: ConversationListItem;
  isSelected: boolean;
  onClick: () => void;
}

function formatRelativeTime(dateStr: string | null): string {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

export function ConversationListItemComponent({
  conversation,
  isSelected,
  onClick,
}: ConversationListItemProps) {
  const visitorName =
    conversation.visitor.name ||
    conversation.visitor.email ||
    "Anonymous Visitor";
  const initials = visitorName.slice(0, 2).toUpperCase();

  return (
    <button
      className={cn(
        "flex w-full items-start gap-3 border-b p-3 text-left transition-colors hover:bg-muted/50",
        isSelected && "bg-muted",
      )}
      onClick={onClick}
    >
      <Avatar className="size-9 shrink-0">
        <AvatarFallback className="text-xs">{initials}</AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-medium">{visitorName}</span>
          <span className="shrink-0 text-xs text-muted-foreground">
            {formatRelativeTime(conversation.lastMessageAt)}
          </span>
        </div>

        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {conversation.lastMessagePreview || "No messages yet"}
        </p>

        {conversation.tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {conversation.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="px-1.5 py-0 text-[10px]">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
