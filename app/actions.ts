
import { kv } from '@vercel/kv'

type Scores = {
  usefulness: number
  love: number
  usage: number
  value: number
}

export interface Love extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  path: string
  scores: Scores
  sharePath?: string
}

export async function getSharedLove (id: string) {
  const love = await kv.hgetall<Love>(`love:${id}`)

  if (!love || !love.sharePath) {
    return null
  }

  return love
}

export async function shareLove(love: Love) {
  const payload = {
    ...love,
    sharePath: `/share/${love.id}`
  }

  await kv.hmset(`love:${love.id}`, payload)

  return payload
}
