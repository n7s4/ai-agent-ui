"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface User {
  userId: string;
  name: string;
  email: string;
}

export function UserMenu() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  if (!user) {
    return (
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <span className="size-1.5 rounded-full bg-green-500" />
        在线
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <span className="size-1.5 rounded-full bg-green-500" />
        {user.name}
      </div>
      <Button variant="ghost" size="icon-xs" onClick={handleLogout} title="退出登录">
        <LogOut className="size-3" />
      </Button>
    </div>
  );
}
