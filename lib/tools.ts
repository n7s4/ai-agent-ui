import { tool } from "ai";
import { z } from "zod";

export const weatherTool = tool({
  description: "获取指定城市的天气信息",
  inputSchema: z.object({
    city: z.string().describe("城市名称"),
  }),
  execute: async ({ city }) => {
    const conditions = ["晴天", "多云", "小雨", "阴天", "雷阵雨"];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    const temp = Math.floor(Math.random() * 30) + 5;
    const humidity = Math.floor(Math.random() * 60) + 30;

    return {
      type: "card" as const,
      title: `${city} 天气`,
      description: `${condition} ${temp}°C，湿度 ${humidity}%`,
      icon: "cloud",
    };
  },
});

export const searchTool = tool({
  description: "搜索互联网获取最新信息，适用于新闻、事实查询、技术问题等",
  inputSchema: z.object({
    query: z.string().describe("搜索关键词"),
  }),
  execute: async ({ query }) => {
    const res = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: process.env.TAVILY_API_KEY,
        query,
        max_results: 5,
        include_answer: true,
      }),
    });

    if (!res.ok) {
      return {
        type: "card" as const,
        title: `搜索失败：${query}`,
        description: `搜索请求失败 (${res.status})，请稍后重试。`,
        icon: "search",
      };
    }

    const data = await res.json();

    const sources = (data.results || [])
      .slice(0, 3)
      .map((r: { title: string; url: string }) => `- ${r.title}`)
      .join("\n");

    return {
      type: "card" as const,
      title: `搜索结果：${query}`,
      description: data.answer || sources || "未找到相关结果。",
      icon: "search",
    };
  },
});

export const imageTool = tool({
  description: "根据描述生成图片",
  inputSchema: z.object({
    prompt: z.string().describe("图片描述"),
  }),
  execute: async ({ prompt }) => {
    const width = 800;
    const height = 600;
    return {
      type: "image" as const,
      url: `https://placehold.co/${width}x${height}/1a1a2e/eaeaea?text=${encodeURIComponent(prompt.slice(0, 30))}`,
      alt: prompt,
    };
  },
});

export const videoTool = tool({
  description: "根据描述生成视频",
  inputSchema: z.object({
    prompt: z.string().describe("视频描述"),
  }),
  execute: async ({ prompt }) => {
    return {
      type: "video" as const,
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      title: prompt,
    };
  },
});

export const tools = {
  weather: weatherTool,
  search: searchTool,
  image: imageTool,
  video: videoTool,
};
