import {
	fail,
	error,
	type ServerLoad,
	type RequestEvent,
	redirect,
} from "@sveltejs/kit";
import type { UpdateCourseType } from "$lib/types/course";
import courseRepository from "$lib/repository/CourseRepository";
import FileService from "$lib/services/FileService";
import courseService from "$lib/services/CourseService";

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

	if (!course) {
		throw error(404, "Course not found");
	}

	const isCourseCreator = locals.user.web3Address === course?.creator;

	if (!isCourseCreator) {
		throw error(401, "You must be the creator of the course to edit it");
	}

	return { course };
};

export const actions = {
	editCourse: async ({ request, params }: RequestEvent) => {
		const data: FormData = await request?.formData();

		try {
			const course = Object.fromEntries(data) as unknown as UpdateCourseType;

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

			const image = data.get("image") as File;

			if (image && image.size) {
				const url = await FileService.uploadFile(
					new File([image], `course-${course.name}`),
				);

				course.image = url;
			} else {
				course.image = null;
			}
			await courseService.update(course);
		} catch (error) {
			if (error instanceof Error) {
				return fail(500, {
					description: data.get("description"),
					error: error.message,
				});
			}
		}

		throw redirect(
			302,
			`/societies/${params.societyId}/courses/${params.courseId}`,
		);
	},
};
