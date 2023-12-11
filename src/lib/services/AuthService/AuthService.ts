import type { AuthRepository } from '$lib/repository/AuthRepository/AuthRepository';
import type { UserRepository } from '$lib/repository/UserRepository/UserRepository';
import type { AuthUserType } from '$lib/types/user';
import { JWT_SECRET } from '$env/static/private';

import { SiweMessage } from 'siwe';
import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';

export class AuthService {
	authRepo: AuthRepository;
	userRepo: UserRepository;

	constructor(authRepo: AuthRepository, userRepo: UserRepository) {
		this.authRepo = authRepo;
		this.userRepo = userRepo;
	}

	async getNonce() {
		return uuid();
	}

	async getSession(user: AuthUserType) {
		return await this.userRepo.get(user.web3Address);
	}

	async validateSignature(message: string, signature: string) {
		const siweMessage = new SiweMessage(message);

		const data = await siweMessage.verify({ signature });

		let isValid = false;
		let finalUser = null;

		const user = await this.userRepo.get(data.data.address);

		if (user) {
			if (data.data.address !== user.web3Address) {
				return { isValid: false };
			}
			const updated_user = { ...user, nonce: await this.getNonce() };

			await this.userRepo.update(updated_user);

			finalUser = updated_user;
			isValid = true;
		} else {
			const newUser = {
				web3Address: data.data.address,
				nonce: data.data.nonce,
				chainId: data.data.chainId
			};

			await this.userRepo.save(newUser);

			finalUser = newUser;
			isValid = true;
		}

		if (isValid) {
			const token = jwt.sign(
				{
					web3Address: finalUser.web3Address,
					nonce: finalUser.nonce,
					chainId: finalUser.chainId
				},
				JWT_SECRET
			);

			return { isValid, token };
		}

		return { isValid: false };
	}
}
