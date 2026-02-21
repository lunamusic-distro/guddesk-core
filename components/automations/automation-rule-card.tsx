"use client";

import type { AutomationRule } from "@prisma/client";
import { AutomationAction, AutomationTrigger } from "@prisma/client";
import { useState, useTransition } from "react";

import {
  deleteAutomationRule,
  toggleAutomationRule,
} from "@/actions/manage-automation";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const TRIGGER_LABELS: Record<AutomationTrigger, string> = {
  CONVERSATION_CREATED: "New conversation",
  CONVERSATION_CLOSED: "Conversation closed",
  MESSAGE_RECEIVED: "Message received",
  CONVERSATION_UNASSIGNED_FOR: "Unassigned for duration",
  TAG_ADDED: "Tag added",
};

const ACTION_LABELS: Record<AutomationAction, string> = {
  ASSIGN_TO: "Assign to agent",
  ADD_TAG: "Add tag",
  REMOVE_TAG: "Remove tag",
  CHANGE_STATUS: "Change status",
  SEND_MESSAGE: "Send auto-message",
  NOTIFY_SLACK: "Notify Slack",
};

interface AutomationRuleCardProps {
  rule: AutomationRule;
}

export function AutomationRuleCard({ rule }: AutomationRuleCardProps) {
  const [isPending, startTransition] = useTransition();
  const [isEnabled, setIsEnabled] = useState(rule.isEnabled);

  const handleToggle = () => {
    setIsEnabled(!isEnabled);
    startTransition(async () => {
      const result = await toggleAutomationRule(rule.id);
      if (result.status === "error") {
        setIsEnabled(isEnabled);
        toast.error(result.message);
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteAutomationRule(rule.id);
      if (result.status === "error") {
        toast.error(result.message);
      } else {
        toast.success("Rule deleted");
      }
    });
  };

  const actionConfig = rule.actionConfig as Record<string, string> | null;

  return (
    <div className="flex items-start justify-between rounded-lg border p-4">
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-3">
          <h3 className="font-medium">{rule.name}</h3>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
            {rule.triggerCount} runs
          </span>
        </div>
        {rule.description && (
          <p className="text-sm text-muted-foreground">{rule.description}</p>
        )}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded bg-blue-100 px-1.5 py-0.5 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
            When: {TRIGGER_LABELS[rule.trigger]}
          </span>
          <span className="rounded bg-green-100 px-1.5 py-0.5 text-green-700 dark:bg-green-900 dark:text-green-300">
            Then: {ACTION_LABELS[rule.action]}
            {actionConfig?.tag ? ` "${actionConfig.tag}"` : ""}
            {actionConfig?.status ? ` to ${actionConfig.status}` : ""}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          checked={isEnabled}
          onCheckedChange={handleToggle}
          disabled={isPending}
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          disabled={isPending}
          className="text-destructive"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
