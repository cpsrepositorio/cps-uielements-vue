import Button from '../module/components/Button.vue'
import storybook, { renderNamedSlot, type ArgTypes } from './helpers'

const argTypes: ArgTypes = {
  // Props
  type: { options: ['button', 'submit', 'reset'] },
  appearance: { options: ['standard', 'ghost', 'accent'] },
  disabled: { value: false },
  waiting: { value: false },

  // Slots
  default: { category: 'slots', value: 'Button' },
  icon: { category: 'slots' }
}

export default {
  component: Button,
  args: storybook.args(argTypes),
  argTypes: storybook.argTypes(Button, argTypes)
}

type Type = typeof Button

const Template = storybook.template<Type>(
  Button,
  argTypes,
  `<Button {{props}} {{events}}>{{slots}}</Button>`
)

export const Standard = storybook.story<Type>(Template, {
  type: 'button',
  appearance: 'standard'
})

export const Ghost = storybook.story<Type>(Template, {
  type: 'button',
  appearance: 'ghost'
})

export const Accent = storybook.story<Type>(Template, {
  type: 'button',
  appearance: 'accent'
})

const icon1 = renderNamedSlot('icon', '😊')
const icon2 = renderNamedSlot('icon', '✔️')

export const AllAppearances = storybook.compoundStory<Type>(
  Button,
  argTypes,
  `
    <div class="grid grid-flow-row gap-10">
      <small class="-mb-8 text-center">Standard</small>
      <div class="grid grid-flow-col gap-4">
        <Button {{events}}>Text</Button>
        <Button {{events}}>${icon1}With Icon</Button>
        <Button {{events}} aria-label="Check">${icon2}</Button>
        <Button disabled {{events}}>Text</Button>
        <Button disabled {{events}}>${icon1}With Icon</Button>
        <Button disabled aria-label="Check" {{events}}>${icon2}</Button>
        <Button waiting aria-label="Loading" {{events}} />
      </div>

      <small class="-mb-8 text-center">Ghost</small>
      <div class="grid grid-flow-col gap-4">
        <Button appearance="ghost" {{events}}>Text</Button>
        <Button appearance="ghost" {{events}}>${icon1}With Icon</Button>
        <Button appearance="ghost" aria-label="Check" {{events}}>${icon2}</Button>
        <Button appearance="ghost" disabled {{events}}>Text</Button>
        <Button appearance="ghost" disabled {{events}}>${icon1}With Icon</Button>
        <Button appearance="ghost" aria-label="Check" disabled {{events}}>${icon2}</Button>
        <Button appearance="ghost" aria-label="Loading" waiting {{events}} />
      </div>

      <small class="-mb-8 text-center">Accent</small>
      <div class="grid grid-flow-col gap-4">
        <Button appearance="accent" {{events}}>Text</Button>
        <Button appearance="accent" {{events}}>${icon1}With Icon</Button>
        <Button appearance="accent" aria-label="Check" {{events}}>${icon2}</Button>
        <Button appearance="accent" disabled {{events}}>Text</Button>
        <Button appearance="accent" disabled {{events}}>${icon1}With Icon</Button>
        <Button appearance="accent" aria-label="Check" disabled {{events}}>${icon2}</Button>
        <Button appearance="accent" aria-label="Loading" waiting {{events}} />
      </div>
    </div>
  `
)
