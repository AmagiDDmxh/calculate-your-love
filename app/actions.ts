import { Love } from "#/lib/types"
import { kv } from "@vercel/kv"

export async function getSharedLove(id: string) {
  const love = await kv.hgetall<Love>(`love:${id}`)

  if (!love || !love.sharePath) {
    return null
  }

  return love
}

export async function createAndSaveShareLove(love: Love) {
  const payload = {
    ...love,
    sharePath: `/share/${love.id}`,
  }

  await kv.hmset(`love:${love.id}`, payload)
  return payload
}
