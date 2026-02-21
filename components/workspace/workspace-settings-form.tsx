"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { updateWorkspaceSettings } from "@/actions/update-workspace-settings";
import { workspaceSettingsSchema } from "@/lib/validations/workspace";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/shared/icons";

type FormValues = z.infer<typeof workspaceSettingsSchema>;

interface WorkspaceSettingsFormProps {
  workspaceId: string;
  defaultValues: {
    name: string;
    slug: string;
    logo: string | null;
  };
}

export function WorkspaceSettingsForm({
  workspaceId,
  defaultValues,
}: WorkspaceSettingsFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(workspaceSettingsSchema),
    defaultValues: {
      name: defaultValues.name,
      slug: defaultValues.slug,
      logo: defaultValues.logo,
    },
  });

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      const result = await updateWorkspaceSettings(workspaceId, values);

      if (result.status === "error") {
        toast.error(result.message || "Failed to update settings");
        return;
      }

      toast.success("Workspace settings updated!");

      // If slug changed, redirect to new URL
      if (result.workspaceSlug && result.workspaceSlug !== defaultValues.slug) {
        router.push(`/workspace/${result.workspaceSlug}/settings`);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace Name</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL Slug</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <p className="text-xs text-muted-foreground">
                Changing this will update all your workspace URLs
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending && (
            <Icons.spinner className="mr-2 size-4 animate-spin" />
          )}
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
