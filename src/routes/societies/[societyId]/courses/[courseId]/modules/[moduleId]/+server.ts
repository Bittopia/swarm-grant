import { error, type RequestHandler } from "@sveltejs/kit";
import type { ModuleVideoType } from "$lib/types/module";
import ModuleService from "$lib/services/ModuleService";

export const PUT: RequestHandler = async ({ request, locals, params }) => {
	if (!locals.user) {
		throw error(401, "You must be logged in to upload a file");
	}

	console.log(
		"[LS] -> src/routes/societies/[societyId]/courses/[courseId]/modules/new/+server.ts:5 -> params: ",
		params,
	);

	if (!params.societyId || !params.courseId || !params.moduleId) {
		throw error(400, "Invalid parameters");
	}

	const { videos } = await request.json();

	if (!videos) {
		return new Response(JSON.stringify({ error: "No videos provided" }), {
			status: 400,
		});
	}

	const response = await ModuleService.update({
		id: params.moduleId,
		societyId: params.societyId,
		courseId: params.courseId,
		videos: videos as ModuleVideoType[],
	});

	return new Response(JSON.stringify({ url }), { status: 200 });
};
