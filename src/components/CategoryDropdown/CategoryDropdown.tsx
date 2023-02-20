import { type FC } from 'react'
import { RiArrowDropDownLine, RiListUnordered } from 'react-icons/ri'
import DropDown from '../DropDown'

export const CategoryDropdown: FC = props => {
  return (
    <DropDown
      dropDownContent={
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
      }
    >
      <div
        className={
          'flex cursor-pointer items-center rounded-full border-[1px] border-gray-500 px-5 py-3'
        }
      >
        <span className={'flex items-center'}>
          <RiListUnordered className={'mr-4 fill-white'} /> Category{' '}
          <RiArrowDropDownLine
            className={'ml-4 h-[1.5rem] w-[1.5rem] fill-gray-500'}
          />
        </span>
      </div>
    </DropDown>
  )
}
