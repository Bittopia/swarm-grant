import AuthService from '$lib/services/AuthService';

export async function GET() {
	const nonce = await AuthService.getNonce();

	return new Response(JSON.stringify({ nonce }));
}
