<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue'

export interface TextFieldProps {
  type?: InputHTMLAttributes['type']
  disabled?: boolean
  modelValue?: string
}

withDefaults(defineProps<TextFieldProps>(), {
  type: 'text',
  disabled: false,
  modelValue: ''
})

const emit = defineEmits(['update:modelValue'])

function onUpdateModelValue(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <input
    :type="type"
    :disabled="disabled"
    :value="modelValue"
    @input="onUpdateModelValue"
    class="w-full h-8 px-2 py-1.5 rounded font-normal text-sm placeholder:text-black/60 dark:placeholder:text-white/60 bg-white/70 dark:bg-white/5 focus-within:bg-white dark:focus-within:bg-neutral-900/70 border border-black/5 border-b-black/40 dark:border-white/8 dark:border-b-white/50 group-hover:bg-neutral-100/70 dark:group-hover:bg-white/10 valid:bg-white valid:group-hover:bg-neutral-50/90 dark:valid:bg-neutral-900/70 dark:valid:group-hover:bg-neutral-800/40 valid:border-b-2 valid:border-b-accent dark:valid:border-b-accent-light-1 can-focus"
  />
</template>
