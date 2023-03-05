import { paramCase } from 'change-case'

interface BaseCourseProps {
  avatar?: string
  title: string
  descriprion: string
  isPrivate?: boolean
}

export class CourseService {
  public async create ({
    avatar,
    title,
    descriprion,
    isPrivate
  }: BaseCourseProps): Promise<any> {
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
  }: BaseCourseProps & { id: string }): Promise<any> {
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
