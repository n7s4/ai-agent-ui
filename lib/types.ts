export type AgentResponseType = "text" | "image" | "video" | "script" | "card";

export interface TextBlock {
  type: "text";
  content: string;
}

export interface ImageBlock {
  type: "image";
  url: string;
  alt?: string;
}

export interface VideoBlock {
  type: "video";
  url: string;
  title?: string;
}

export interface ScriptBlock {
  type: "script";
  content: string;
  title?: string;
}

export interface CardBlock {
  type: "card";
  title: string;
  description: string;
  icon?: string;
}

export type AgentResponse =
  | TextBlock
  | ImageBlock
  | VideoBlock
  | ScriptBlock
  | CardBlock;
