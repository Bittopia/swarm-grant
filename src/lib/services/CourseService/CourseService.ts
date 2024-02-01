import type { CourseRepository } from '$lib/repository/CourseRepository/CourseReporitory';
import type { NewCourseType } from '$lib/types/course';

export class CourseService {
	courseRepo: CourseRepository;

	constructor(courseRepo: CourseRepository) {
		this.courseRepo = courseRepo;
	}

	async save(question: NewCourseType) {
		return this.courseRepo.save(question);
	}

	async all(societyId: string) {
		return this.courseRepo.all(societyId);
	}

	async get(soceityId: string, courseId: string) {
		return this.courseRepo.get(soceityId, courseId);
	}

	async join(societyId: string, courseId: string, web3Address: string) {
		return await this.courseRepo.join(societyId, courseId, web3Address);
	}

	async leave(societyId: string, courseId: string, web3Address: string) {
		const response = await this.courseRepo.leave(societyId, courseId, web3Address);
		console.log('leave response', response);
		return response;
	}

	async isMember(societyId: string, courseId: string, web3Address: string) {
		const course = await this.get(societyId, courseId);

		return course?.members?.includes(web3Address);
	}
}
