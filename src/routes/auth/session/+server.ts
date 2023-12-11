import AuthService from '$lib/services/AuthService';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET({ locals }: RequestEvent) {
	if (!locals.user) {
		return new Response(
			JSON.stringify({
				error: 'Unauthorized'
			}),
			{
				status: 401
			}
		);
	}

	const user = await AuthService.getSession(locals.user);

	return new Response(JSON.stringify(user));
}
