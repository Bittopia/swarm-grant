import {
	error,
	fail,
	redirect,
	type RequestEvent,
	type ServerLoad,
} from "@sveltejs/kit";
import type { UpdateSocietyType } from "$lib/types/society";
import societyService from "$lib/services/SocietyService";
import FileService from "$lib/services/FileService";

export const load: ServerLoad = async ({ locals, parent, params }) => {
	await parent();

	if (!locals.user) {
		throw error(401, "You must be logged in to edit a new society");
	}

	if (!params.societyId) {
		throw error(404, "You must provide a society id");
	}

	const society = await societyService.get(params.societyId);

	const isSocietyCreator = locals.user.web3Address === society.creator;

	if (!isSocietyCreator) {
		throw error(401, "You must be the creator of the society to edit it");
	}

	return { society };
};

export const actions = {
	editSociety: async ({ request, locals, params }: RequestEvent) => {
		if (!locals.user) {
			return fail(401, {
				description: "You must be logged in to create a new society",
				error: "Unauthorized",
			});
		}

		if (params.societyId === undefined) {
			return fail(404, {
				description: "You must provide a society id",
				error: "Not Found",
			});
		}

		const user = locals.user;

		const data: FormData = await request.formData();

		try {
			const society = Object.fromEntries(data) as unknown as UpdateSocietyType;

			if (!society.id || !society.name || !society.description) {
				return fail(400, {
					error:
						"You must provide a name and description for your society, please try again",
				});
			}

			society.creator = user.web3Address;
			await societyService.update(society);
		} catch (error: any) {
			return fail(500, {
				description: data.get("description"),
				error: error.message,
			});
		}

		throw redirect(301, `/societies/${params.societyId}`);
	},
};
