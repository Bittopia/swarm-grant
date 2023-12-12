import { error, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ locals, parent }) => {
	await parent();

	if (!locals.user) {
		throw error(401, 'You must be logged in to create a new course');
	}
};
