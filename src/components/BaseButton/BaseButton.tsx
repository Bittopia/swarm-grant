import { type FC, type ReactNode } from 'react'

interface BaseButtonProps {
  children: ReactNode
  onClick?: () => void
}
export const BaseButton: FC<BaseButtonProps> = props => {
  return (
    <button
      onClick={props.onClick}
      className={
        'rounded-full border border-gray-500 bg-transparent py-3 px-5 text-sm tracking-wider transition-colors hover:border-white'
      }
    >
      {props.children}
    </button>
  )
}
