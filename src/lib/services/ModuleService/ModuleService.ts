import type { ModuleRepository } from '$lib/repository/ModuleRepository/ModuleRepository';
import type { NewModuleType } from '$lib/types/module';

export class ModuleService {
	moduleRepo: ModuleRepository;

	constructor(moduleRepo: ModuleRepository) {
		this.moduleRepo = moduleRepo;
	}

	async save(question: NewModuleType) {
		return this.moduleRepo.save(question);
	}

	async all(societyId: string, courseId: string) {
		return this.moduleRepo.all(societyId, courseId);
	}

	async get(soceityId: string, courseId: string, id: string) {
		return this.moduleRepo.get(soceityId, courseId, id);
	}
}
