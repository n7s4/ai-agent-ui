import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Cloud, Search, ImageIcon, VideoIcon, Info } from "lucide-react";
import type { CardBlock as CardBlockType } from "@/lib/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  cloud: Cloud,
  search: Search,
  image: ImageIcon,
  video: VideoIcon,
};

export function CardBlock({ title, description, icon }: CardBlockType) {
  const IconComponent = icon ? iconMap[icon] || Info : Info;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <IconComponent className="size-5" />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
