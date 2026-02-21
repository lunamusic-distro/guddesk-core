"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { WorkspaceRole } from "@prisma/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { inviteWorkspaceMember } from "@/actions/invite-workspace-member";
import { workspaceInviteSchema } from "@/lib/validations/workspace";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icons } from "@/components/shared/icons";

type FormValues = z.infer<typeof workspaceInviteSchema>;

interface InviteMemberFormProps {
  workspaceId: string;
}

export function InviteMemberForm({ workspaceId }: InviteMemberFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(workspaceInviteSchema),
    defaultValues: {
      email: "",
      role: WorkspaceRole.AGENT,
    },
  });

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      const result = await inviteWorkspaceMember(workspaceId, values);

      if (result.status === "error") {
        toast.error(result.message || "Failed to send invitation");
        return;
      }

      toast.success("Invitation sent successfully!");
      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-end gap-3"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="colleague@company.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="w-[140px]">
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={WorkspaceRole.ADMIN}>Admin</SelectItem>
                  <SelectItem value={WorkspaceRole.AGENT}>Agent</SelectItem>
                  <SelectItem value={WorkspaceRole.VIEWER}>Viewer</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending && (
            <Icons.spinner className="mr-2 size-4 animate-spin" />
          )}
          Invite
        </Button>
      </form>
    </Form>
  );
}
