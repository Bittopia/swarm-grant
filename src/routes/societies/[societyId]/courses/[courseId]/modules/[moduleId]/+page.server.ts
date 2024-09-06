import SocietyService from "$lib/services/SocietyService";
import ModuleRepository from "$lib/repository/ModuleRepository";
import CourseService from "$lib/services/CourseService";
import { error, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ params, locals }) => {
	const { societyId, courseId, moduleId } = params;

	if (!societyId || !courseId || !moduleId) {
		return;
	}

	const module = await ModuleRepository.get(societyId, courseId, moduleId);

	const course = await CourseService.get(societyId, courseId);

	const isMemberOfSociety = await SocietyService.isMember(
		societyId,
		locals.user?.web3Address,
	);

	if (!course) {
		throw error(404, `Course with id ${courseId} not found`);
	}

	if (!module) {
		throw error(404, `Module with id ${moduleId} not found`);
	}

	const canAddQuestions =
		course?.educator === locals.user?.web3Address ||
		module?.creator === locals.user?.web3Address ||
		course?.creator === locals.user?.web3Address;

	return { module, canAddQuestions, isMemberOfSociety };
};
