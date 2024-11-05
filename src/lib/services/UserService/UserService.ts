import type { UserRepository } from "$lib/repository/UserRepository/UserRepository";

export class UserService {
	userRepo: UserRepository;

	constructor(userRepository: UserRepository) {
		this.userRepo = userRepository;
	}

	async get(address: string) {
		return this.userRepo.get(address);
	}

  async getAll() {
    return this.userRepo.getAll()
  }

	async updateBio(address: string, bio: string) {
		return this.userRepo.updateBio(address, bio);
	}

	async updateInterests(address: string, interests: string) {
		return this.userRepo.updateInterests(address, interests);
	}

	async updateName(address: string, name: string) {
		return this.userRepo.updateName(address, name);
	}

	async updateLocation(address: string, location: string) {
		return this.userRepo.updateLocation(address, location);
	}

	async updateAvatar(address: string, avatarUrl: string) {
		return this.userRepo.updateAvatar(address, avatarUrl);
	}
}
