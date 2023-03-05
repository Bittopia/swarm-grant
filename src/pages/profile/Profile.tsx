import BioTemplate from '@/components/BioTemplate'
import { type FC } from 'react'
import Block from '@/components/Block'

export const Profile: FC = () => {
  return (
    <BioTemplate name={'John Doe'}>
      <section className={'flex flex-col gap-8'}>
        <Block>
          <div className={'p-8 text-gray-500'}>
            Hasn't made any activity yet
          </div>
        </Block>
      </section>
    </BioTemplate>
  )
}
