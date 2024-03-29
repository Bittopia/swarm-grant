import { BeeService } from '$lib/services/BeeService/BeeService';
import { RedisService } from '$lib/services/RedisService/RedisService';
import { QuestionRepository } from './QuestionRepository';

const questionRepository = new QuestionRepository({
	beeService: new BeeService(),
	redisService: new RedisService()
});

export default questionRepository;
