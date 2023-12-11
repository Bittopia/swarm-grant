import type { BeeService } from '$lib/services/BeeService/BeeService';
import type { RedisService } from '$lib/services/RedisService/RedisService';
import type { ModuleType, NewModuleType } from '$lib/types/module';

import societyRepository from '$lib/repository/SocietyRepository';
import { uuid } from 'uuidv4';
import set from 'lodash.set';

export class ModuleRepository {
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

	async save(module: NewModuleType) {
		const data = await societyRepository.all();
		const societies = data.societies;

		try {
			const id = uuid();

			set(societies, [module.societyId, 'courses', module.courseId, 'modules', id], {
				id,
				...module
			});

			const { reference } = await this.beeService.mutate({ data: { ...data, societies } });

			await this.redisService.setData('reference', reference);
			return societies[module.societyId as string].courses?.[module.courseId].modules?.[id];
		} catch (e) {
			throw new Error('Not able to save module', e as Error);
		}
	}

	async update(module: ModuleType) {
		const data = await societyRepository.all();
		const societies = data.societies;

		set(societies, [module.societyId, 'courses', module.courseId, 'modules', module.id], module);

		const { reference } = await this.beeService.mutate({ data: { ...data, societies } });

		await this.redisService.setData('reference', reference);
		return societies[module.societyId].courses?.[module.courseId as string].modules?.[
			module.id as string
		];
	}

	async all(societyId: string, courseId: string) {
		const data = await societyRepository.all();
		const societies = data.societies;

		if (societies[societyId]) {
			return societies[societyId].courses?.[courseId].modules;
		}

		return [];
	}

	async delete(module: ModuleType) {
		try {
			const data = await societyRepository.all();
			const societies = data.societies;

			set(
				societies,
				[module.societyId, 'courses', module.courseId, 'modules', module.id],
				undefined
			);

			const { reference } = await this.beeService.mutate({ data: { ...data, societies } });
			await this.redisService.setData('reference', reference);
			return true;
		} catch (e) {
			return false;
		}
	}
}
