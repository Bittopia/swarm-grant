import { type FC } from 'react'
import LinkButton from '../LinkButton'

interface CourseGridItemProps {
  title: string
  description: string
}

export const CourseGridItem: FC<CourseGridItemProps> = props => {
  return (
    <div
      className={
        'min-h-20 flex flex-col items-center gap-5 rounded-2xl border-[1px] border-gray-500 p-4'
      }
    >
      <div
        className={'h-[60px] w-[60px] overflow-hidden rounded-full bg-white'}
      >
        <img
          src={`https://robohash.org/${props.title.replace(' ', '')}`}
          alt={props.title}
        />
      </div>
      <div className={'flex flex-col gap-2 text-center'}>
        <h1 className={'text-2xl'}>{props.title}</h1>
        <p className={'min-h-[48px] text-xs'}>{props.description}</p>
      </div>
      <LinkButton href={'#'}>Explore</LinkButton>
    </div>
  )
}
