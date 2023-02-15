import { type ReactElement } from 'react'
import CourseGrid from './components/CourseAreaGrid'
import { BaseTemplate } from './components/BaseTemplate/BaseTemplate'

function App (): ReactElement {
  const academicAreas = [
    {
      name: 'Mathematics',
      description:
        'The study of numbers, shapes, and patterns, and their relationships.'
    },
    {
      name: 'Chemistry',
      description:
        'The study of the composition, structure, properties, and reactions of matter.'
    },
    {
      name: 'Biology',
      description:
        'The study of living organisms and their interactions with each other and the environment.'
    },
    {
      name: 'Computer Science',
      description:
        'The study of computing, programming, and computational systems.'
    },
    { name: 'Psychology', description: 'The study of the mind and behavior.' },
    {
      name: 'Sociology',
      description:
        'The study of human social behavior and its origins, development, organization, and institutions.'
    },
    {
      name: 'Anthropology',
      description:
        'The study of human societies and cultures and their development.'
    },
    {
      name: 'Economics',
      description:
        'The study of how individuals, organizations, and societies allocate scarce resources.'
    },
    {
      name: 'Philosophy',
      description:
        'The study of the fundamental nature of knowledge, reality, and existence.'
    },
    {
      name: 'History',
      description: 'The study of the past and its significance.'
    },
    {
      name: 'Linguistics',
      description:
        'The study of language, including its structure, use, and evolution.'
    },
    {
      name: 'Political Science',
      description: 'The study of government, politics, and public policies.'
    },
    {
      name: 'Environmental Science',
      description:
        'The study of the natural environment and how humans interact with it.'
    }
  ]

  return (
    <BaseTemplate>
      <CourseGrid academicAreas={academicAreas} />
    </BaseTemplate>
  )
}

export default App
