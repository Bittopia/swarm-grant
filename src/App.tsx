import { type ReactElement } from 'react'
import CourseGrid from './components/CourseAreaGrid'
import { BaseTemplate } from './components/BaseTemplate/BaseTemplate'
import { SearchField } from './components/SearchField/SearchField'
import { CategoryDropdown } from './components/CategoryDropdown/CategoryDropdown'
import AcademicFields from '@/data/AcademicFields'

function App (): ReactElement {
  return (
    <BaseTemplate>
      <div
        className={
          'flex w-full flex-col items-center justify-center gap-5 sm:flex-row sm:justify-between'
        }
      >
        <div
          className={
            'flex w-full flex-col items-center justify-between gap-5 sm:w-1/2 sm:flex-row sm:justify-start'
          }
        >
          <SearchField />
          <CategoryDropdown />
        </div>
        <div className={'text-center text-gray-500'}>
          {AcademicFields.length} areas of study
        </div>
      </div>
      <CourseGrid academicAreas={AcademicFields} />
    </BaseTemplate>
  )
}

export default App
