import { type FC } from 'react'
import CourseGridItem from '../CourseGridItem'

interface CourseGridProps {
  academicAreas: Array<{ name: string, description: string }>
}

export const CourseAreaGrid: FC<CourseGridProps> = ({ academicAreas }) => {
  return (
    <section
      className={'my-5 grid h-full grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-5'}
    >
      {academicAreas.map(area => (
        <CourseGridItem
          key={area.name}
          title={area.name}
          description={area.description}
        />
      ))}
    </section>
  )
}
