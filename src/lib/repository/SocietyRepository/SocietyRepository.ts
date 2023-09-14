import { upload } from "$lib/utils/bee/bee";

interface Society {
  id?: string
  name: string
  description: string
}

class SocietyRepository {
  constructor () {}

  async mutate (society: Society) {
    return await upload(JSON.stringify(society))
  }

  async query () {}
}

export default new SocietyRepository()
