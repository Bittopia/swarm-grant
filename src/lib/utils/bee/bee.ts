import { Bee } from "@ethersphere/bee-js";

const SWARM_HOST = process.env.SWARM_HOST || 'http://localhost'
const POSTAGE_BATCH_ID = process.env.POSTAGE_BATCH_ID || '0000'

class BeeUtil {

  private bee: Bee

  // TODO - save references in cache
  constructor() {
    this.bee = new Bee(`${SWARM_HOST}:1633`)
  }

  async upload (data: string) {
    return await this.bee.uploadData(POSTAGE_BATCH_ID, data)
  }

  async download(reference: string) {
    return await this.bee.downloadData(reference)
  }
}

export default new BeeUtil()
