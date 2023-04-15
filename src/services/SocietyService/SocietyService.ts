import { paramCase } from 'change-case'
import uploadDataToSwarmUtil from '@/utils/UploadDataToSwarmUtil'
import DatabaseUtil from '@/utils/DatabaseUtil'

interface BaseSocietyProps {
  avatar?: string
  title: string
  descriprion: string
  isPrivate?: boolean
  ownerAddress: string
}

export class SocietyService {
  public async create ({
    avatar,
    title,
    descriprion,
    isPrivate = false,
    ownerAddress
  }: BaseSocietyProps): Promise<any> {
    const avatarUrl =
      avatar ?? `https://cdn.stamp.fyi/avatar/${paramCase(title)}?s=138`

    const dataToBeSaved: BaseSocietyProps = {
      avatar: avatarUrl,
      title,
      descriprion,
      isPrivate,
      ownerAddress
    }

    try {
      const hash = await uploadDataToSwarmUtil(JSON.stringify(dataToBeSaved))
      const db = new DatabaseUtil()

      const result = await db.create('society', { reference: hash })

      return { reference: hash, data: dataToBeSaved, result }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  public async read ({ id }: { id: string }): Promise<any> {
    const avatarUrl = `https://cdn.stamp.fyi/avatar/${paramCase(
      Math.random().toString()
    )}?s=138`

    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          avatar: avatarUrl,
          title: 'Some cool society',
          descriprion:
            'lorem ipsum dolor sit amet consectetur adipisicing elit.',
          isPrivate: false
        })
      }, 2000)
    })
  }

  public async update ({
    id,
    avatar,
    title,
    descriprion,
    isPrivate
  }: BaseSocietyProps & { id: string }): Promise<any> {
    const avatarUrl =
      avatar ?? `https://cdn.stamp.fyi/avatar/${paramCase(title)}?s=138`

    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          avatar: avatarUrl,
          title,
          descriprion,
          isPrivate
        })
      }, 2000)
    })
  }

  public async delete ({ id }: { id: string }): Promise<any> {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          id
        })
      }, 2000)
    })
  }
}
