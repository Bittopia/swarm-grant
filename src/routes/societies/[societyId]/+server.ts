import SocietyService from "$lib/services/SocietyService";
import { type RequestHandler, error } from "@sveltejs/kit";

export const DELETE: RequestHandler = async ({ locals, params }) => {
	if (!locals.user) {
		throw error(401, "You must be logged in to delete a module");
	}

	if (!params.societyId) {
		throw error(400, "Invalid parameters");
	}

	const success = await SocietyService.delete(params.societyId);

	return new Response(JSON.stringify({ success }), { status: 200 });
};
