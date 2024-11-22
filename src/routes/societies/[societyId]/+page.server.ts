import SocietyService from "$lib/services/SocietyService";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ params, parent, locals }) => {
	await parent();

	const user = locals.user;

	const { societyId } = params;

	if (!societyId) {
		return {
			status: 404,
			error: new Error(`Society ${societyId} not found`),
		};
	}

	const society = await SocietyService.get(societyId);

	const isMember = await SocietyService.isMember(
		society?.id,
		user?.web3Address,
	);

	const canEditSociety = user?.web3Address === society?.creator;

	if (society) {
		return {
			...society,
			isMember,
			canEditSociety,
		};
	}

	return {
		status: 404,
		error: new Error(`Society ${societyId} not found`),
	};
};
