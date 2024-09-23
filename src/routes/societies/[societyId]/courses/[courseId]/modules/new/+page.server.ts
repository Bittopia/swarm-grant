import {
	error,
	fail,
	redirect,
	type RequestEvent,
	type ServerLoad,
} from "@sveltejs/kit";
import type { NewModuleType } from "$lib/types/module";
import moduleService from "$lib/services/ModuleService";
import FileService from "$lib/services/FileService";

export const load: ServerLoad = async ({ locals, parent }) => {
	await parent();

	if (!locals.user) {
		throw error(401, "You must be logged in to create a new module");
	}
};

export const actions = {
	newModule: async ({ locals, request, params }: RequestEvent) => {
		const data: FormData = await request?.formData();

		try {
			const module = Object.fromEntries(data) as unknown as NewModuleType;

			if (!module.name || !module.description || !module.content) {
				return fail(400, { error: "Please fill in all fields" });
			}

			const image = data.get("image") as File;

			if (image && image.size) {
				const url = await FileService.uploadFile(
					new File([image], `module-${module.name}`),
				);

				module.image = url;
			}

			module.creator = locals.user.web3Address;

			await moduleService.save(module);
		} catch (error) {
			if (error instanceof TypeError) {
				return fail(500, { error: error.message });
			}
		}

		throw redirect(
			302,
			`/societies/${params.societyId}/courses/${params.courseId}`,
		);
	},
};
