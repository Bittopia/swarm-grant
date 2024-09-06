import {
	error,
	fail,
	redirect,
	type RequestEvent,
	type ServerLoad,
} from "@sveltejs/kit";
import type { UpdateModuleType } from "$lib/types/module";
import moduleService from "$lib/services/ModuleService";
import courseService from "$lib/services/CourseService";
import FileService from "$lib/services/FileService";

export const load: ServerLoad = async ({ locals, parent, params }) => {
	await parent();

	if (!locals.user) {
		throw error(401, "You must be logged in to create a new module");
	}

	if (!params.societyId) {
		throw error(404, "You must provide a society id");
	}

	if (!params.courseId) {
		throw error(404, "You must provide a course id");
	}

	if (!params.moduleId) {
		throw error(404, "You must provide a module id");
	}

	const module = await moduleService.get(
		params.societyId,
		params.courseId,
		params.moduleId,
	);

	if (!module) {
		throw error(404, "Module not found");
	}

	const course = await courseService.get(params.societyId, params.courseId);

	const canEditModule =
		locals.user?.web3Address === module?.creator ||
		course?.creator === locals.user?.web3Address;

	if (!canEditModule) {
		throw error(401, `You must be the creator of the module to edit it`);
	}

	return { module };
};

export const actions = {
	editModule: async ({ request, params }: RequestEvent) => {
		if (!params.societyId) {
			throw error(404, "You must provide a society id");
		}

		if (!params.courseId) {
			throw error(404, "You must provide a course id");
		}

		if (!params.moduleId) {
			throw error(404, "You must provide a module id");
		}

		const data: FormData = await request?.formData();

		try {
			const module = Object.fromEntries(data) as unknown as UpdateModuleType;

			if (
				!module.id ||
				!module.societyId ||
				!module.courseId ||
				!module.name ||
				!module.description ||
				!module.content
			) {
				return fail(400, { error: "Please fill in all fields" });
			}

			if (module.imageFile && module.imageFile.size > 0) {
				module.image = await FileService.uploadImage(module.imageFile);
			}

			await moduleService.update(module);
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
