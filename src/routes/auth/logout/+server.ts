import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = ({ cookies }) => {
	cookies.delete('jwt', { path: '/', httpOnly: true, secure: true, sameSite: 'strict' });

	return new Response(JSON.stringify({ success: true }));
};
