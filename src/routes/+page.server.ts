import societyService from '$lib/services/SocietyService';

export const load = async () => {
	const societies = await societyService.all();
	console.log('LS -> src/routes/+page.server.ts:4 -> societies: ', societies);

	return { societies };
};
