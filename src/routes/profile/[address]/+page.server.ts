import { fail, type RequestEvent, type ServerLoad } from "@sveltejs/kit";
import UserService from "$lib/services/UserService";

export const load: ServerLoad = async ({ params, locals, parent }) => {
	await parent();

	const { address } = params;

	if (!address) {
		return;
	}

	const canEdit = locals.user != null && locals.user.web3Address === address;

	// const user = await UserService.get(address);

	return { canEdit };
};

export const actions = {
	saveBio: async ({ request, params, locals }: RequestEvent) => {
		const { address } = params;

		const data: FormData = await request?.formData();

		const bio = data.get("bio") as string;

		if (!bio) {
			return fail(500, {
				description: data.get("description"),
				error: "No bio provided",
			});
		}

		if (!address) {
			return fail(500, {
				description: data.get("description"),
				error: "No address provided",
			});
		}

		if (locals.user.web3Address !== address) {
			return fail(500, {
				description: data.get("description"),
				error: "You are not authorized to edit this user",
			});
		}

		await UserService.updateBio(address, bio);

		return { success: true };
	},
	saveInterests: async ({ request, params, locals }: RequestEvent) => {
		const { address } = params;

		const data: FormData = await request?.formData();

		const interests = data.get("interests") as string;

		if (!interests) {
			return fail(500, {
				description: data.get("description"),
				error: "No interests provided",
			});
		}

		if (!address) {
			return fail(500, {
				description: data.get("description"),
				error: "No address provided",
			});
		}

		if (locals.user.web3Address !== address) {
			return fail(500, {
				description: data.get("description"),
				error: "You are not authorized to edit this user",
			});
		}

		await UserService.updateInterests(address, interests);

		return { success: true };
	},
	saveName: async ({ request, params, locals }: RequestEvent) => {
		const { address } = params;

		const data: FormData = await request?.formData();

		const name = data.get("name") as string;

		if (!name) {
			return fail(500, {
				description: data.get("description"),
				error: "No interests provided",
			});
		}

		if (!address) {
			return fail(500, {
				description: data.get("description"),
				error: "No address provided",
			});
		}

		if (locals.user.web3Address !== address) {
			return fail(500, {
				description: data.get("description"),
				error: "You are not authorized to edit this user",
			});
		}

		await UserService.updateName(address, name);

		return { success: true };
	},
	saveLocation: async ({ request, params, locals }: RequestEvent) => {
		const { address } = params;

		const data: FormData = await request?.formData();

		const location = data.get("location") as string;

		if (!location) {
			return fail(500, {
				description: data.get("description"),
				error: "No interests provided",
			});
		}

		if (!address) {
			return fail(500, {
				description: data.get("description"),
				error: "No address provided",
			});
		}

		if (locals.user.web3Address !== address) {
			return fail(500, {
				description: data.get("description"),
				error: "You are not authorized to edit this user",
			});
		}

		await UserService.updateLocation(address, location);

		return { success: true };
	},
};
