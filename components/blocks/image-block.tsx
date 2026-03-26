"use client";

import type { ImageBlock as ImageBlockType } from "@/lib/types";

export function ImageBlock({ url, alt }: ImageBlockType) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={alt || "AI 生成的图片"}
        className="h-auto w-full object-cover"
        loading="lazy"
      />
      {alt && (
        <div className="border-t border-border bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
          {alt}
        </div>
      )}
    </div>
  );
}
