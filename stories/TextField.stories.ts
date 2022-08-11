import TextField from '../module/components/TextField.vue'
import storybook, { type ArgTypes } from './helpers'

const argTypes: ArgTypes = {
  // Props
  type: {
    options: [
      'text',
      'button',
      'checkbox',
      'color',
      'date',
      'datetime-local',
      'email',
      'file',
      'hidden',
      'image',
      'month',
      'number',
      'password',
      'radio',
      'range',
      'reset',
      'search',
      'submit',
      'tel',
      'time',
      'url',
      'week'
    ]
  },
  disabled: { value: false },
  modelValue: { value: '' }
}

export default {
  component: TextField,
  args: storybook.args(argTypes),
  argTypes: storybook.argTypes(TextField, argTypes)
}

type Type = typeof TextField

const Template = storybook.template<Type>(
  TextField,
  argTypes,
  `<TextField {{props}} {{events}} />`
)

export const Text = storybook.story<Type>(Template, {
  type: 'text',
  disabled: false,
  modelValue: ''
})
