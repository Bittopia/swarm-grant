import jwt from "jsonwebtoken";
import { JWT_SECRET } from "$env/static/private";
import { type Handle, fail } from "@sveltejs/kit";
import type { UserType } from "$lib/types/user";
import userService from "$lib/services/UserService";

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = event.cookies;
	const token = cookies.get("jwt");

	if (token) {
		try {
			const payload = jwt.verify(token, JWT_SECRET) as UserType;

			const user = await userService.get(payload.web3Address);

			event.locals.user = {
				...user,
				jwt: token,
			};
			return await resolve(event);
		} catch (error) {
			throw fail(401, { error: "Unauthorized" });
		}
	}

	return await resolve(event);
};
