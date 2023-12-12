// import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '$env/static/private';
// import { type Handle, fail } from '@sveltejs/kit';
// import type { UserType } from '$lib/types/user';
// import { isPublicPage } from '$lib/utils/publicRoutes';
//
// export const handle: Handle = async ({ event, resolve }) => {
// 	const path = event.route.id as string;
// 	console.log('hooks.server.ts: path: ', path);
//
// 	console.log('hooks.server.ts: isPublicPage(path): ', isPublicPage(path));
//
// 	if (!isPublicPage(path)) {
// 		const cookies = event.cookies;
// 		const token = cookies.get('jwt');
//
// 		console.log('hooks.server.ts: token: ', token);
//
// 		if (token) {
// 			try {
// 				const payload = jwt.verify(token, JWT_SECRET) as UserType;
//
// 				event.locals.user = {
// 					web3Address: payload.web3Address,
// 					nonce: payload.nonce,
// 					chainId: payload.chainId
// 				};
// 				event.locals.jwt = token;
// 				return await resolve(event);
// 			} catch (error) {
// 				throw fail(401, { error: 'Unauthorized' });
// 			}
// 		} else {
// 			throw fail(401, { error: 'Unauthorized' });
// 		}
// 	}
//
// 	return await resolve(event);
// };
