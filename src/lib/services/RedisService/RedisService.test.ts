import {describe, expect, it} from "vitest";
import {RedisService} from "$lib/services/RedisService/RedisService";

describe("RedisService", () => {
  it("Should be defined", () => {
    expect(RedisService).toBeDefined()
  })

  it("Should have mutate getData defined", () => {
    const redisService = new RedisService()
    expect(redisService.getData).toBeDefined()
  })

  it("Should have setData method defined", () => {
    const redisService = new RedisService()
    expect(redisService.setData).toBeDefined()
  })

  it("Should be able to create new data using setData method", async () => {
    const redisService = new RedisService()
    const data = {
      id: "test",
      name: "test"
    }
    const result = await redisService.setData("test", JSON.stringify(data))
    expect(result).toBeTruthy()
  })

  it("Should be able to retrieve data using getData method", async () => {
    const redisService = new RedisService()
    const data = {
      id: "test",
      name: "test"
    }
    await redisService.setData("test", JSON.stringify(data))
    const result = await redisService.getData("test")
    expect(result).toEqual(JSON.stringify(data))
  })
})


