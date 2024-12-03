import type { BeeService } from "$lib/services/BeeService/BeeService";
import type { RedisService } from "$lib/services/RedisService/RedisService";
import type {
	CourseType,
	NewCourseType,
	UpdateCourseType,
} from "$lib/types/course";

import { uuid } from "uuidv4";
import societyRepository from "$lib/repository/SocietyRepository";
import set from "lodash.set";

export class CourseRepository {
	private beeService: BeeService;
	private redisService: RedisService;

	constructor({
		beeService,
		redisService,
	}: {
		beeService: BeeService;
		redisService: RedisService;
	}) {
		this.beeService = beeService;
		this.redisService = redisService;
	}

	async save(course: NewCourseType) {
		const data = await societyRepository.all();
		const societies = data.societies;

		const id = uuid();

		set(societies, [course.societyId, "courses", id], { id, ...course });

		const { reference } = await this.beeService.mutate({
			data: { ...data, societies },
		});

		await this.redisService.setData("reference", reference);
		return societies[course.societyId as string].courses?.[id];
	}

	async update(course: UpdateCourseType) {
		const data = await societyRepository.all();
		const societies = data.societies;

		if (!course.societyId) {
			return null;
		}

		const updatedCourse: Record<string, any> = {};

		if (course.image) updatedCourse.image = course.image;
		if (course.name) updatedCourse.name = course.name;
		if (course.description) updatedCourse.description = course.description;
		if (course.startDate) updatedCourse.startDate = course.startDate;
		if (course.educator) updatedCourse.educator = course.educator;
		if (course.members) updatedCourse.members = course.members;

		set(societies, [course.societyId, "courses", course.id], {
			...societies[course.societyId].courses?.[course.id],
			...updatedCourse,
		});

		const { reference } = await this.beeService.mutate({
			data: { ...data, societies },
		});

		await this.redisService.setData("reference", reference);
		return societies[course.societyId].courses?.[course.id as string];
	}

	async all(societyId: string) {
		const data = await societyRepository.all();
		const societies = data.societies;
		const users = Object.values(data.users);

		if (societies[societyId]) {
			const courses = societies[societyId].courses;

			for (const courseId in courses) {
				courses[courseId].users = courses[courseId].members?.map(
					(memberAddress: string) =>
						users.find((user) => user.web3Address === memberAddress) ??
						memberAddress,
				);

				courses[courseId].educator_user = users.find(
					(user) => user.web3Address === courses[courseId].educator,
				);

				console.log({ courses });
			}

			return societies[societyId].courses;
		}
		return {};
	}

	async get(societyId: string, courseId: string) {
		const courses = await this.all(societyId);

		if (courses) return courses[courseId];

		return null;
	}

	async delete(societyId: string, courseId: string) {
		try {
			const data = await societyRepository.all();
			const societies = data.societies;

			set(societies, [societyId, "courses", courseId], undefined);

			const { reference } = await this.beeService.mutate({
				data: { ...data, societies },
			});
			await this.redisService.setData("reference", reference);
			return true;
		} catch (e) {
			return false;
		}
	}

	async join(societyId: string, courseId: string, web3Address: string) {
		try {
			const course = await this.get(societyId, courseId);

			if (!course) {
				return { success: false };
			}

			if (!course.members) {
				course.members = [];
			}

			await this.update({
				...course,
				members: [...course.members, web3Address],
			});

			return { success: true };
		} catch (e) {
			return { success: false };
		}
	}

	async leave(societyId: string, courseId: string, web3Address: string) {
		try {
			const course = await this.get(societyId, courseId);

			if (!course) {
				return { success: false };
			}

			if (!course.members) {
				course.members = [];
			}

			await this.update({
				...course,
				members: course.members.filter((member) => member !== web3Address),
			});

			return { success: true };
		} catch (e) {
			return { success: false };
		}
	}
}
