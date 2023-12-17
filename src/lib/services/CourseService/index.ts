import CourseRepository from '$lib/repository/CourseRepository';
import { CourseService } from './CourseService';

const courseService = new CourseService(CourseRepository);

export default courseService;
