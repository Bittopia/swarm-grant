import type { BeeService } from '$lib/services/BeeService/BeeService';
import type { RedisService } from '$lib/services/RedisService/RedisService';
import type { DataType } from '$lib/types/data';
import type { NewSocietyType, SocietyType } from '$lib/types/society';
import { uuid } from 'uuidv4';

export class SocietyRepository {
	private beeService: BeeService;
	private redisService: RedisService;

	constructor({
		beeService,
		redisService
	}: {
		beeService: BeeService;
		redisService: RedisService;
	}) {
		this.beeService = beeService;
		this.redisService = redisService;
	}

	async save(society: NewSocietyType) {
		const data = await this.all();

		const societies = data.societies;

		const id = uuid();
		const societyWithId = { [id]: { id, ...society } };

		const { reference } = await this.beeService.mutate({
			data: { ...data, societies: { ...societies, ...societyWithId } }
		});

		await this.redisService.setData('reference', reference);
		return societyWithId;
	}

	async update(society: SocietyType) {
		const data = await this.all();
		const societies = data.societies;

		societies[society.id as string] = society;

		const { reference } = await this.beeService.mutate({ data: { ...data, societies } });

		await this.redisService.setData('reference', reference);
		return societies[society.id as string];
	}

	async all() {
		const reference = await this.redisService.getData('reference');

		if (!reference) {
			return { users: {}, societies: {} };
		}
		const data = await this.beeService.query(reference);

		return data as DataType;
	}

	async delete(societyId: string) {
		try {
			const data = await this.all();
			const societies = data.societies;

			delete societies[societyId];
			const { reference } = await this.beeService.mutate({ data: { ...data, societies } });
			await this.redisService.setData('reference', reference);
			return true;
		} catch (e) {
			return false;
		}
	}

	async join(societyId: string, web3Address: string) {
		try {
			const data = await this.all();
			const societies = data.societies;

			const society = societies[societyId];

			if (!society.members) {
				society.members = [];
			}

			society.members = society.members.filter((memberId) => memberId !== web3Address);

			society.members.push(web3Address);

			const { reference } = await this.beeService.mutate({ data: { ...data, societies } });
			await this.redisService.setData('reference', reference);
			return { success: true };
		} catch (e) {
			return { success: false };
		}
	}

	async leave(societyId: string, web3Address: string) {
		try {
			const data = await this.all();
			const societies = data.societies;

			const society = societies[societyId];
			if (!society.members) {
				society.members = [];
			}

			society.members = society.members.filter((memberId) => memberId !== web3Address);

			const { reference } = await this.beeService.mutate({ data: { ...data, societies } });
			await this.redisService.setData('reference', reference);
			return { success: true };
		} catch (e) {
			return { success: false };
		}
	}
}
