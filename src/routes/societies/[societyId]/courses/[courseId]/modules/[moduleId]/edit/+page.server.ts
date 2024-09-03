import {
	error,
	fail,
	redirect,
	type RequestEvent,
	type ServerLoad,
} from "@sveltejs/kit";
import ObjectPathResolverUtil from "$lib/utils/ObjectPathResolver";
import type { ModuleType } from "$lib/types/module";
import moduleRepository from "$lib/repository/ModuleRepository";

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

	const module = await moduleRepository.get(
		params.societyId,
		params.courseId,
		params.moduleId,
	);

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
			const module = Object.fromEntries(data) as unknown as ModuleType;

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
			await moduleRepository.update(module);
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
