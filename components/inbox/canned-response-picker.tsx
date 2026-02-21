"use client";

interface CannedResponse {
  id: string;
  title: string;
  body: string;
}

interface CannedResponsePickerProps {
  responses: CannedResponse[];
  onSelect: (response: CannedResponse) => void;
  onClose: () => void;
}

export function CannedResponsePicker({
  responses,
  onSelect,
  onClose,
}: CannedResponsePickerProps) {
  return (
    <div className="absolute inset-x-0 bottom-full mb-1 max-h-48 overflow-y-auto rounded-md border bg-popover shadow-md">
      <div className="flex items-center justify-between border-b px-3 py-1.5">
        <span className="text-xs font-medium text-muted-foreground">
          Canned Responses
        </span>
        <button
          className="text-xs text-muted-foreground hover:text-foreground"
          onClick={onClose}
        >
          Esc
        </button>
      </div>
      {responses.map((r) => (
        <button
          key={r.id}
          className="flex w-full flex-col gap-0.5 px-3 py-2 text-left hover:bg-muted"
          onClick={() => onSelect(r)}
        >
          <span className="text-xs font-medium">{r.title}</span>
          <span className="truncate text-xs text-muted-foreground">
            {r.body}
          </span>
        </button>
      ))}
    </div>
  );
}
