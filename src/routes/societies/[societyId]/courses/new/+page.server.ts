import {
	fail,
	error,
	type ServerLoad,
	type RequestEvent,
	redirect,
} from "@sveltejs/kit";
import type { NewCourseType } from "$lib/types/course";
import ObjectPathResolverUtil from "$lib/utils/ObjectPathResolver";
import courseRepository from "$lib/repository/CourseRepository";
import FileService from "$lib/services/FileService";

export const load: ServerLoad = async ({ locals, parent }) => {
	await parent();

	if (!locals.user) {
		throw error(401, "Unauthorized");
	}
};

export const actions = {
	newCourse: async ({ locals, request }: RequestEvent) => {
		const [, societyId] = ObjectPathResolverUtil.getObjectPathFromUrl(
			request.url,
		) as string[];
		const data: FormData = await request?.formData();

		try {
			const course = Object.fromEntries(data) as unknown as NewCourseType;

			if (
				!course.name ||
				!course.description ||
				!course.startDate ||
				!course.educator
			) {
				return { error: "Please fill in all fields" };
			}

			if (course.imageFile && course.imageFile.size > 0) {
				course.image = await FileService.uploadImage(course.imageFile);
			}

			course.creator = locals.user.web3Address;

			await courseRepository.save({ ...course, societyId });
		} catch (error) {
			if (error instanceof Error) {
				return fail(500, {
					description: data.get("description"),
					error: error.message,
				});
			}
		}

		throw redirect(302, `/societies/${societyId}`);
	},
};
