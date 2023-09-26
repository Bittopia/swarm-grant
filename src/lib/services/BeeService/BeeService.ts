// import bee from '@/utils/BeeInstanceUtil'
import { Bee, BeeDebug } from '@ethersphere/bee-js'
// import * as fs from 'fs'

const SWARM_HOST = process.env.SWARM_HOST || 'http://localhost'
const POSTAGE_STAMP = process.env.POSTAGE_BATCH_ID || '0x01'

export interface MutateProps {
  data?: any
}


export class BeeService {
  bee: Bee
  debug: BeeDebug
  constructor() {
    this.bee = new Bee(`${SWARM_HOST}:1633`)
    this.debug = new BeeDebug(`${SWARM_HOST}:1635`)
  }

  async mutate(props: MutateProps) {
    const { data } = props
    const initialData = {}
    const fullData = {...initialData, ...data}
    return await this.bee.uploadData(POSTAGE_STAMP, JSON.stringify(fullData))
  }

  async query (reference: string) {
    const data = await this.bee.downloadData(reference)
    return data.json()
  }
}
