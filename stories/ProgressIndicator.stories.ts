import ProgressIndicator from '../module/components/ProgressIndicator.vue'
import storybook, { type ArgTypes } from './helpers'

const argTypes: ArgTypes = {
  // Props
  layout: undefined,
  size: { options: ['auto', 'small', 'medium', 'large'] },
  state: { options: ['running', 'paused', 'error'] }
}

export default {
  component: ProgressIndicator,
  args: storybook.args(argTypes),
  argTypes: storybook.argTypes(ProgressIndicator, argTypes)
}

type Type = typeof ProgressIndicator

export const Ring = storybook.story<Type>(
  storybook.template<Type>(
    ProgressIndicator,
    argTypes,
    `<ProgressIndicator {{props}} {{events}} />`
  ),
  {
    layout: 'ring'
  }
)

export const Bar = storybook.story<Type>(
  storybook.template<Type>(
    ProgressIndicator,
    argTypes,
    `
      <div class="absolute left-0 right-0 px-6 grid place-items-center">
        <ProgressIndicator {{props}} {{events}} />
      </div>
    `
  ),
  {
    layout: 'bar'
  }
)
