import { paramCase } from 'change-case'
import uploadDataToSwarmUtil from '@/utils/UploadDataToSwarmUtil'
import DatabaseUtil from '@/utils/DatabaseUtil'

interface BaseCourseProps {
  avatar?: string
  title: string
  description: string
  isPrivate?: boolean
  ownerAddress: string
}

export class CourseService {
  public async create ({
    avatar,
    title,
    description,
    isPrivate,
    ownerAddress
  }: BaseCourseProps): Promise<any> {
    const avatarUrl =
      avatar ?? `https://cdn.stamp.fyi/avatar/${paramCase(title)}?s=138`
    const dataToBeSaved = {
      avatar: avatarUrl,
      title,
      description,
      isPrivate,
      ownerAddress
    }

    try {
      const hash = await uploadDataToSwarmUtil(JSON.stringify(dataToBeSaved))
      const db = new DatabaseUtil()

      const { id } = await db.create('course', { reference: hash })

      return { reference: hash, data: { id, ...dataToBeSaved } }
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
          description:
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
    description,
    isPrivate
  }: BaseCourseProps & { id: string }): Promise<any> {
    const avatarUrl =
      avatar ?? `https://cdn.stamp.fyi/avatar/${paramCase(title)}?s=138`

    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          avatar: avatarUrl,
          title,
          description,
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
