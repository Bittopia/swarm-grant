/*
class BeeUtil {

  private bee: Bee

  constructor() {
    this.bee = new Bee(`${SWARM_HOST}:1633`)
  }

  async upload (data: string) {
    return await this.bee.uploadData(POSTAGE_BATCH_ID, data)
  }

  async download(reference: string) {
    return await this.bee.downloadData(reference)
  }

  async retriveAllTags() {
    return await this.bee.getAllTags()
  }

  async retriveTag(tag: number) {
    return await this.bee.retrieveTag(tag)
  }
}

export default new BeeUtil()
 */

import {describe, expect, it} from "vitest";
import BeeUtil from "$lib/utils/bee/bee";

describe("BeeUtil", () => {
  it("should be defined", () => {
    expect(BeeUtil).toBeDefined()
  })

  it("should have upload method defined", () => {
    expect(BeeUtil.upload).toBeDefined()
  })

  it("should have download method defined", () => {
    expect(BeeUtil.download).toBeDefined()
  })

  it.skip("should be able to upload data", async () => {
    const result = await BeeUtil.upload("Hello World")
    expect(result).toBeDefined()
    expect(result.reference).toBeDefined()
  })
})
