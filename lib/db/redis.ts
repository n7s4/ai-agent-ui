import Redis from "ioredis";

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined;
};

export const redis =
  globalForRedis.redis ??
  new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
    maxRetriesPerRequest: 3,
    lazyConnect: true,
  });

if (process.env.NODE_ENV !== "production") {
  globalForRedis.redis = redis;
}

// ===== 聊天上下文缓存（短期记忆） =====

const CHAT_CONTEXT_PREFIX = "chat:context:";
const CHAT_CONTEXT_TTL = 60 * 60; // 1 小时

/** 缓存聊天上下文 */
export async function setChatContext(chatId: string, messages: unknown[]) {
  await redis.set(
    `${CHAT_CONTEXT_PREFIX}${chatId}`,
    JSON.stringify(messages),
    "EX",
    CHAT_CONTEXT_TTL
  );
}

/** 获取缓存的聊天上下文 */
export async function getChatContext(chatId: string): Promise<unknown[] | null> {
  const data = await redis.get(`${CHAT_CONTEXT_PREFIX}${chatId}`);
  return data ? JSON.parse(data) : null;
}

/** 删除聊天上下文缓存 */
export async function deleteChatContext(chatId: string) {
  await redis.del(`${CHAT_CONTEXT_PREFIX}${chatId}`);
}
