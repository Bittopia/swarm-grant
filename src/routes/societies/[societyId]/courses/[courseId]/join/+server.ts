import type { RequestHandler } from '@sveltejs/kit';
import CourseService from '$lib/services/CourseService';

export const POST: RequestHandler = async ({ locals, params }) => {
	const { societyId, courseId } = params;

	if (!societyId || !courseId) {
		return new Response(JSON.stringify({ error: 'Invalid societyId or courseId' }), {
			status: 400
		});
	}

	const user = locals.user;

	if (!user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401
		});
	}

	const data = await CourseService.join(societyId, courseId, user.web3Address);


	return new Response(JSON.stringify(data));
};
