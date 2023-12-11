import { Bee } from '@ethersphere/bee-js';

const SWARM_HOST = process.env.SWARM_HOST || 'http://localhost';
console.log('LS -> src/lib/database/bee/bee.ts:3 -> SWARM_HOST: ', SWARM_HOST);
const POSTAGE_BATCH_ID = process.env.POSTAGE_BATCH_ID || '0000';
console.log('LS -> src/lib/database/bee/bee.ts:5 -> POSTAGE_BATCH_ID: ', POSTAGE_BATCH_ID);

class BeeUtil {
	private bee: Bee;
	constructor() {
		this.bee = new Bee(`${SWARM_HOST}:1633`);
	}

	async upload(data: string) {
		return await this.bee.uploadData(POSTAGE_BATCH_ID, data);
	}

	async download(reference: string) {
		return await this.bee.downloadData(reference);
	}
}

export default new BeeUtil();
