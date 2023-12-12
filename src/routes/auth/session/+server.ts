import { JWT_SECRET } from '$env/static/private';
import type { RequestEvent } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export async function GET({ cookies }: RequestEvent) {
	const token = cookies.get('jwt');

	if (!token) {
		return new Response(
			JSON.stringify({
				error: 'Unauthorized'
			}),
			{
				status: 401
			}
		);
	}

	const user = jwt.verify(token, JWT_SECRET);

	return new Response(JSON.stringify(user));
}
