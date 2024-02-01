import CourseService from '$lib/services/CourseService';
import SocietyService from '$lib/services/SocietyService';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ params, parent, locals }) => {
	await parent();

	const { societyId, courseId } = params;

	if (!societyId || !courseId) {
		return {
			status: 404,
			error: new Error(`Course ${courseId} not found`)
		};
	}

	const course = await CourseService.get(societyId, courseId);

	const canCreateModules = course?.educator === locals.user?.web3Address;

	const isMember = await CourseService.isMember(societyId, courseId, locals.user?.web3Address);

	const isMemberOfSociety = await SocietyService.isMember(societyId, locals.user?.web3Address);

	if (course) {
		return { course, canCreateModules, isMember, isMemberOfSociety };
	}

	return {
		status: 404,
		error: new Error(`Course ${courseId} not found`)
	};
};
