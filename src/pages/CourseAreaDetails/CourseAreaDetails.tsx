import { type FC } from 'react'
import StudyFieldTemplate from '@/layouts/StudyFieldTemplate'

export const CourseAreaDetails: FC = () => {
  return (
    <StudyFieldTemplate>
      <div className={'flex flex-col items-center gap-4'}>
        {new Array(10).fill(0).map((_, index) => (
          <div
            key={index}
            className={'w-full rounded-2xl border-[1px] border-gray-500 p-4'}
          >
            lalalalslslsl
          </div>
        ))}
      </div>
    </StudyFieldTemplate>
  )
}
