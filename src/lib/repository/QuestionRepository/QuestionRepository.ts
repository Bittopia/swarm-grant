import type { BeeService } from '$lib/services/BeeService/BeeService';
import type { RedisService } from '$lib/services/RedisService/RedisService';
import type { NewQuestionType, QuestionType } from '$lib/types/question';

import societyRepository from '$lib/repository/SocietyRepository';
import { uuid } from 'uuidv4';
import set from 'lodash.set';

export class QuestionRepository {
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

	async save(question: NewQuestionType) {
		const data = await societyRepository.all();
		const societies = data.societies;

		try {
			const id = uuid();

			set(
				societies,
				[
					question.societyId,
					'courses',
					question.courseId,
					'modules',
					question.moduleId,
					'questions',
					id
				],
				{ id, ...question }
			);

			const { reference } = await this.beeService.mutate({ data: { ...data, societies } });

			await this.redisService.setData('reference', reference);
			return societies[question.societyId as string].courses?.[question.courseId].modules?.[id];
		} catch (e) {
			throw new Error('Not able to save module', e as Error);
		}
	}

	async update(question: QuestionType) {
		const data = await societyRepository.all();
		const societies = data.societies;

		set(
			societies,
			[
				question.societyId,
				'courses',
				question.courseId,
				'modules',
				question.moduleId,
				'questions',
				question.id
			],
			question
		);

		const { reference } = await this.beeService.mutate({ data: { ...data, societies } });

		await this.redisService.setData('reference', reference);
		return societies[question.societyId].courses?.[question.courseId as string].modules?.[
			question.id as string
		];
	}

	async all(societyId: string, courseId: string, moduleId: string) {
		const data = await societyRepository.all();
		const societies = data.societies;

		if (societies[societyId]) {
			return societies[societyId].courses?.[courseId].modules?.[moduleId].questions;
		}
		return [];
	}

	async delete(question: QuestionType) {
		try {
			const data = await societyRepository.all();
			const societies = data.societies;

			set(
				societies,
				[
					question.societyId,
					'courses',
					question.courseId,
					'modules',
					question.moduleId,
					'questions',
					question.id
				],
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
