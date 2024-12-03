import { error, type RequestHandler } from "@sveltejs/kit";
import ModuleService from "$lib/services/ModuleService";
import CourseService from "$lib/services/CourseService";

export const DELETE: RequestHandler = async ({ locals, params }) => {
	if (!locals.user) {
		throw error(401, "You must be logged in to delete a module");
	}

	if (!params.societyId || !params.courseId || !params.moduleId) {
		throw error(400, "Invalid parameters");
	}

	const course = await CourseService.get(params.societyId, params.courseId);

	if (!course) {
		throw error(404, "Course not found");
	}

	if (course.creator !== locals.user.web3Address) {
		throw error(403, "You are not the owner of this course");
	}

	const success = await ModuleService.delete(
		params.societyId,
		params.courseId,
		params.moduleId,
	);

	return new Response(JSON.stringify({ success }), { status: 200 });
};
