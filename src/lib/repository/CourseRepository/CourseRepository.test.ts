import { describe, expect, it } from 'vitest';
import { CourseRepository } from '$lib/repository/CourseRepository/CourseReporitory';
import courseRepository from '$lib/repository/CourseRepository';
import societyRepository from '$lib/repository/SocietyRepository';
import type { CourseType } from '$lib/types/course';

describe('CourseReporitory', () => {
	it('should have CourseRepository defined', () => {
		expect(CourseRepository).toBeDefined();
	});

	it('should have save method defined', () => {
		expect(courseRepository.save).toBeDefined();
	});

	it('should have update method defined', () => {
		expect(courseRepository.update).toBeDefined();
	});

	it('should have all method defined', () => {
		expect(courseRepository.all).toBeDefined();
	});

	it('should have delete method defined', () => {
		expect(courseRepository.delete).toBeDefined();
	});

	it('should be able to save a course', async () => {
		const societies = await societyRepository.all();
		const course: CourseType = {
			name: 'test course',
			description: 'test course description',
			societyId: Object.keys(societies)[0]
		};
		const savedCourse = await courseRepository.save(course);

		expect(savedCourse?.id).toBeDefined();
		expect(savedCourse?.name).toBe(course.name);
		expect(savedCourse?.description).toBe(course.description);
	});

	it('should be able to update a course', async () => {
		const societies = await societyRepository.all();
		const course: CourseType = {
			name: 'test course',
			description: 'test course description',
			societyId: Object.keys(societies)[0]
		};
		const savedCourse = (await courseRepository.save(course)) as CourseType;
		savedCourse.name = 'updated course name';
		const updatedCourse = await courseRepository.update(savedCourse);

		expect(updatedCourse?.id).toBeDefined();
		expect(updatedCourse?.name).toBe('updated course name');
		expect(updatedCourse?.description).toBe(course.description);
	});

	it('should be able to get all courses', async () => {
		const societies = await societyRepository.all();
		const course: CourseType = {
			name: 'test course',
			description: 'test course description',
			societyId: Object.keys(societies)[0]
		};
		const savedCourse = (await courseRepository.save(course)) as CourseType;
		const courses = await courseRepository.all(savedCourse.societyId as string);

		expect(courses).toBeDefined();
		expect(Object.keys(courses as Record<string, CourseType>).length).toBeGreaterThan(0);
	});

	it('should be able to delete a course', async () => {
		const societies = await societyRepository.all();
		const course: CourseType = {
			name: 'test course',
			description: 'test course description',
			societyId: Object.keys(societies)[0]
		};
		const savedCourse = (await courseRepository.save(course)) as CourseType;
		const deleted = await courseRepository.delete(savedCourse);

		expect(deleted).toBe(true);
	});
});
