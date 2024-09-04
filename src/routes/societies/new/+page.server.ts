import {
	error,
	fail,
	redirect,
	type RequestEvent,
	type ServerLoad,
} from "@sveltejs/kit";
import type { NewSocietyType } from "$lib/types/society";
import societyService from "$lib/services/SocietyService";
import FileService from "$lib/services/FileService";

export const load: ServerLoad = async ({ locals, parent }) => {
	await parent();

	if (!locals.user) {
		throw error(401, "You must be logged in to create a new society");
	}
};

export const actions = {
	newSociety: async ({ request, locals }: RequestEvent) => {
		if (!locals.user) {
			return fail(401, {
				description: "You must be logged in to create a new society",
				error: "Unauthorized",
			});
		}

		const user = locals.user;

		const data: FormData = await request.formData();

		try {
			const society = Object.fromEntries(data) as unknown as NewSocietyType;

			if (!society.name || !society.description) {
				return fail(400, {
					error:
						"You must provide a name and description for your society, please try again",
				});
			}

			if (society.imageFile && society.imageFile.size > 0) {
				society.image = await FileService.uploadImage(society.imageFile);
			}

			society.creator = user.web3Address;
			await societyService.save(society);
		} catch (error: any) {
			return fail(500, {
				description: data.get("description"),
				error: error.message,
			});
		}

		throw redirect(301, `/`);
	},
};
