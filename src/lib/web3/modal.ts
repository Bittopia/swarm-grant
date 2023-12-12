import { SiweMessage, generateNonce } from 'siwe';
import { createSIWEConfig } from '@web3modal/siwe';
import type { SIWECreateMessageArgs, SIWEVerifyMessageArgs } from '@web3modal/core';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { mainnet, arbitrum } from 'viem/chains';

import { PUBLIC_WALLET_CONNECT_PROJECT_ID } from '$env/static/public';

const projectId = PUBLIC_WALLET_CONNECT_PROJECT_ID;

const metadata = {
	name: 'Web3Modal',
	description: 'Web3Modal Example',
	url: 'https://web3modal.com',
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
			console.log('LS -> src/lib/web3/modal.ts:55 -> isValid: ', isValid);

			if (isValid) {
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
