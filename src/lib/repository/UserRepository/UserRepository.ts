import type { BeeService } from '$lib/services/BeeService/BeeService';
import type { RedisService } from '$lib/services/RedisService/RedisService';
import type { DataType } from '$lib/types/data';
import type { UserType } from '$lib/types/user';

export class UserRepository {
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

	async get(address: string) {
		const data = await this.all();
		const users = data.users;

		return users[address];
	}

	async save(user: UserType) {
		const data = await this.all();
		const users = data.users;

		const newUser = { [user.web3Address]: user };
		// merge and save
		const { reference } = await this.beeService.mutate({
			data: { ...data, users: { ...users, ...newUser } }
		});

		await this.redisService.setData('reference', reference);
		return newUser;
	}

	async update(user: UserType) {
		const data = await this.all();
		const users = data.users;

		users[user.web3Address] = user;

		const { reference } = await this.beeService.mutate({ data: { ...data, users } });

		await this.redisService.setData('reference', reference);
		return users[user.web3Address];
	}

	async all(): Promise<DataType> {
		const reference = await this.redisService.getData('reference');

		if (!reference) {
			return { users: {}, societies: {} };
		}
		const data = await this.beeService.query(reference);

		return data as DataType;
	}

	async updateBio(address: string, bio: string) {
		const data = await this.all();
		const users = data.users;

		users[address].bio = bio;

		const { reference } = await this.beeService.mutate({ data: { ...data, users } });

		await this.redisService.setData('reference', reference);
		return users[address];
	}
}
