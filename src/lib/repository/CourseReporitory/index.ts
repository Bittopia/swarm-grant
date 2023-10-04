import {BeeService} from "$lib/services/BeeService/BeeService";
import {RedisService} from "$lib/services/RedisService/RedisService";
import {CourseRepository} from "$lib/repository/CourseReporitory/CourseReporitory";

const courseRepository = new CourseRepository({
  beeService: new BeeService(),
  redisService: new RedisService()
})

export default courseRepository
