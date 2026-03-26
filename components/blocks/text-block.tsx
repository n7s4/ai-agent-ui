import type { TextBlock as TextBlockType } from "@/lib/types";

export function TextBlock({ content }: TextBlockType) {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
      {content}
    </div>
  );
}
