import type { SocietyRepository } from "$lib/repository/SocietyRepository/SocietyRepository";
import type {
	NewSocietyType,
	SocietyType,
	UpdateSocietyType,
} from "$lib/types/society";

export class SocietyService {
	societyRepo: SocietyRepository;
	constructor(societyRepo: SocietyRepository) {
		this.societyRepo = societyRepo;
	}

	async save(society: NewSocietyType) {
		return await this.societyRepo.save(society);
	}

	async all() {
		const data = await this.societyRepo.all();
		return data.societies;
	}

	async get(societyId: string) {
		const societies = await this.all();
		return societies[societyId];
	}

	async update(id: string, society: UpdateSocietyType) {
		return await this.societyRepo.update(id, society);
	}

	async delete(societyId: string) {
		return await this.societyRepo.delete(societyId);
	}

	async join(societyId: string, web3Address: string) {
		return await this.societyRepo.join(societyId, web3Address);
	}

	async leave(societyId: string, web3Address: string) {
		return await this.societyRepo.leave(societyId, web3Address);
	}

	async isMember(societyId: string, web3Address: string) {
		const society = await this.get(societyId);

		return society?.members?.includes(web3Address);
	}
}
