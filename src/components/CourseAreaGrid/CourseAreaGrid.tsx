import { type FC } from 'react'
import CourseGridItem from '../CourseGridItem'
import Container from '../Container'

interface CourseGridProps {
  academicAreas: Array<{ name: string, description: string }>
}

export const CourseAreaGrid: FC<CourseGridProps> = ({ academicAreas }) => {
  return (
    <Container>
      <section className={'my-10 grid h-full grid-cols-3 gap-5'}>
        {academicAreas.map(area => (
          <CourseGridItem
            key={area.name}
            title={area.name}
            description={area.description}
          />
        ))}
      </section>
    </Container>
  )
}
