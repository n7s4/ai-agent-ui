import { Pinecone } from "@pinecone-database/pinecone";

const globalForPinecone = globalThis as unknown as {
  pinecone: Pinecone | undefined;
};

export const pinecone =
  globalForPinecone.pinecone ??
  new Pinecone({ apiKey: process.env.PINECONE_API_KEY || "" });

if (process.env.NODE_ENV !== "production") {
  globalForPinecone.pinecone = pinecone;
}

const INDEX_NAME = process.env.PINECONE_INDEX || "ai-agent-memory";

/** 获取 Pinecone 索引 */
export function getMemoryIndex() {
  return pinecone.index(INDEX_NAME);
}

/** 存储长期记忆向量 */
export async function upsertMemory(
  id: string,
  values: number[],
  metadata: Record<string, string>
) {
  const index = getMemoryIndex();
  await index.upsert({ records: [{ id, values, metadata }] });
}

/** 查询相似记忆 */
export async function queryMemory(vector: number[], topK = 5) {
  const index = getMemoryIndex();
  return index.query({ vector, topK, includeMetadata: true });
}

/** 删除记忆 */
export async function deleteMemory(id: string) {
  const index = getMemoryIndex();
  await index.deleteOne({ id });
}
