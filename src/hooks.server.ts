import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import { type Handle, fail } from '@sveltejs/kit';
import type { UserType } from '$lib/types/user';

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = event.cookies;
	const token = cookies.get('jwt');

	console.log('hooks.server.ts: token: ', token);

	if (token) {
		try {
			const payload = jwt.verify(token, JWT_SECRET) as UserType;

			event.locals.user = {
				web3Address: payload.web3Address,
				nonce: payload.nonce,
				chainId: payload.chainId
			};
			return await resolve(event);
		} catch (error) {
			throw fail(401, { error: 'Unauthorized' });
		}
	}

	return await resolve(event);
};
