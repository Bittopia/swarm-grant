import { error, type RequestHandler } from "@sveltejs/kit";
import ModuleService from "$lib/services/ModuleService";

export const DELETE: RequestHandler = async ({ locals, params }) => {
	if (!locals.user) {
		throw error(401, "You must be logged in to delete a module");
	}

	if (!params.societyId || !params.courseId || !params.moduleId) {
		throw error(400, "Invalid parameters");
	}

	const success = await ModuleService.delete(
		params.societyId,
		params.courseId,
		params.moduleId,
	);

	return new Response(JSON.stringify({ success }), { status: 200 });
};
