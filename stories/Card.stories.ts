import Button from '../module/components/Button.vue'
import Card from '../module/components/Card.vue'
import storybook, { type ArgTypes } from './helpers'

const argTypes: ArgTypes = {
  // Props
  actionable: { value: false },
  title: { value: '' },

  // Slots
  default: { category: 'slots' }
}

export default {
  component: Card,
  args: storybook.args(argTypes),
  argTypes: storybook.argTypes(Button, argTypes)
}

type Type = typeof Card

const Template = storybook.template<Type>(
  Card,
  argTypes,
  `<Card {{props}} {{events}}>{{slots}}</Card>`
)

export const Basic = storybook.story<Type>(Template, {
  actionable: false,
  title: '',
  default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
})

export const WithTitle = storybook.story<Type>(Template, {
  actionable: false,
  title: 'Hello World!',
  default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
})
