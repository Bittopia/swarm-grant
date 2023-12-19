import societyService from '$lib/services/SocietyService';

export const load = async () => {
	const societies = await societyService.all();

	return { societies };
};
