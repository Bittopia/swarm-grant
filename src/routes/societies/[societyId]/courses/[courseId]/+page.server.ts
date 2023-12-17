import CourseService from '$lib/services/CourseService';

export async function load({ params }: never) {
	const { societyId, courseId } = params;

	const course = await CourseService.get(societyId, courseId);

	if (course) {
		return course;
	}

	return {
		status: 404,
		error: new Error(`Course ${courseId} not found`)
	};
}
