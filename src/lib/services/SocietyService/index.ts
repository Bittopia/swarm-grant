import {SocietyService} from "$lib/services/SocietyService/SocietyService";
import societyRepository from "$lib/repository/SocietyRepository";

const societyService = new SocietyService(societyRepository)

export default societyService
