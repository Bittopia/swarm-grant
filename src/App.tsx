import AcademicFields from '@/data/AcademicFields'
import { useState, type ReactElement } from 'react'
import {
  CategoryDropdown,
  type CategoryItem
} from './components/CategoryDropdown/CategoryDropdown'
import CourseGrid from './components/CourseAreaGrid'
import { SearchField } from './components/SearchField/SearchField'
import { BaseTemplate } from './layouts/BaseTemplate/BaseTemplate'
import { useMainStore } from './store/useMainStore/useMainStore'

function App (): ReactElement {
  const { data } = useMainStore()
  const [activeScienceField, setactiveScienceField] = useState<
  CategoryItem | undefined
  >(undefined)
  return (
    <BaseTemplate showFooter>
      <div
        className={
          'flex w-full flex-col items-center justify-center gap-5 sm:flex-row sm:justify-between'
        }
      >
        <div
          className={
            'flex w-full flex-col items-center justify-between gap-5 sm:w-2/3 sm:flex-row sm:justify-start'
          }
        >
          <SearchField />
          <CategoryDropdown
            itemList={[
              { label: 'Alpha Sciences', value: 'Alpha Sciences' },
              { label: 'Beta Sciences', value: 'Beta Sciences' },
              { label: 'Gamma Sciences', value: 'Gamma Sciences' }
            ]}
            selectedItem={activeScienceField}
            onChange={setactiveScienceField}
          />
        </div>
        <div className={'text-center text-gray-500'}>
          {Object.keys(data.societies).length} Societies
        </div>
      </div>
      <CourseGrid academicAreas={Object.values(AcademicFields)} />
    </BaseTemplate>
  )
}

export default App
