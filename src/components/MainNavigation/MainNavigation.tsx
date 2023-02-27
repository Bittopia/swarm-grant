import { type FC, useState } from 'react'
import { RiHaze2Line, RiMoreFill, RiSunLine } from 'react-icons/ri'
import DropDown from '@/components/DropDown'
import BaseButton from '@/components/BaseButton'
import { ConnectWalletModal } from '../ConnectWalletModal/ConnectWalletModal'

export const MainNavigation: FC = props => {
  const [visible, setVisible] = useState(false)

  return (
    <>
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
              <div className={'font-bold tracking-wider'}>
                BitTopia University
              </div>
            </div>
          </a>
          <div className={'flex items-center justify-between gap-5'}>
            <BaseButton
              onClick={() => {
                setVisible(true)
              }}
            >
              Connect wallet
            </BaseButton>
            <DropDown
              dropDownContent={
                <div className={'flex w-[300px] flex-col gap-8'}>
                  <div
                    className={
                      'flex h-[50px] w-[50px] items-center justify-center rounded-full border border-gray-500 text-lg hover:cursor-pointer hover:border-white'
                    }
                  >
                    <RiSunLine className={'fill-white'} />
                  </div>
                  <div className={'w-full text-white'}>
                    <ul
                      className={
                        'flex w-full flex-col gap-4 hover:text-gray-500'
                      }
                    >
                      <li>
                        <a href="/" className="uppercase hover:text-white">
                          Explore
                        </a>
                      </li>
                      <li>
                        <a href="#" className="uppercase hover:text-white">
                          Timeline
                        </a>
                      </li>
                      <li>
                        <a href="#" className="uppercase hover:text-white">
                          Create a society
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              }
            >
              <div
                className={
                  'flex h-[46px] w-[46px] items-center justify-center rounded-full border border-gray-500 py-3 px-3 text-sm tracking-wider transition-colors hover:cursor-pointer hover:border-white'
                }
              >
                <RiMoreFill />
              </div>
            </DropDown>
          </div>
        </section>
      </nav>
      <ConnectWalletModal visible={visible} setVisible={setVisible} />
    </>
  )
}
