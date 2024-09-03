import type { RequestHandler } from "./$types";
import UserService from "$lib/services/UserService";

export const PUT: RequestHandler = async ({ request, locals, params }) => {
	const { avatarUrl } = await request.json();

	const { address } = params;

	if (locals.user.web3Address !== address) {
		return new Response(
			JSON.stringify({ error: "You are not authorized to edit this user" }),
			{ status: 401 },
		);
	}

	if (!avatarUrl) {
		return new Response(JSON.stringify({ error: "No avatar provided" }), {
			status: 400,
		});
	}

	await UserService.updateAvatar(locals.user.web3Address, avatarUrl);

	return new Response(JSON.stringify({ success: true }), { status: 200 });
};
