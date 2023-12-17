import ModuleRepository from '$lib/repository/ModuleRepository';
import { ModuleService } from './ModuleService';

const moduleService = new ModuleService(ModuleRepository);

export default moduleService;
