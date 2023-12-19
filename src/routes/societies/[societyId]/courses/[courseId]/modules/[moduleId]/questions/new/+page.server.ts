import ObjectPathResolverUtil from '$lib/utils/ObjectPathResolver';
import { error, fail, redirect, type RequestEvent, type ServerLoad } from '@sveltejs/kit';
import QuestionService from '$lib/services/QuestionService';
import type { NewQuestionType } from '$lib/types/question';

export const load: ServerLoad = async ({ locals, parent }) => {
	await parent();

	if (!locals.user) {
		throw error(401, 'You must be logged in to create a new course');
	}
};

export const actions = {
	newQuestionnarie: async ({ request }: RequestEvent) => {
		const [, societyId, , courseId, , moduleId] = ObjectPathResolverUtil.getObjectPathFromUrl(
			request.url
		) as string[];

		console.log({ societyId, courseId, moduleId });

		const data: FormData = await request?.formData();

		const question = data.get('question') as string;
		const options = data.getAll('options[]') as string[];
		const rightAnswer = data.get('rightAnswer') as string;

		if (!question || !options || !rightAnswer) {
			return fail(500, {
				error: 'Missing question, options or right answer'
			});
		}

		for (let i = 0; i < options.length; i++) {
			const option = options[i];
			if (option === '') {
				return fail(500, {
					error: 'Option cannot be empty'
				});
			}
		}

		const questionnarie: NewQuestionType = {
			question,
			questionOptions: options,
			societyId,
			courseId,
			moduleId,
			rightOption: rightAnswer
		};

		try {
			await QuestionService.save(questionnarie);
		} catch (error) {
			if (error instanceof TypeError) {
				return fail(500, {
					error: error.message
				});
			}
		}

		throw redirect(302, `/societies/${societyId}/courses/${courseId}/modules/${moduleId}`);
	}
};
