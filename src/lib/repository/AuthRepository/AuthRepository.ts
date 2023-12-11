import type { BeeService } from '$lib/services/BeeService/BeeService';
import type { RedisService } from '$lib/services/RedisService/RedisService';
import type { UserType } from '$lib/types/user';

export class AuthRepository {
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

	async getNonce(address: string) {
		const users = await this.all();

		const user = users[address] as UserType;

		return user.nonce;
	}

	async all() {
		const reference = await this.redisService.getData('reference');
		if (!reference) {
			return {};
		}
		return (await this.beeService.query(reference as string)) as Record<string, UserType>;
	}
}
