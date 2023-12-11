import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import { type Handle, fail } from '@sveltejs/kit';
import type { UserType } from '$lib/types/user';

export const handle: Handle = async ({ event, resolve }) => {
	const bypassedRoutes = [
		'/auth/nonce',
		'/auth/validate',
		'/',
		'/societies/[societyId]',
		'/societies/[societyId]/courses/[courseId]',
		'/societies/[societyId]/courses/[courseId]/modules/[moduleId]',
		'/about'
	];

	const path = event.route.id as string;
	console.log('LS -> src/hooks.server.ts:17 -> path: ', path);

	// TODO: Maybe inverse this logic later
	if (!bypassedRoutes.includes(path)) {
		const token = event.request.headers.get('Authorization')?.split(' ')[1];
		console.log('LS -> src/hooks.server.ts:21 -> token: ', token);

		if (token) {
			try {
				const payload = jwt.verify(token, JWT_SECRET) as UserType;

				event.locals.user = {
					web3Address: payload.web3Address,
					nonce: payload.nonce,
					chainId: payload.chainId
				};
				event.locals.jwt = token;
				return await resolve(event);
			} catch (error) {
				throw fail(401, { error: 'Unauthorized' });
			}
		} else {
			throw fail(401, { error: 'Unauthorized' });
		}
	}

	return await resolve(event);
};
