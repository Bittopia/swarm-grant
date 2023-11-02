import type {BeeService} from "$lib/services/BeeService/BeeService";
import type {RedisService} from "$lib/services/RedisService/RedisService";
import {uuid} from "uuidv4";
import type {CourseType} from "$lib/types/course";
import societyRepository from "$lib/repository/SocietyRepository";
import type {SocietyType} from "$lib/types/society";

export class CourseRepository {
  private beeService: BeeService;
  private redisService: RedisService;

  constructor({beeService, redisService}: { beeService: BeeService, redisService: RedisService }) {
    this.beeService = beeService;
    this.redisService = redisService;
  }

  async save(course: CourseType) {
    // get all societies
    const societies = await societyRepository.all()

    const id = uuid();
    societies[course.societyId as string].courses = {...societies[course.societyId as string].courses, [id]: {id, ...course}}
    // merge and save
    const {reference} = await this.beeService.mutate({ data: societies })

    await this.redisService.setData('reference', reference)
    return societies[course.societyId as string].courses?.[id]
  }

  async update(course: CourseType) {
    // get all societies
    const societies = await societyRepository.all()
    if (societies[course.societyId]?.courses?.[course.id as string]) {
      (societies[course.societyId] as Required<SocietyType>).courses =  {...societies[course.societyId].courses, [course.id as string]: course}
    }
    // merge and save
    const {reference} = await this.beeService.mutate({data: societies})

    await this.redisService.setData('reference', reference)
    return societies[course.societyId].courses?.[course.id as string]
  }

  async all(societyId: string) {
    const societies = await societyRepository.all()
    if (societies[societyId]) {
      return societies[societyId].courses
    }
    return []
  }

  async delete(course: CourseType) {
    try {
      const societies = await societyRepository.all()
      if (societies[course.societyId].courses?.[course.id as string]) {
        delete societies[course.societyId].courses?.[course.id as string]
      }
      const {reference} = await this.beeService.mutate({data: societies})
      await this.redisService.setData('reference', reference)
      return true
    } catch (e) {
      return false
    }
  }
}
