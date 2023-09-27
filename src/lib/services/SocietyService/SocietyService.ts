import type {SocietyRepository} from "$lib/repository/SocietyRepository/SocietyRepository";
import type {SocietyType} from "$lib/types/society";

export class SocietyService {
  societyRepo: SocietyRepository
  constructor(societyRepo: SocietyRepository) {
    this.societyRepo = societyRepo
  }

  async save(society: SocietyType) {
    return await this.societyRepo.save(society)
  }

  async all() {
    return await this.societyRepo.all()
  }

  async update(society: SocietyType) {
    return await this.societyRepo.update(society)
  }

  async delete(societyId: string) {
    return await this.societyRepo.delete(societyId)
  }
}
