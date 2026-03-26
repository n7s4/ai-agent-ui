import type { ScriptBlock as ScriptBlockType } from "@/lib/types";

export function ScriptBlock({ content, title }: ScriptBlockType) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      {title && (
        <div className="border-b border-border bg-muted/50 px-3 py-2 text-xs font-medium text-muted-foreground">
          {title}
        </div>
      )}
      <pre className="overflow-x-auto bg-muted/30 p-4 text-sm">
        <code>{content}</code>
      </pre>
    </div>
  );
}
