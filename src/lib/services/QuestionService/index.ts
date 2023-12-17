import QuestionRepository from '$lib/repository/QuestionRepository';
import { QuestionService } from './QuestionService';

const questionService = new QuestionService(QuestionRepository);

export default questionService;
