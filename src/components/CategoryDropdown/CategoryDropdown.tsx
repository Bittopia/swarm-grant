import { type FC, useEffect, useRef, useState } from 'react'
import { RiArrowDropDownLine, RiListUnordered } from 'react-icons/ri'

export const CategoryDropdown: FC = props => {
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
      className={
        'relative z-0 flex cursor-pointer items-center rounded-full border-[1px] border-gray-500 px-5 py-3'
      }
    >
      <span className={'flex items-center'}>
        <RiListUnordered className={'mr-4 fill-white'} /> Category{' '}
        <RiArrowDropDownLine
          className={'ml-4 h-[1.5rem] w-[1.5rem] fill-gray-500'}
        />
      </span>
      <div
        className={`absolute top-14 right-0 min-w-[200px] rounded-2xl border-[1px] border-gray-500 bg-background-color p-4 shadow shadow-background-color drop-shadow-lg ${
          visible ? 'block' : 'hidden'
        }`}
      >
        <ul className={'decoration-0'}>
          {new Array(10).fill(0).map((_, index) => (
            <li
              key={`li-${index}`}
              className={'transition-transform hover:translate-x-1'}
            >
              <a
                href={'#'}
                className={'flex items-center gap-2 py-1 px-2 hover:opacity-50'}
              >
                <span>Category {index}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
