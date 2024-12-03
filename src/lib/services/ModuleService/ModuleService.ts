import type { ModuleRepository } from "$lib/repository/ModuleRepository/ModuleRepository";
import type { NewModuleType, UpdateModuleType } from "$lib/types/module";

export class ModuleService {
	moduleRepo: ModuleRepository;

	constructor(moduleRepo: ModuleRepository) {
		this.moduleRepo = moduleRepo;
	}

	async save(module: NewModuleType) {
		return this.moduleRepo.save(module);
	}

	async update(module: UpdateModuleType) {
		return this.moduleRepo.update(module);
	}

	async all(societyId: string, courseId: string) {
		return this.moduleRepo.all(societyId, courseId);
	}

	async get(soceityId: string, courseId: string, id: string) {
		return this.moduleRepo.get(soceityId, courseId, id);
	}

	async delete(soceityId: string, courseId: string, id: string) {
		return this.moduleRepo.delete(soceityId, courseId, id);
	}
}
