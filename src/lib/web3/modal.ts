import { SiweMessage, generateNonce } from 'siwe';
import { createSIWEConfig } from '@web3modal/siwe';
import type { SIWECreateMessageArgs, SIWEVerifyMessageArgs } from '@web3modal/core';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { mainnet, arbitrum } from 'viem/chains';
import { invalidateAll } from '$app/navigation';

const projectId = '50cc71af34fb387c1661c4a396abc9f2';

const metadata = {
	name: 'Web3Modal',
	description: 'Bittopia University',
	url: 'https://swarm.bittopia.app',
	icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [mainnet, arbitrum];
const wagmiConfig = defaultWagmiConfig({
	chains,
	projectId,
	metadata
});

const siweConfig = createSIWEConfig({
	createMessage: ({ nonce, address, chainId }: SIWECreateMessageArgs) =>
		new SiweMessage({
			version: '1',
			domain: window.location.host,
			uri: window.location.origin,
			address,
			chainId,
			nonce,
			// Human-readable ASCII assertion that the user will sign, and it must not contain `\n`.
			statement: 'Sign in With Ethereum.'
		}).prepareMessage(),
	getNonce: async () => {
		console.log('Getting nonce');
		const nonce = generateNonce();
		console.log('LS -> src/lib/web3/modal.ts:39 -> nonce: ', nonce);

		return nonce;
	},
	verifyMessage: async ({ message, signature }: SIWEVerifyMessageArgs) => {
		console.log('Verifying message');
		// Use your SIWE server to verify if the message and the signature are valid
		// Your back-end will tipically rely on SiweMessage(message).validate(signature)
		const response = await fetch('/auth/validate', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ message, signature })
		});
		console.log('LS -> src/lib/web3/modal.ts:52 -> response: ', response);

		if (response.ok) {
			const { isValid } = await response.json();

			if (isValid) {
				invalidateAll();
				return true;
			} else {
				return false;
			}
		}

		return false;
	},
	getSession: async () => {
		console.log('Getting session');

		const response = await fetch('/auth/session');

		if (!response.ok) {
			throw new Error('Failed to get session!');
		}

		const data = await response.json();
		console.log('Session data', data);

		const { address, chainId } = data;

		return { address, chainId };
	},
	signOut: async () => {
		try {
			await fetch('/auth/logout', { method: 'POST' });
			invalidateAll();

			return true;
		} catch (error) {
			return false;
		}
	}
});

export const modal = createWeb3Modal({
	wagmiConfig,
	projectId,
	chains,
	metadata,
	enableAnalytics: true,
	siweConfig
});
