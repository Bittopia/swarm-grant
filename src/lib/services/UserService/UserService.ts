import type { UserRepository } from '$lib/repository/UserRepository/UserRepository';

export class UserService {
	userRepo: UserRepository;

	constructor(userRepository: UserRepository) {
		this.userRepo = userRepository;
	}

	async get(address: string) {
		return this.userRepo.get(address);
	}

	async updateBio(address: string, bio: string) {
		return this.userRepo.updateBio(address, bio);
	}
}
