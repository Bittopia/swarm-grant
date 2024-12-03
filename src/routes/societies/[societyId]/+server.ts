import SocietyService from "$lib/services/SocietyService";
import { type RequestHandler, error } from "@sveltejs/kit";

export const DELETE: RequestHandler = async ({ locals, params }) => {
	if (!locals.user) {
		throw error(401, "You must be logged in to delete a module");
	}

	if (!params.societyId) {
		throw error(400, "Invalid parameters");
	}

	const society = await SocietyService.get(params.societyId);

	if (!society) {
		throw error(404, "Society not found");
	}

	if (society.creator !== locals.user.web3Address) {
		throw error(403, "You are not allowed to delete this society");
	}

	const success = await SocietyService.delete(params.societyId);

	return new Response(JSON.stringify({ success }), { status: 200 });
};
