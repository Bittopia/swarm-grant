import { paramCase } from 'change-case'
import uploadDataToSwarmUtil from '@/utils/UploadDataToSwarmUtil'
import bee from 'src/vendor/BeeInstanceUtil'

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
    const dataToUpload = {
      avatar: avatarUrl,
      title,
      description,
      isPrivate,
      ownerAddress
    }

    try {
      return await uploadDataToSwarmUtil(
        JSON.stringify(dataToUpload),
        bee,
        import.meta.env.VITE_POSTAGE_BATCH_ID
      )
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
