import { type FC } from 'react'
import { RiCloseLine } from 'react-icons/ri'
import BaseButton from '@/components/BaseButton'
import Modal from '@/components/Modal'

interface ConnectWalletModalProps {
  visible: boolean
  setVisible: (visible: boolean) => void
}

export const ConnectWalletModal: FC<ConnectWalletModalProps> = props => {
  return (
    <Modal
      isOpen={props.visible}
      onClose={() => {
        props.setVisible(false)
      }}
    >
      <div
        className={
          'flex min-w-[400px] flex-col gap-8 rounded-2xl bg-background-color p-8'
        }
      >
        <div className={'flex w-full items-center justify-between'}>
          <h2 className={'text-bold text-lg text-white'}>Connect a wallet</h2>
          <div
            onClick={() => {
              props.setVisible(false)
            }}
            className={
              'flex h-[50px] w-[50px] items-center justify-center rounded-full border border-gray-500 text-lg hover:cursor-pointer hover:border-white'
            }
          >
            <RiCloseLine className={'fill-white'} />
          </div>
        </div>
        <div className={'flex w-full flex-col gap-4 text-white'}>
          <BaseButton
            onClick={() => {
              console.log('connect to MetaMask')
            }}
          >
            <div className={'flex w-full items-center justify-center'}>
              <span className={'flex items-center gap-4'}>
                <img
                  className={'w-[20px]'}
                  src="/images/metamask.png"
                  alt="metamask"
                />{' '}
                Metamask
              </span>
            </div>
          </BaseButton>
          <BaseButton
            onClick={() => {
              console.log('connect to MetaMask')
            }}
          >
            <div className={'flex w-full items-center justify-center'}>
              <span className={'flex items-center gap-4'}>
                <img
                  className={'w-[20px]'}
                  src="/images/walletconnect.png"
                  alt="Wallet Connect"
                />
                WalletConnect
              </span>
            </div>
          </BaseButton>
          <BaseButton
            onClick={() => {
              console.log('connect to Cointbase')
            }}
          >
            <div className={'flex w-full items-center justify-center'}>
              <span className={'flex items-center gap-4'}>
                <img
                  className={'w-[20px]'}
                  src="/images/coinbase.png"
                  alt="Coinbase"
                />
                Coinbase
              </span>
            </div>
          </BaseButton>
        </div>
      </div>
    </Modal>
  )
}
