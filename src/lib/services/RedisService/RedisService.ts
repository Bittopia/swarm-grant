import { createClient } from 'redis'
import type { RedisClientType } from 'redis'

type CacheData = string | null
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379'

export class RedisService {
  private redisClient: RedisClientType

  constructor() {
    this.redisClient = createClient({url: REDIS_URL})
    this.redisClient
      .on('error', (error) => {
        console.error('Error connecting to Redis:', error)
      })
  }

  async getData(key: string): Promise<CacheData> {
    await this.redisClient.connect()
    try {
      const data = await this.redisClient.get(key)
      await this.redisClient.disconnect()
      return data
    } catch (error) {
      console.error('Error getting data from Redis:', error)
      await this.redisClient.disconnect()
      return null
    }
  }

  async setData(key: string, value: string, ttl?: number): Promise<boolean> {
    await this.redisClient.connect()
    try {
      if (ttl) {
        await this.redisClient.set(key, value, { EX: ttl })
      } else {
        await this.redisClient.set(key, value)
      }
      await this.redisClient.disconnect()
      return true
    } catch (error) {
      console.error('Error setting data in Redis:', error)
      await this.redisClient.disconnect()
      return false
    }
  }
}
