"use client";

import type { SlackIntegration } from "@prisma/client";
import { useState, useTransition } from "react";

import {
  disconnectSlack,
  saveSlackWebhook,
  updateSlackNotificationPrefs,
} from "@/actions/manage-slack-integration";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface SlackSettingsProps {
  workspaceId: string;
  integration: SlackIntegration | null;
}

export function SlackSettings({ workspaceId, integration }: SlackSettingsProps) {
  const [isPending, startTransition] = useTransition();
  const [webhookUrl, setWebhookUrl] = useState(
    integration?.webhookUrl ?? "",
  );
  const [notifyOnNew, setNotifyOnNew] = useState(
    integration?.notifyOnNew ?? true,
  );
  const [notifyOnClose, setNotifyOnClose] = useState(
    integration?.notifyOnClose ?? false,
  );
  const [notifyOnAssign, setNotifyOnAssign] = useState(
    integration?.notifyOnAssign ?? false,
  );

  const handleSaveWebhook = () => {
    startTransition(async () => {
      const result = await saveSlackWebhook(workspaceId, webhookUrl);
      if (result.status === "error") {
        toast.error(result.message);
      } else {
        toast.success("Slack webhook saved");
      }
    });
  };

  const handleUpdatePrefs = () => {
    startTransition(async () => {
      const result = await updateSlackNotificationPrefs(workspaceId, {
        notifyOnNew,
        notifyOnClose,
        notifyOnAssign,
      });
      if (result.status === "error") {
        toast.error(result.message);
      } else {
        toast.success("Notification preferences updated");
      }
    });
  };

  const handleDisconnect = () => {
    startTransition(async () => {
      const result = await disconnectSlack(workspaceId);
      if (result.status === "error") {
        toast.error(result.message);
      } else {
        toast.success("Slack disconnected");
        setWebhookUrl("");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4 rounded-lg border p-4">
        <h3 className="font-medium">Slack Incoming Webhook</h3>
        <p className="text-sm text-muted-foreground">
          Create an Incoming Webhook in your Slack workspace and paste the URL
          below to receive notifications.
        </p>
        <div className="flex gap-2">
          <Input
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="https://hooks.slack.com/services/..."
            className="flex-1"
          />
          <Button
            onClick={handleSaveWebhook}
            disabled={isPending || !webhookUrl}
          >
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      {integration && (
        <>
          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-medium">Notification Preferences</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="notify-new">New conversations</Label>
                <Switch
                  id="notify-new"
                  checked={notifyOnNew}
                  onCheckedChange={setNotifyOnNew}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notify-close">Conversation closed</Label>
                <Switch
                  id="notify-close"
                  checked={notifyOnClose}
                  onCheckedChange={setNotifyOnClose}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notify-assign">Conversation assigned</Label>
                <Switch
                  id="notify-assign"
                  checked={notifyOnAssign}
                  onCheckedChange={setNotifyOnAssign}
                />
              </div>
            </div>
            <Button
              onClick={handleUpdatePrefs}
              disabled={isPending}
              variant="outline"
            >
              Update Preferences
            </Button>
          </div>

          <div className="rounded-lg border border-destructive/50 p-4">
            <h3 className="font-medium text-destructive">Danger Zone</h3>
            <p className="mb-3 text-sm text-muted-foreground">
              Disconnect Slack integration. You can reconnect later.
            </p>
            <Button
              variant="destructive"
              onClick={handleDisconnect}
              disabled={isPending}
            >
              Disconnect Slack
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
