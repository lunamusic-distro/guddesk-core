"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WorkspaceMemberOption {
  id: string;
  user: { name: string | null };
}

interface ConversationFiltersProps {
  status: "OPEN" | "SNOOZED" | "CLOSED";
  onStatusChange: (status: "OPEN" | "SNOOZED" | "CLOSED") => void;
  assigneeFilter: string;
  onAssigneeChange: (assigneeId: string) => void;
  members: WorkspaceMemberOption[];
}

export function ConversationFilters({
  status,
  onStatusChange,
  assigneeFilter,
  onAssigneeChange,
  members,
}: ConversationFiltersProps) {
  return (
    <div className="flex items-center gap-2 border-b px-3 py-2">
      <Tabs
        value={status}
        onValueChange={(v) => onStatusChange(v as "OPEN" | "SNOOZED" | "CLOSED")}
        className="flex-1"
      >
        <TabsList className="h-8 w-full">
          <TabsTrigger value="OPEN" className="flex-1 text-xs">
            Open
          </TabsTrigger>
          <TabsTrigger value="SNOOZED" className="flex-1 text-xs">
            Snoozed
          </TabsTrigger>
          <TabsTrigger value="CLOSED" className="flex-1 text-xs">
            Closed
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Select value={assigneeFilter} onValueChange={onAssigneeChange}>
        <SelectTrigger className="h-8 w-[120px] text-xs">
          <SelectValue placeholder="All agents" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All agents</SelectItem>
          <SelectItem value="unassigned">Unassigned</SelectItem>
          {members.map((m) => (
            <SelectItem key={m.id} value={m.id}>
              {m.user.name ?? "Unknown"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
