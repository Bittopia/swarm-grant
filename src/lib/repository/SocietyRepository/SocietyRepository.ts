import {BeeService} from "$lib/services/BeeService/BeeService";
import {RedisService} from "$lib/services/RedisService/RedisService";
import type {SocietyType} from "$lib/types/society";
import {uuid} from "uuidv4";

export class SocietyRepository {
  private beeService: BeeService;
  private redisService: RedisService;
  constructor({ beeService, redisService }: { beeService: BeeService, redisService: RedisService }) {
    this.beeService = beeService;
    this.redisService = redisService;
  }

  async save(society: SocietyType) {
    // get all societies
    const societies = await this.all()

    const id = uuid();
    const societyWithId = { [id]: { id, ...society } }
    // merge and save
    const { reference} = await this.beeService.mutate({ data: { ...societies, ...societyWithId } })

    await this.redisService.setData('reference', reference)
    return societyWithId
  }
  async update(society: SocietyType) {
    // get all societies
    const societies = await this.all()

    societies[society.id as string] = society
    // merge and save
    const { reference} = await this.beeService.mutate({ data: societies })

    await this.redisService.setData('reference', reference)
    return societies[society.id as string]
  }
  async all() {
    const reference = await this.redisService.getData('reference')
    return await this.beeService.query(reference as string) as Record<string, SocietyType>
  }
  async delete(societyId: string) {
    try {
      const societies = await this.all()
      delete societies[societyId]
      const { reference} = await this.beeService.mutate({ data: societies })
      await this.redisService.setData('reference', reference)
      return true
    } catch (e) {
      return false
    }
  }
}
export const societyRepository = new SocietyRepository({
  beeService: new BeeService(),
  redisService: new RedisService()
})
