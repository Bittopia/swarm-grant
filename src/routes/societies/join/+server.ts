import type { RequestHandler } from '@sveltejs/kit';
import SocietyService from '$lib/services/SocietyService';

export const POST: RequestHandler = async ({ request, locals }) => {
	const { societyId } = await request.json();

	const user = locals.user;

	if (!user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401
		});
	}

	const data = await SocietyService.join(societyId, user.web3Address);

	return new Response(JSON.stringify(data));
};
