import jwt from 'jsonwebtoken';
import type { LayoutServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit';
import { JWT_SECRET } from '$env/static/private';
import type { UserType } from '$lib/types/user';

const SECRET_KEY: string = JWT_SECRET;

export const load: LayoutServerLoad = async (event) => {
	const user = await getUserFromTokenInRequest(event);
	console.log('LS -> src/routes/+layout.server.ts:11 -> user: ', user);

	event.locals.user = user as UserType;

	return {
		props: { user }
	};
};

async function getUserFromTokenInRequest(event: RequestEvent) {
	const token = event.cookies.get('jwt');

	if (token) {
		try {
			return jwt.verify(token, SECRET_KEY);
		} catch {
			return null;
		}
	}
}
