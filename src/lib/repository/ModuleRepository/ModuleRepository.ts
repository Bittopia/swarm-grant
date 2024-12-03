import type { BeeService } from "$lib/services/BeeService/BeeService";
import type { RedisService } from "$lib/services/RedisService/RedisService";
import type {
	ModuleType,
	ModuleVideoType,
	NewModuleType,
	UpdateModuleType,
} from "$lib/types/module";

import societyRepository from "$lib/repository/SocietyRepository";
import { uuid } from "uuidv4";
import set from "lodash.set";

export class ModuleRepository {
	private beeService: BeeService;
	private redisService: RedisService;

	constructor({
		beeService,
		redisService,
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

			set(
				societies,
				[module.societyId, "courses", module.courseId, "modules", id],
				{
					id,
					...module,
				},
			);

			const { reference } = await this.beeService.mutate({
				data: { ...data, societies },
			});

			await this.redisService.setData("reference", reference);
			return societies[module.societyId as string].courses?.[module.courseId]
				.modules?.[id];
		} catch (e) {
			throw new Error("Not able to save module", e as Error);
		}
	}

	async update(module: UpdateModuleType) {
		const data = await societyRepository.all();
		const societies = data.societies;

		if (!module.societyId) {
			return null;
		}

		if (!module.courseId) {
			return null;
		}

		if (!module.id) {
			return null;
		}

		const updatedModule: Record<string, any> = {};

		if (module.name) updatedModule.name = module.name;
		if (module.description) updatedModule.description = module.description;
		if (module.content) updatedModule.content = module.content;
		if (module.image) updatedModule.image = module.image;

		if (module.videos) {
			const current_videos =
				societies[module.societyId].courses?.[module.courseId].modules?.[
					module.id
				]?.videos;

			let videos: ModuleVideoType[] = [];

			if (current_videos) {
				videos = [...current_videos, ...videos];
			}

			updatedModule.videos = videos;
		}

		set(
			societies,
			[module.societyId, "courses", module.courseId, "modules", module.id],
			{
				...societies[module.societyId].courses?.[module.courseId].modules?.[
					module.id
				],
				...updatedModule,
			},
		);

		const { reference } = await this.beeService.mutate({
			data: { ...data, societies },
		});

		await this.redisService.setData("reference", reference);
		return societies[module.societyId].courses?.[module.courseId as string]
			.modules?.[module.id as string];
	}

	async all(societyId: string, courseId: string) {
		const data = await societyRepository.all();
		const societies = data.societies;

		if (societies[societyId]) {
			return societies[societyId].courses?.[courseId].modules;
		}

		return {};
	}

	async get(societyId: string, courseId: string, moduleId: string) {
		const modules = await this.all(societyId, courseId);

		if (modules) return modules[moduleId];

		return null;
	}

	async delete(societyId: string, courseId: string, moduleId: string) {
		try {
			const data = await societyRepository.all();
			const societies = data.societies;

			set(
				societies,
				[societyId, "courses", courseId, "modules", moduleId],
				undefined,
			);

			const { reference } = await this.beeService.mutate({
				data: { ...data, societies },
			});
			await this.redisService.setData("reference", reference);
			return true;
		} catch (e) {
			return false;
		}
	}
}
