import CourseService from "$lib/services/CourseService";
import { type RequestHandler, error } from "@sveltejs/kit";

export const DELETE: RequestHandler = async ({ locals, params }) => {
	if (!locals.user) {
		throw error(401, "You must be logged in to delete a module");
	}

	if (!params.societyId || !params.courseId) {
		throw error(400, "Invalid parameters");
	}

	const course = await CourseService.get(params.societyId, params.courseId);

	if (!course) {
		throw error(404, "Course not found");
	}

	if (course.creator !== locals.user.web3Address) {
		throw error(403, "You are not the owner of this course");
	}

	const success = await CourseService.delete(params.societyId, params.courseId);

	return new Response(JSON.stringify({ success }), { status: 200 });
};
