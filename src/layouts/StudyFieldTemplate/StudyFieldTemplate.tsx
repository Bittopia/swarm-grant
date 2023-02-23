import { type FC, type ReactNode } from 'react'
import BaseTemplate from '@/layouts/BaseTemplate'
import AcademicFields from '@/data/AcademicFields'
import { sentenceCase } from 'change-case'

interface StudyFieldTemplateProps {
  children: ReactNode
}

export const StudyFieldTemplate: FC<StudyFieldTemplateProps> = ({
  children
}) => {
  return (
    <BaseTemplate>
      <section className={'grid grid-cols-society-feed gap-8'}>
        <div className={'sticky h-auto'}>
          <div
            className={
              'flex flex-col items-center gap-4 rounded-2xl border-[1px] border-gray-500'
            }
          >
            <section className={'m-4 flex flex-col items-center gap-4'}>
              <div className={'h-20 w-20 overflow-hidden rounded-full'}>
                <img src={'https://picsum.photos/200'} alt={'avatar'} />
              </div>
              <div className={'text-center'}>
                <h2 className={'text-bold text-lg'}>Computer Science</h2>
              </div>
              <div className={'text-center'}>
                <span
                  className={
                    'rounded-md bg-gray-transparent-50 p-2 text-xs tracking-widest'
                  }
                >
                  0xj412lk...j41l2k4
                </span>
              </div>
              <div className={'text-center'}>
                <p>
                  {sentenceCase(AcademicFields['computer-science'].description)}
                </p>
              </div>
              <div className={'text-center'}>
                <button
                  className={
                    'rounded-full bg-primary py-2 px-4 text-sm transition-opacity hover:opacity-70'
                  }
                >
                  Subscribe
                </button>
              </div>
            </section>
            <section className={'w-full'}>{/* put the links here */}</section>
          </div>
        </div>
        <div className={'w-full'}>{children}</div>
      </section>
    </BaseTemplate>
  )
}
