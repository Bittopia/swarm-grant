import { type FC } from 'react'
import { MainNavigation } from '../MainNavigation/MainNavigation'
import Container from '../Container'

interface BaseTemplateProps {
  children: React.ReactNode
}

export const BaseTemplate: FC<BaseTemplateProps> = props => {
  return (
    <div className="h-screen w-full bg-background-color text-white">
      <MainNavigation />
      <div className={'p-28'}>
        <Container>{props.children}</Container>
      </div>
    </div>
  )
}
