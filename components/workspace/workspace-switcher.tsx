"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, ChevronsUpDown, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type WorkspaceItem = {
  id: string;
  name: string;
  slug: string;
  role: string;
};

interface WorkspaceSwitcherProps {
  workspaces: WorkspaceItem[];
  activeWorkspaceSlug: string | null;
  large?: boolean;
}

export default function WorkspaceSwitcher({
  workspaces,
  activeWorkspaceSlug,
  large = false,
}: WorkspaceSwitcherProps) {
  const router = useRouter();
  const [openPopover, setOpenPopover] = useState(false);

  const activeWorkspace = workspaces.find((t) => t.slug === activeWorkspaceSlug) ?? workspaces[0];

  if (!workspaces.length) {
    return (
      <Link
        href="/onboarding/create-workspace"
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "gap-2",
        )}
      >
        <Plus size={16} />
        Create Workspace
      </Link>
    );
  }

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <Button
          className="h-8 px-2"
          variant={openPopover ? "secondary" : "ghost"}
        >
          <div className="flex items-center space-x-3 pr-2">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary text-[10px] font-bold text-primary-foreground">
              {activeWorkspace?.name?.charAt(0).toUpperCase() ?? "?"}
            </div>
            <span
              className={cn(
                "inline-block truncate text-sm font-medium xl:max-w-[120px]",
                large ? "w-full" : "max-w-[80px]",
              )}
            >
              {activeWorkspace?.name ?? "Select workspace"}
            </span>
          </div>
          <ChevronsUpDown
            className="size-4 text-muted-foreground"
            aria-hidden="true"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="max-w-60 p-2">
        <div className="flex flex-col gap-1">
          {workspaces.map((workspace) => (
            <button
              key={workspace.id}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "relative flex h-9 w-full items-center gap-3 p-3 text-muted-foreground hover:text-foreground",
              )}
              onClick={() => {
                router.push(`/workspace/${workspace.slug}/inbox`);
                setOpenPopover(false);
              }}
            >
              <div className="flex size-5 shrink-0 items-center justify-center rounded bg-primary text-[9px] font-bold text-primary-foreground">
                {workspace.name.charAt(0).toUpperCase()}
              </div>
              <span
                className={`flex-1 truncate text-left text-sm ${
                  activeWorkspaceSlug === workspace.slug
                    ? "font-medium text-foreground"
                    : "font-normal"
                }`}
              >
                {workspace.name}
              </span>
              {activeWorkspaceSlug === workspace.slug && (
                <Check size={16} className="shrink-0 text-foreground" />
              )}
            </button>
          ))}
          <Link
            href="/onboarding/create-workspace"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "relative mt-1 flex h-9 items-center justify-center gap-2 p-2",
            )}
            onClick={() => setOpenPopover(false)}
          >
            <Plus size={16} />
            <span className="text-sm">New Workspace</span>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
