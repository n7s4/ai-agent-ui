"use client";

import type { VideoBlock as VideoBlockType } from "@/lib/types";

export function VideoBlock({ url, title }: VideoBlockType) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <video
        src={url}
        controls
        className="w-full"
        preload="metadata"
      >
        Your browser does not support the video tag.
      </video>
      {title && (
        <div className="border-t border-border bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
          {title}
        </div>
      )}
    </div>
  );
}
