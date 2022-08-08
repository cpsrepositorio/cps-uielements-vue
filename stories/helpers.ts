/* eslint-disable @typescript-eslint/no-explicit-any */
import { action } from '@storybook/addon-actions'
import type { Args, StoryFn, VueFramework } from '@storybook/vue3'

type ArgType =
  | {
      value?: unknown
      type?: string | string[]
      category?: 'slots' | 'props' | 'events'
      options?: (string | number)[]
      mapping?: string[]
      action?: string
    }
  | undefined

export type ArgTypes = Record<string, ArgType>

type VueComponent = Partial<VueFramework['component']>

type Story<T extends abstract new (...args: any) => any> = Omit<
  StoryFn<T>,
  'args'
> & {
  args?: InstanceType<T>['$props'] & Record<string, unknown>
}

export const story = <T extends abstract new (...args: any) => any>(
  template: StoryFn<T>,
  args?: Story<T>['args'] | null
): Story<T> => {
  const story = template.bind({})
  if (args) story.args = args as unknown as Partial<T>
  return story
}

export const compoundStory = <T extends abstract new (...args: any) => any>(
  components: Record<string, VueComponent>,
  argTypes: ArgTypes,
  template: string
): Story<T> => {
  const compound = story<T>(storyTemplate<T>(components, argTypes, template))
  compound.parameters = { controls: { disable: true } }
  return compound
}

export const storyTemplate =
  <T>(
    components: Record<string, VueComponent>,
    argTypes: ArgTypes,
    template: string
  ): StoryFn<T> =>
  (args: Args) => {
    const mappedComponents = components?.__name
      ? { [components.__name as string]: components }
      : components

    const events: string[] = []
    for (const k in mappedComponents) {
      events.push(...(mappedComponents[k].emits ?? []))
    }

    const mappedTemplate = template
      .replace(/{{props}}/g, `v-bind="args"`)
      .replace(
        /{{events}}/g,
        `${events.map((event) => `@${event}=${event}`).join(' ')}`.trim()
      )
      .replace(/{{slots}}/g, renderSlots(args, argTypes))

    return {
      setup: () => argsToProps(events, args, argTypes),
      methods: eventsToMethods(events),
      components: mappedComponents,
      template: mappedTemplate
    }
  }

export function storyArgs(argTypes: ArgTypes): Record<string, unknown> {
  const keys = Object.keys(argTypes)

  return keys.reduce((o, k) => {
    const item = argTypes[k]
    const value = item ? item.value ?? (item.options ?? [])[0] ?? '' : null
    return { ...o, [camelize(k)]: value }
  }, {})
}

export function storyArgTypes(
  component: VueComponent,
  argTypes: ArgTypes
): Record<string, unknown> {
  const keys = Object.keys(argTypes)

  const events = (component.emits ?? []).reduce(
    (o: Record<string, unknown>, k: string) => ({
      ...o,
      [k]: {
        control: false,
        action: 'click',
        table: { category: 'events', type: { summary: 'Function' } }
      }
    }),
    {}
  )

  return keys.reduce(
    (o, k) => {
      const needsCamelCase = k.indexOf('-')
      const item = argTypes[k]
      const value = item ? item.value ?? (item.options ?? [])[0] ?? '' : null
      let argType, result

      if (!item) {
        argType = argTypeHide()
      } else if (item.category === 'slots') {
        argType = argTypeSlot()
      } else if (typeof value === 'function') {
        argType = argTypeFunction()
      } else if (typeof value === 'boolean') {
        argType = argTypePropBoolean(value, item.type)
      } else if (typeof value === 'number') {
        argType = argTypePropNumber(value, item.type)
      } else if (typeof value === 'string') {
        if (item.options?.length) {
          argType = argTypePropSelect(value, item.options, item.mapping)
        } else {
          argType = argTypePropText(value, item.type)
        }
      } else if (Array.isArray(value)) {
        argType = argTypePropArray(value)
      } else if (typeof value === 'object' && value instanceof Date) {
        argType = argTypePropDate(value)
      } else {
        argType = argTypePropObject(value as Record<string, unknown>)
      }

      if (needsCamelCase) {
        result = {
          [k]: argTypeHide(),
          [camelize(k)]: {
            name: k,
            ...argType
          }
        }
      } else {
        result = { [k]: argType }
      }

      return { ...o, ...result }
    },
    { ...events }
  )
}

