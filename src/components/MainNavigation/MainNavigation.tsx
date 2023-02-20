import { type FC } from 'react'
import { RiMoreFill, RiHaze2Line } from 'react-icons/ri'
import { LinkButton } from '../LinkButton/LinkButton'
import DropDown from '../DropDown'

export const MainNavigation: FC = props => {
  return (
    <nav
      className={
        'fixed top-0 z-10 w-full border-b-[1px] border-b-gray-500 bg-background-color px-4 sm:px-0'
      }
    >
      <section
        className={
          'mx-auto flex h-20 max-w-[900px] items-center justify-between'
        }
      >
        <a href={'/'}>
          <div className={'flex items-center gap-3'}>
            <div className={'text-white'}>
              <RiHaze2Line />
            </div>
            <div className={'font-bold tracking-wider'}>BitTopia</div>
          </div>
        </a>
        <div className={'flex items-center justify-between gap-5'}>
          <LinkButton href={'#'}>Connect wallet</LinkButton>
          <DropDown
            dropDownContent={
              <div className={'w-[400px]'}>
                <p>hello world</p>
              </div>
            }
          >
            <div
              className={
                'flex h-[40px] w-[40px] items-center justify-center rounded-full border border-gray-500 py-3 px-3 text-sm tracking-wider transition-colors hover:border-white'
              }
            >
              <RiMoreFill />
            </div>
          </DropDown>
        </div>
      </section>
    </nav>
  )
}
