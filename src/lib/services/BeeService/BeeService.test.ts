import {describe, expect, it} from "vitest";
import {BeeService} from "$lib/services/BeeService/BeeService";

describe("BeeService", () => {
  it("Shoule be defined", () => {
    expect(BeeService).toBeDefined()
  })
  it("Should have mutate method defined", () => {
    const beeService = new BeeService()
    expect(beeService.mutate).toBeDefined()
  })
  it("Should have query method defined", () => {
    const beeService = new BeeService()
    expect(beeService.query).toBeDefined()
  })
  it("Should be able to create new data using mutate method", async () => {
    const beeService = new BeeService()
    const data = {
      id: "test",
      name: "test"
    }
    const { reference } = await beeService.mutate({data})
    // console.log(reference)
    expect(reference).toBeDefined()
  })
  it("Should be able to retrieve data using query method", async () => {
    const beeService = new BeeService()
    const data = await beeService.query("b351b67fbc7a9b436015ce3fe1fd77aee7440f20dd26a6b25d75e3fc51102eda")
    console.log(data)
    expect(data).toEqual({
      id: "test",
      name: "test"
    })
  })
})
