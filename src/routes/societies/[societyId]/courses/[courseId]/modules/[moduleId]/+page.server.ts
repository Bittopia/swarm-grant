import SocietyService from '$lib/services/SocietyService';
import ModuleRepository from '$lib/repository/ModuleRepository';
import CourseService from '$lib/services/CourseService';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ params, locals }) => {
	const { societyId, courseId, moduleId } = params;

	if (!societyId || !courseId || !moduleId) {
		return;
	}

	const module = await ModuleRepository.get(societyId, courseId, moduleId);

	const course = await CourseService.get(societyId, courseId);

	const canAddQuestions = course?.educator === locals.user?.web3Address;

	const isMemberOfSociety = await SocietyService.isMember(societyId, locals.user?.web3Address);

	if (module) {
		return { module, canAddQuestions, isMemberOfSociety };
	}

	return {
		status: 404,
		error: new Error(`Module with id ${moduleId} not found`)
	};
};