export function renderSlots(args: Args, argTypes: ArgTypes) {
  return Object.keys(argTypes)
    .filter((key) => argTypes[key]?.category === 'slots')
    .map((key) =>
      key === 'default' ? args.default : renderNamedSlot(key, args[key])
    )
    .join(' ')
    .trim()
}

export function renderNamedSlot(
  name: string,
  content?: string,
  fallbackTag: 'div' | 'span' = 'span'
) {
  if (!content) return ''
  return content.includes('<')
    ? // content.replace(/^(<\D+\s)/, `$1 slot="${name}" `)
      `<template #${name}>${content}</template>`
    : `<${fallbackTag} slot="${name}">${content}</${fallbackTag}>`
}

function argsToProps(events: string[], args: Args, argTypes: ArgTypes) {
  return {
    args: Object.keys(args)
      .filter((k) =>
        argTypes[k] === false
          ? false
          : !['slots', 'events'].includes(
              (argTypes[k] as ArgType)?.category ?? ''
            ) && !events.includes(k)
      )
      .reduce((obj: Record<string, unknown>, key: string) => {
        obj[key] = args[key]
        return obj
      }, {})
  }
}

function eventsToMethods(events: string[]) {
  return events.reduce(
    (methods, event) => ({
      ...methods,
      [event](args: unknown) {
        if (!args || args instanceof Event) action(event)({})
        else action(event)(args)
      }
    }),
    {}
  )
}

const argTypeSlot = () => ({
  control: 'text',
  table: {
    category: 'slots',
    type: { summary: 'VNode[]' }
  }
})

const argTypeHide = () => ({
  table: { disable: true }
})

const argTypePropText = (defaultValue = '', type?: string | string[]) => ({
  control: 'text',
  table: {
    category: 'props',
    type: type
      ? { summary: `'${typeof type === 'string' ? type : type.join(`'|'`)}'` }
      : { summary: 'string' },
    defaultValue: {
      summary: defaultValue === null ? 'null' : `'${defaultValue}'`
    }
  }
})

const argTypePropNumber = (
  defaultValue: number | undefined = undefined,
  type?: string | string[]
) => ({
  control: 'number',
  table: {
    category: 'props',
    type: type
      ? { summary: `'${typeof type === 'string' ? type : type.join(`'|'`)}'` }
      : { summary: 'number' },
    defaultValue: { summary: defaultValue }
  }
})

const argTypePropBoolean = (
  defaultValue = false,
  type?: string | string[]
) => ({
  control: 'boolean',
  table: {
    category: 'props',
    type: type
      ? { summary: `'${typeof type === 'string' ? type : type.join(`'|'`)}'` }
      : { summary: 'boolean' },
    defaultValue: { summary: defaultValue }
  }
})

const argTypePropSelect = (
  defaultValue = '',
  options: (string | number)[],
  mapping?: string[]
) => ({
  control: options.length > 3 ? 'select' : 'inline-radio',
  options,
  mapping,
  table: {
    category: 'props',
    type: { summary: `'${options.join(`'|'`)}'` },
    defaultValue: { summary: `'${defaultValue}'` }
  }
})

const argTypePropArray = (defaultValue: unknown[] = []) => ({
  control: 'array',
  table: {
    category: 'props',
    type: { summary: 'Array' },
    defaultValue: { summary: `Array(${defaultValue.length})` }
  }
})

const argTypePropObject = (defaultValue?: Record<string, unknown>) => ({
  control: 'object',
  table: {
    category: 'props',
    type: { summary: 'Object' },
    defaultValue: { summary: defaultValue ? 'Object' : 'null' }
  }
})

const argTypePropDate = (defaultValue?: Date) => ({
  control: 'date',
  table: {
    category: 'props',
    type: { summary: 'Date' },
    defaultValue: { summary: `Date(${defaultValue})` }
  }
})

const argTypeFunction = () => ({
  control: false,
  table: { category: 'props', type: { summary: 'Function' } }
})

const camelize = (key: string) =>
  key.replace(/-./g, (match) => match[1].toUpperCase())

export const storybook = {
  args: storyArgs,
  argTypes: storyArgTypes,
  template: storyTemplate,
  story,
  compoundStory
}

export default storybook
