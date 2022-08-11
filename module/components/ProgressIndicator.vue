<script setup lang="ts">
export interface ButtonProps {
  layout?: 'ring' | 'bar'
  size?: 'auto' | 'small' | 'medium' | 'large'
  state?: 'running' | 'paused' | 'error'
}

withDefaults(defineProps<ButtonProps>(), {
  layout: 'ring',
  size: 'auto',
  state: 'running'
})

const sizeMapRing = {
  auto: 'min-h-[1em]',
  small: 'h-4',
  medium: 'h-8',
  large: 'h-16'
}

const sizeMapBar = {
  auto: 'min-w-[3em] w-full',
  small: 'w-24',
  medium: 'w-60',
  large: 'w-96'
}

const stateMapRing = {
  running: 'animate-spin fill-current',
  paused: 'fill-system-light-caution dark:fill-system-dark-caution',
  error: 'fill-system-light-critical dark:fill-system-dark-critical'
}

const stateMapBar = {
  running: 'bg-accent dark:bg-accent-light-1',
  paused: 'bg-system-light-caution dark:bg-system-dark-caution',
  error: 'bg-system-light-critical dark:bg-system-dark-critical'
}
</script>

<template>
  <svg
    v-if="layout === 'ring'"
    viewBox="0 0 64 64"
    :class="[sizeMapRing[size], stateMapRing[state]]"
  >
    <path
      d="M33.045.002A32 32 0 11.002 33.045c-.057-1.723 1.34-3.06 2.977-3.06 1.671 0 2.955 1.343 3.01 2.923A26.01 26.01 0 1032.909 5.99c-1.58-.056-2.924-1.34-2.924-3.011 0-1.636 1.338-3.034 3.06-2.977z"
    />
  </svg>
  <div
    v-else
    class="relative flex items-center h-1"
    :class="[sizeMapBar[size]]"
  >
    <div class="absolute w-full h-px bg-black/45 dark:bg-white/55" />
    <div
      class="absolute w-1/3 h-[0.1875em] rounded-full"
      :class="stateMapBar[state]"
    />
  </div>
</template>
