import { error, type RequestHandler } from "@sveltejs/kit";
import FileService from "$lib/services/FileService";

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		throw error(401, "You must be logged in to upload a file");
	}

	const formData = await request.formData();

	const file = formData.get("file") as File;

	if (!file) {
		return new Response(JSON.stringify({ error: "No file provided" }), {
			status: 400,
		});
	}

	const url = await FileService.uploadFile(file);

	return new Response(JSON.stringify({ url }), { status: 200 });
};
