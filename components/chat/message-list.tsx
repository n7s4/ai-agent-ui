"use client";

import { useEffect, useRef } from "react";
import type { UIMessage } from "ai";
import { MessageItem } from "./message-item";
import { Loader2 } from "lucide-react";

interface MessageListProps {
  messages: UIMessage[];
  isLoading: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  console.log("messages", messages);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-muted-foreground">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-muted">
          <span className="text-2xl">AI</span>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-medium text-foreground">AI Agent</h3>
          <p className="mt-1 text-sm">
            输入消息开始对话，我可以帮你查天气、搜索信息、生成图片和视频
          </p>
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {["北京天气怎么样？", "帮我生成一张未来城市", "搜索最新AI新闻"].map(
            (hint) => (
              <span
                key={hint}
                className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"
              >
                {hint}
              </span>
            ),
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-4">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}

      {isLoading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          <span>AI 正在思考...</span>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
