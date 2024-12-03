import CourseService from "$lib/services/CourseService";
import { type RequestHandler, error } from "@sveltejs/kit";

export const DELETE: RequestHandler = async ({ locals, params }) => {
	if (!locals.user) {
		throw error(401, "You must be logged in to delete a module");
	}

	if (!params.societyId || !params.courseId) {
		throw error(400, "Invalid parameters");
	}

	const success = await CourseService.delete(params.societyId, params.courseId);

	return new Response(JSON.stringify({ success }), { status: 200 });
};
