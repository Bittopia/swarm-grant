// See https://kit.svelte.dev/docs/types#app

import type { AuthUserType } from '$lib/types/user';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: AuthUserType;
			jwt: string;
		}
		// interface PageData {}
		// interface Platform {}
	}
	interface Window {
		ethereum: any;
	}
	interface SIWEClientMethods {
		verifyMessage: (args: SIWEVerifyMessageArgs) => Promise<true>;
	}
}

export {};
