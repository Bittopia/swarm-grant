import { type ComponentStory, type ComponentMeta } from '@storybook/react'

import { CourseGrid } from './CourseGrid'

const meta: ComponentMeta<typeof CourseGrid> = {
  title: 'components/CourseGrid',
  component: CourseGrid
}

export default meta

const Template: ComponentStory<typeof CourseGrid> = args => (
  <CourseGrid {...args} />
)

export const Default = Template.bind({})

Default.args = {}
