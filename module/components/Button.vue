<script setup lang="ts">
import ProgressIndicator from './ProgressIndicator.vue'

export interface ButtonProps {
  appearance?: 'standard' | 'ghost' | 'accent'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  waiting?: boolean
}

withDefaults(defineProps<ButtonProps>(), {
  appearance: 'standard',
  type: 'button',
  disabled: false,
  waiting: false
})

const emit = defineEmits(['click'])

function onClick() {
  emit('click')
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || waiting"
    @click="onClick"
    class="h-8 rounded grid grid-flow-col place-items-center justify-center gap-3 can-focus can-touch"
    :class="{
      'px-4 border border-black/6 border-b-black/16 dark:border-white/7 dark:border-t-white/9 active:border-black/6 dark:active:border-white/7 bg-white/70 dark:bg-white/6 hover:bg-black/3 active:bg-black/2 active:text-black/60 dark:hover:bg-white/4 dark:active:bg-white/2 dark:active:text-white/80 disabled:text-black/35 dark:disabled:text-white/35 disabled:border-black/6 dark:disabled:border-white/7':
        appearance === 'standard',

      'px-2 bg-white/0 hover:bg-black/3 active:bg-black/2 active:text-black/60 dark:hover:bg-white/4 dark:active:bg-white/2 dark:active:text-white/80 disabled:text-black/35 dark:disabled:text-white/35':
        appearance === 'ghost',

      'px-4 text-white dark:text-black border border-white/8 border-b-black/40 dark:border-white/8 dark:border-b-black/14 active:border-white/8 bg-accent dark:bg-accent-light-2 hover:bg-accent-dark-2/90 active:bg-accent-dark-2/80 active:text-white/70 dark:hover:bg-accent-light-1/90 dark:active:bg-accent-light-1/80 dark:active:text-black/50 disabled:text-white dark:disabled:text-white/50 disabled:bg-black/20 dark:disabled:bg-white/20 disabled:border-black/0 dark:disabled:border-white/0':
        appearance === 'accent'
    }"
  >
    <ProgressIndicator v-if="waiting" />

    <template v-else>
      <slot name="icon" />
      <slot />
    </template>
  </button>
</template>

<style scoped>
button :slotted(svg) {
  fill: currentColor;
  min-height: 1em;
}

button:disabled :slotted(*) {
  opacity: 0.5;
}
</style>
