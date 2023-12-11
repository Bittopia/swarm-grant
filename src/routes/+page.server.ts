import societyService from '$lib/services/SocietyService';

export const load = async () => {
	return await societyService.all();
};
