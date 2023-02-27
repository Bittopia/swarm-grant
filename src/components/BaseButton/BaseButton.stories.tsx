import { type ComponentStory, type ComponentMeta } from '@storybook/react'

import { BaseButton } from './BaseButton'

const meta: ComponentMeta<typeof BaseButton> = {
  title: 'components/BaseButton',
  component: BaseButton
}

export default meta

const Template: ComponentStory<typeof BaseButton> = args => (
  <BaseButton {...args} />
)

export const Default = Template.bind({})

Default.args = {}
