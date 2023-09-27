import {BeeService} from "$lib/services/BeeService/BeeService";
import {RedisService} from "$lib/services/RedisService/RedisService";
import {SocietyRepository} from "$lib/repository/SocietyRepository/SocietyRepository";

const societyRepository = new SocietyRepository({
  beeService: new BeeService(),
  redisService: new RedisService()
})

export default societyRepository
