import type { AgentResponse } from "@/lib/types";
import { TextBlock } from "./text-block";
import { ImageBlock } from "./image-block";
import { VideoBlock } from "./video-block";
import { ScriptBlock } from "./script-block";
import { CardBlock } from "./card-block";

interface UIRendererProps {
  data: AgentResponse;
}

export function UIRenderer({ data }: UIRendererProps) {
  switch (data.type) {
    case "text":
      return <TextBlock {...data} />;
    case "image":
      return <ImageBlock {...data} />;
    case "video":
      return <VideoBlock {...data} />;
    case "script":
      return <ScriptBlock {...data} />;
    case "card":
      return <CardBlock {...data} />;
    default:
      return null;
  }
}
