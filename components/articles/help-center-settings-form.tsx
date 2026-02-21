"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { updateHelpCenterSettings } from "@/actions/update-help-center-settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/shared/icons";

interface HelpCenterSettingsFormProps {
  workspaceId: string;
  workspaceSlug: string;
  settings: {
    title: string;
    subtitle: string;
    primaryColor: string;
    logoUrl: string | null;
  };
}

export function HelpCenterSettingsForm({
  workspaceId,
  workspaceSlug,
  settings,
}: HelpCenterSettingsFormProps) {
  const [isPending, startTransition] = useTransition();
  const [config, setConfig] = useState(settings);

  function handleSave() {
    startTransition(async () => {
      const result = await updateHelpCenterSettings(workspaceId, config);
      if (result.status === "error") {
        toast.error(result.message);
        return;
      }
      toast.success("Help center settings saved");
    });
  }

  return (
    <div className="max-w-2xl space-y-6 rounded-lg border p-6">
      <div className="space-y-2">
        <Label htmlFor="title">Help Center Title</Label>
        <Input
          id="title"
          value={config.title}
          onChange={(e) => setConfig((s) => ({ ...s, title: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subtitle">Subtitle</Label>
        <Input
          id="subtitle"
          value={config.subtitle}
          onChange={(e) =>
            setConfig((s) => ({ ...s, subtitle: e.target.value }))
          }
          placeholder="How can we help you today?"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="primaryColor">Primary Color</Label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            id="primaryColor"
            value={config.primaryColor}
            onChange={(e) =>
              setConfig((s) => ({ ...s, primaryColor: e.target.value }))
            }
            className="h-10 w-14 cursor-pointer rounded border"
          />
          <Input
            value={config.primaryColor}
            onChange={(e) =>
              setConfig((s) => ({ ...s, primaryColor: e.target.value }))
            }
            className="w-28"
          />
        </div>
      </div>

      <div className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
        <p>
          Your help center is available at:{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            /help/{workspaceSlug}
          </code>
        </p>
      </div>

      <Button onClick={handleSave} disabled={isPending}>
        {isPending && <Icons.spinner className="mr-2 size-4 animate-spin" />}
        Save Settings
      </Button>
    </div>
  );
}
