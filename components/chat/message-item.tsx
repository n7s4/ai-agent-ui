"use client";

import type { UIMessage } from "ai";
import { Bot, User, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UIRenderer } from "@/components/blocks/ui-renderer";
import type { AgentResponse } from "@/lib/types";

interface MessageItemProps {
  message: UIMessage;
}

type MessagePart = UIMessage["parts"][number];

function isToolPart(
  part: MessagePart
): part is MessagePart & { toolCallId: string; state: string; output?: unknown } {
  return typeof part.type === "string" && part.type.startsWith("tool-");
}

export function MessageItem({ message }: MessageItemProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <Avatar className="size-8 shrink-0">
        <AvatarFallback className={isUser ? "bg-primary text-primary-foreground" : "bg-muted"}>
          {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
        </AvatarFallback>
      </Avatar>

      <div className={`flex max-w-[80%] flex-col gap-2 ${isUser ? "items-end" : "items-start"}`}>
        {message.parts.map((part, i) => {
          if (part.type === "text" && part.text) {
            return (
              <div
                key={i}
                className={`rounded-2xl px-4 py-2.5 text-sm ${
                  isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                <span className="whitespace-pre-wrap">{part.text}</span>
              </div>
            );
          }

          if (isToolPart(part)) {
            if (part.state === "output-available") {
              const result = part.output as AgentResponse;
              if (result && result.type) {
                return (
                  <div key={i} className="w-full min-w-[280px]">
                    <UIRenderer data={result} />
                  </div>
                );
              }
            }

            // Show loading state for in-progress tool calls
            if (part.state !== "output-available" && part.state !== "output-error") {
              return (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="size-3 animate-spin" />
                  <span>正在调用工具...</span>
                </div>
              );
            }
          }

          return null;
        })}
      </div>
    </div>
  );
}
