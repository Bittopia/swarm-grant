import { error, fail, redirect, type RequestEvent, type ServerLoad } from '@sveltejs/kit';
import ObjectPathResolverUtil from '$lib/utils/ObjectPathResolver';
import type { ModuleType } from '$lib/types/module';
import moduleRepository from '$lib/repository/ModuleRepository';

export const load: ServerLoad = async ({ locals, parent }) => {
	await parent();

	if (!locals.user) {
		throw error(401, 'You must be logged in to create a new module');
	}
};

export const actions = {
	newModule: async ({ request }: RequestEvent) => {
		const [, societyId, , courseId] = ObjectPathResolverUtil.getObjectPathFromUrl(
			request.url
		) as string[];

		const data: FormData = await request?.formData();

		try {
			const module = Object.fromEntries(data) as unknown as ModuleType;

			if (!module.name || !module.description || !module.content) {
				return fail(400, { error: 'Please fill in all fields' });
			}
			await moduleRepository.save({ ...module, societyId, courseId });
		} catch (error) {
			if (error instanceof TypeError) {
				return fail(500, { error: error.message });
			}
		}

		throw redirect(302, `/societies/${societyId}/courses/${courseId}`);
	}
};
