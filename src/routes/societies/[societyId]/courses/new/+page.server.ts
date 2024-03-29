import { fail, error, type ServerLoad, type RequestEvent, redirect } from '@sveltejs/kit';
import type { CourseType } from '$lib/types/course';
import ObjectPathResolverUtil from '$lib/utils/ObjectPathResolver';
import courseRepository from '$lib/repository/CourseRepository';

export const load: ServerLoad = async ({ locals, parent }) => {
	await parent();

	if (!locals.user) {
		throw error(401, 'Unauthorized');
	}
};

export const actions = {
	newCourse: async ({ request }: RequestEvent) => {
		const [, societyId] = ObjectPathResolverUtil.getObjectPathFromUrl(request.url) as string[];
		const data: FormData = await request?.formData();

		try {
			const course = Object.fromEntries(data) as unknown as CourseType;

			if (!course.name || !course.description || !course.startDate || !course.educator) {
				return { error: 'Please fill in all fields' };
			}

			await courseRepository.save({ ...course, societyId });
		} catch (error) {
			if (error instanceof Error) {
				return fail(500, {
					description: data.get('description'),
					error: error.message
				});
			}
		}

		throw redirect(302, `/societies/${societyId}`);
	}
};
