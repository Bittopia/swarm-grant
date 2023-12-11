import { fail, redirect, type RequestEvent } from '@sveltejs/kit';
import type { NewSocietyType } from '$lib/types/society';
import societyService from '$lib/services/SocietyService';

export const actions = {
	newSociety: async ({ request, locals }: RequestEvent) => {
		const user = locals.user;

		const data: FormData = await request.formData();

		try {
			const society = Object.fromEntries(data) as unknown as NewSocietyType;
			society.creator = user.web3Address;
			await societyService.save(society);
			return redirect(301, `/`);
		} catch (error: any) {
			return fail(500, {
				description: data.get('description'),
				error: error.message
			});
		}
	}
};
