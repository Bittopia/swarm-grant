import type { QuestionRepository } from '$lib/repository/QuestionRepository/QuestionRepository';
import type { NewQuestionType } from '$lib/types/question';

export class QuestionService {
	questionRepo: QuestionRepository;

	constructor(questionRepository: QuestionRepository) {
		this.questionRepo = questionRepository;
	}

	async save(question: NewQuestionType) {
		return this.questionRepo.save(question);
	}

	async all(societyId: string, courseId: string, moduleId: string) {
		return this.questionRepo.all(societyId, courseId, moduleId);
	}

	async get(id: string) {
		return this.questionRepo.get(id);
	}
}
