import type {BeeService} from "$lib/services/BeeService/BeeService";
import type {RedisService} from "$lib/services/RedisService/RedisService";
import {uuid} from "uuidv4";
import societyRepository from "$lib/repository/SocietyRepository";
import type {SocietyType} from "$lib/types/society";
import type {QuestionType} from "$lib/types/question";

export class QuestionRepository {
  private beeService: BeeService;
  private redisService: RedisService;

  constructor({beeService, redisService}: { beeService: BeeService, redisService: RedisService }) {
    this.beeService = beeService;
    this.redisService = redisService;
  }

  async save(question: QuestionType) {
    const societies = await societyRepository.all()

    try {
      const id = uuid();

      (societies[question.societyId] as Required<SocietyType>).courses[question.courseId].modules[question.moduleId].questions = {...societies[question.societyId as string].courses?.[question.courseId].modules[question.moduleId].questions, [id]: {id, ...question}}

      const {reference} = await this.beeService.mutate({data: societies})

      await this.redisService.setData('reference', reference)
      return societies[question.societyId as string].courses?.[question.courseId].modules?.[id]
    } catch (e) {
      throw new Error('Not able to save module', e as Error)
    }
  }

  async update(question: QuestionType) {
    // get all societies
    const societies = await societyRepository.all()
    if (societies[question.societyId]?.courses?.[question.courseId as string].modules?.[question.id as string]) {
      (societies[question.societyId] as Required<SocietyType>).courses[question.courseId].modules[question.moduleId].questions[question.id as string] = question
    }
    // merge and save
    const {reference} = await this.beeService.mutate({data: societies})

    await this.redisService.setData('reference', reference)
    return societies[question.societyId].courses?.[question.courseId as string].modules?.[question.id as string]
  }

  async all(societyId: string, courseId: string, moduleId: string) {
    const societies = await societyRepository.all()
    if (societies[societyId]) {
      return societies[societyId].courses?.[courseId].modules?.[moduleId].questions
    }
    return []
  }

  async delete(question: QuestionType) {
    try {
      const societies = await societyRepository.all()
      if (societies[question.societyId].courses?.[question.courseId as string].modules?.[question.moduleId as string].questions?.[question.id as string]) {
        delete societies[question.societyId].courses?.[question.courseId as string].modules?.[question.moduleId as string].questions?.[question.id as string]
      }
      const {reference} = await this.beeService.mutate({data: societies})
      await this.redisService.setData('reference', reference)
      return true
    } catch (e) {
      return false
    }
  }
}
