import {BeeService} from "$lib/services/BeeService/BeeService";
import {RedisService} from "$lib/services/RedisService/RedisService";
import {ModuleRepository} from "$lib/repository/ModuleRepository/ModuleRepository";

const moduleRepository = new ModuleRepository({
  beeService: new BeeService(),
  redisService: new RedisService()
})

export default moduleRepository
