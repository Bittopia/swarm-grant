import type { RequestHandler } from '@sveltejs/kit';
import SocietyService from '$lib/services/SocietyService';

export const POST: RequestHandler = async ({ request, locals }) => {
	const { societyId } = await request.json();

	const user = locals.user;
	console.log('LS -> src/routes/societies/join/+page.server.ts:7 -> locals: ', locals);

	if (!user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401
		});
	}

	const data = await SocietyService.leave(societyId, user.web3Address);

	return new Response(JSON.stringify(data));
};
