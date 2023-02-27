import { type FC, type ReactNode, useEffect, useRef, useState } from 'react'

interface DropDownProps {
  children: ReactNode
  dropDownContent: ReactNode
}

export const DropDown: FC<DropDownProps> = ({ children, dropDownContent }) => {
  const [visible, setVisible] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: any): void => {
      if (
        dropdownRef.current != null &&
        !dropdownRef.current.contains(event.target)
      ) {
        setVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })

  return (
    <div
      ref={dropdownRef}
      onClick={() => {
        setVisible(!visible)
      }}
      className={'relative z-0'}
    >
      {children}
      <div
        className={`absolute top-14 right-0 min-w-[200px] rounded-2xl border-[1px] border-gray-500 bg-background-color p-4 shadow shadow-background-color drop-shadow-lg ${
          visible ? 'block' : 'hidden'
        }`}
      >
        {dropDownContent}
      </div>
    </div>
  )
}
