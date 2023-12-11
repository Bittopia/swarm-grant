import { z } from 'zod';

export const MetamaskAccountSchema = z.object({
	address: z.string(),
	provider: z.object({
		chainId: z.string(),
		isMetaMask: z.boolean(),
		name: z.string(),
		networkVersion: z.string(),
		request: z.function()
	})
});

export type UserType = z.infer<typeof MetamaskAccountSchema>;
