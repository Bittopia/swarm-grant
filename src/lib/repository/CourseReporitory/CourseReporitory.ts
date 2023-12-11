import type { BeeService } from '$lib/services/BeeService/BeeService';
import type { RedisService } from '$lib/services/RedisService/RedisService';
import type { CourseType, NewCourseType } from '$lib/types/course';

import { uuid } from 'uuidv4';
import societyRepository from '$lib/repository/SocietyRepository';
import set from 'lodash.set';

export class CourseRepository {
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

	async save(course: NewCourseType) {
		const data = await societyRepository.all();
		const societies = data.societies;

		const id = uuid();

		set(societies, [course.societyId, 'courses', id], { id, ...course });

		const { reference } = await this.beeService.mutate({ data: { ...data, societies } });

		await this.redisService.setData('reference', reference);
		return societies[course.societyId as string].courses?.[id];
	}

	async update(course: CourseType) {
		const data = await societyRepository.all();
		const societies = data.societies;

		set(societies, [course.societyId, 'courses', course.id], course);

		const { reference } = await this.beeService.mutate({ data: { ...data, societies } });

		await this.redisService.setData('reference', reference);
		return societies[course.societyId].courses?.[course.id as string];
	}

	async all(societyId: string) {
		const data = await societyRepository.all();
		const societies = data.societies;

		if (societies[societyId]) {
			return societies[societyId].courses;
		}
		return [];
	}

	async delete(course: CourseType) {
		try {
			const data = await societyRepository.all();
			const societies = data.societies;

			set(societies, [course.societyId, 'courses', course.id], undefined);

			const { reference } = await this.beeService.mutate({ data: { ...data, societies } });
			await this.redisService.setData('reference', reference);
			return true;
		} catch (e) {
			return false;
		}
	}
}
