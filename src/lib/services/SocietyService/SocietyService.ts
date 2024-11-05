import type { SocietyRepository } from "$lib/repository/SocietyRepository/SocietyRepository";
import type { CourseType } from "$lib/types/course";
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
		let societies = data.societies;
		let users = data.users;

		const society_ids = Object.keys(societies);

		if (societies) {
			society_ids.forEach((society_id) => {
				let courses = societies[society_id].courses;

				if (courses) {
					const course_ids = Object.keys(courses);

					courses = course_ids.forEach((course_id: CourseType) => {
						const course = courses[course_id];

						course.educator_user = users[course.educator];

						societies[society_id].courses[course_id] = course;
					});
				}
			});
		}

		return societies;
	}

	async get(societyId: string) {
		const societies = await this.all();
		const society = societies[societyId];
		return society;
	}

	async update(society: UpdateSocietyType) {
		return await this.societyRepo.update(society);
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
