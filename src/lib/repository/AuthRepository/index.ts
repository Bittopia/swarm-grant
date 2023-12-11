import { BeeService } from '$lib/services/BeeService/BeeService';
import { RedisService } from '$lib/services/RedisService/RedisService';
import { AuthRepository } from './AuthRepository';

const authRepository = new AuthRepository({
	beeService: new BeeService(),
	redisService: new RedisService()
});

export default authRepository;
