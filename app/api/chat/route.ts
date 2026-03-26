import { streamText, convertToModelMessages } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const openai = createOpenAI({
  baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
  apiKey: process.env.OPENAI_API_KEY,
});
import { tools } from "@/lib/tools";

const SYSTEM_PROMPT = `你是一个 AI Agent，你的任务是理解用户意图并返回结构化的 UI 响应。

你有以下工具可以使用：
- weather: 获取天气信息
- search: 搜索互联网信息
- image: 生成图片
- video: 生成视频

根据用户的请求，选择合适的工具来完成任务。

当用户请求不需要工具时，直接用文字回复即可。

注意：
1. 理解用户的真实意图
2. 选择最合适的工具
3. 回复要简洁、有用
4. 如果用户要求生成图片，使用 image 工具
5. 如果用户要求生成视频，使用 video 工具
6. 如果用户询问天气，使用 weather 工具
7. 如果用户需要搜索信息，使用 search 工具
8. 对于写作类请求（如写短剧、写故事），直接用文字回复`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai.chat(process.env.AI_MODEL || "gpt-4o-mini"),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    tools,
  });

  return result.toUIMessageStreamResponse();
}
