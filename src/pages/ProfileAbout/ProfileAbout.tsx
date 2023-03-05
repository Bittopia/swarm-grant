import BioTemplate from '@/components/BioTemplate'
import { type FC } from 'react'
import { TextContentBlock } from '@/components/TextContentBlock/TextContentBlock'

export const ProfileAbout: FC = () => {
  const user = {
    avatar: 'https://picsum.photos/200',
    name: 'John Doe',
    bio: 'lorem ipsum dolor sit amet'
  }

  return (
    <BioTemplate name={'John Doe'}>
      <section className={'flex flex-col gap-8'}>
        {user.bio !== '' && (
          <TextContentBlock title={'Bio'}>{user.bio}</TextContentBlock>
        )}
        <TextContentBlock title={'Created societies'}>
          Hasn't created any society yet
        </TextContentBlock>
        <TextContentBlock title={'Joined courses'}>
          Hasn't joined any course yet
        </TextContentBlock>
      </section>
    </BioTemplate>
  )
}
