import { Bee, BeeDebug } from '@ethersphere/bee-js';
import {
	SWARM_HOST as SWARM_HOST_ENV,
	POSTAGE_BATCH_ID as POSTAGE_BATCH_ID_ENV
} from '$env/static/private';

const SWARM_HOST = SWARM_HOST_ENV || 'http://localhost';
const POSTAGE_STAMP = POSTAGE_BATCH_ID_ENV || '0x01';

export interface MutateProps {
	data?: any;
}

export class BeeService {
	bee: Bee;
	debug: BeeDebug;
	constructor() {
		this.bee = new Bee(`${SWARM_HOST}:1633`);
		this.debug = new BeeDebug(`${SWARM_HOST}:1635`);
	}

	async mutate(props: MutateProps) {
		const { data } = props;
		const initialData = {};
		const fullData = { ...initialData, ...data };
		return await this.bee.uploadData(POSTAGE_STAMP, JSON.stringify(fullData));
	}

	async query(reference: string) {
		const data = await this.bee.downloadData(reference);
		const json = data.json();
		return json;
	}
}
