import { Chat } from "@/components/chat/chat";
import { UserMenu } from "@/components/chat/user-menu";

export default function Home() {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
            AI
          </div>
          <h1 className="text-sm font-semibold">AI Agent</h1>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
            V1
          </span>
        </div>
        <UserMenu />
      </header>

      {/* Chat area */}
      <div className="flex-1 overflow-hidden">
        <Chat />
      </div>
    </div>
  );
}
