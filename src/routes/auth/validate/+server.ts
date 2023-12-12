import AuthService from '$lib/services/AuthService';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
	const { message, signature } = await request.json();

	const data = await AuthService.validateSignature(message, signature);

	const headers: Record<string, string> = {};

	if (data.token) {
		headers['Set-Cookie'] = `jwt=${data.token}; Path=/; HttpOnly; Secure; SameSite=Strict;`;
	}

	console.log('headers: ', headers);
	console.log('data', data);

	return new Response(JSON.stringify(data), { headers });
};
