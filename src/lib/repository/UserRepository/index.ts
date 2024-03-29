import { BeeService } from '$lib/services/BeeService/BeeService';
import { RedisService } from '$lib/services/RedisService/RedisService';
import { UserRepository } from './UserRepository';

const userRepository = new UserRepository({
	beeService: new BeeService(),
	redisService: new RedisService()
});

export default userRepository;
