import { type FC } from 'react'
import { MainNavigation } from '../../components/MainNavigation/MainNavigation'
import Container from '../Container'

interface BaseTemplateProps {
  children: React.ReactNode
}

export const BaseTemplate: FC<BaseTemplateProps> = props => {
  return (
    <div className="min-h-screen w-full bg-background-color text-white">
      <MainNavigation />
      <div className={'py-28 px-10 sm:px-0'}>
        <Container>{props.children}</Container>
      </div>
    </div>
  )
}
