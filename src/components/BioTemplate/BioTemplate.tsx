import { type FC, type ReactNode } from 'react'
import BaseTemplate from '@/layouts/BaseTemplate'
import { paramCase } from 'change-case'

interface BioTemplateProps {
  avatar?: string
  name: string

  children: ReactNode
}

export const BioTemplate: FC<BioTemplateProps> = ({
  avatar,
  name,
  children
}) => {
  const avatarUrl =
    avatar ?? `https://cdn.stamp.fyi/avatar/${paramCase(name)}?s=138`
  return (
    <BaseTemplate>
      <section className={'grid grid-cols-1 gap-8 md:grid-cols-society-feed'}>
        <div className={'h-auto'}>
          <div
            className={
              'sticky top-28 flex flex-col items-center gap-4 rounded-2xl border-[1px] border-gray-500'
            }
          >
            <section className={'m-4 flex flex-col items-center gap-4'}>
              <div className={'h-20 w-20 overflow-hidden rounded-full'}>
                <img src={avatarUrl} alt={'avatar'} />
              </div>
              <div className={'flex flex-col items-center'}>
                <div className={'text-center'}>
                  <h2 className={'text-bold text-lg'}>{name}</h2>
                </div>
                <div className={'text-center'}>
                  <span
                    className={
                      'rounded-md bg-gray-transparent-50 p-1 text-[10px] tracking-widest'
                    }
                  >
                    0xj412lk...j41l2k4
                  </span>
                </div>
              </div>
            </section>
            <section className={'w-full'}>
              <ul className={'flex flex-col items-start gap-2 pb-4'}>
                <li className={'border-l-4 border-l-white pl-10'}>Activity</li>
                <li className={'pl-10'}>About</li>
              </ul>
            </section>
          </div>
        </div>
        <div className={'w-full'}>{children}</div>
      </section>
    </BaseTemplate>
  )
}
