import AuthService from '$lib/services/AuthService';
import type { RequestEvent } from '@sveltejs/kit';

export async function POST({ request }: RequestEvent) {
	const { message, signature } = await request.json();
	console.log('LS -> src/routes/auth/validate.ts:5 -> signature: ', signature);
	console.log('LS -> src/routes/auth/validate.ts:5 -> message: ', message);

	const data = await AuthService.validateSignature(message, signature);

	return new Response(JSON.stringify(data));
}
