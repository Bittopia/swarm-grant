import { type FC } from 'react'
import { MainNavigation } from '../../components/MainNavigation/MainNavigation'
import Container from '../Container'

interface BaseTemplateProps {
  children: React.ReactNode
}

export const BaseTemplate: FC<BaseTemplateProps> = props => {
  return (
    <div className="min-h-screen w-full bg-background-color text-white">
      <div
        className={
          'fixed left-0 top-0 z-20 flex h-full w-[80px] flex-col items-center border-r-[1px] border-r-gray-500 bg-background-color p-4'
        }
      >
        lal
      </div>
      <MainNavigation />
      <div className={'py-28 px-10 sm:px-0'}>
        <Container>{props.children}</Container>
      </div>
    </div>
  )
}
