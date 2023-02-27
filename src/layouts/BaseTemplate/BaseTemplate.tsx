import { type FC } from 'react'
import { MainNavigation } from '@/components/MainNavigation/MainNavigation'
import Container from '@/layouts/Container'
import SideNavigation from '@/components/SideNavigation'

interface BaseTemplateProps {
  children: React.ReactNode
}

export const BaseTemplate: FC<BaseTemplateProps> = props => {
  return (
    <div className="min-h-screen w-full bg-background-color text-white">
      <SideNavigation />
      <MainNavigation />
      <div className={'py-28 px-10 sm:px-0'}>
        <Container>{props.children}</Container>
      </div>
    </div>
  )
}
