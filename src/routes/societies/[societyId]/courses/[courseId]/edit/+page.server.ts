import {
	fail,
	error,
	type ServerLoad,
	type RequestEvent,
	redirect,
} from "@sveltejs/kit";
import type { CourseType } from "$lib/types/course";
import courseRepository from "$lib/repository/CourseRepository";

export const load: ServerLoad = async ({ locals, parent, params }) => {
	await parent();

	if (!locals.user) {
		throw error(401, "Unauthorized");
	}

	if (!params.societyId) {
		throw error(404, "You must provide a society id");
	}

	if (!params.courseId) {
		throw error(404, "You must provide a course id");
	}

	const course = await courseRepository.get(params.societyId, params.courseId);

	return { course };
};

export const actions = {
	editCourse: async ({ request, params }: RequestEvent) => {
		const data: FormData = await request?.formData();

		try {
			const course = Object.fromEntries(data) as unknown as CourseType;

			if (
				!course.id ||
				!course.societyId ||
				!course.name ||
				!course.description ||
				!course.startDate ||
				!course.educator
			) {
				return { error: "Please fill in all fields" };
			}

			await courseRepository.update(course);
		} catch (error) {
			if (error instanceof Error) {
				return fail(500, {
					description: data.get("description"),
					error: error.message,
				});
			}
		}

		throw redirect(302, `/societies/${params.societyId}`);
	},
};
