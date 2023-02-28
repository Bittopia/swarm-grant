import { type ReactElement } from 'react'
import CourseGrid from './components/CourseAreaGrid'
import { BaseTemplate } from './layouts/BaseTemplate/BaseTemplate'
import { SearchField } from './components/SearchField/SearchField'
import { CategoryDropdown } from './components/CategoryDropdown/CategoryDropdown'
import AcademicFields from '@/data/AcademicFields'

function App (): ReactElement {
  return (
    <BaseTemplate showFooter>
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
          <CategoryDropdown
            itemList={Object.keys(AcademicFields).map(item => ({
              label: AcademicFields[item as keyof typeof AcademicFields].name,
              url: `/society/${item}`
            }))}
          />
        </div>
        <div className={'text-center text-gray-500'}>
          {Object.keys(AcademicFields).length} areas of study
        </div>
      </div>
      <CourseGrid academicAreas={Object.values(AcademicFields)} />
    </BaseTemplate>
  )
}

export default App
