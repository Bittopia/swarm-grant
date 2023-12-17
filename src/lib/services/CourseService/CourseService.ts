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
}
