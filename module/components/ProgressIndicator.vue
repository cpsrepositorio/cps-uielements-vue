<script setup lang="ts">
export interface ButtonProps {
  size?: 'auto' | 'small' | 'medium' | 'large'
  state?: 'running' | 'paused' | 'error'
}

withDefaults(defineProps<ButtonProps>(), {
  size: 'auto',
  state: 'running'
})

const sizeMap = {
  auto: 'min-h-[1em]',
  small: 'h-4',
  medium: 'h-8',
  large: 'h-16'
}

const stateMap = {
  running: 'animate-spin fill-current',
  paused: 'fill-system-light-caution dark:fill-system-dark-caution',
  error: 'fill-system-light-critical dark:fill-system-dark-critical'
}
</script>

<template>
  <svg viewBox="0 0 64 64" :class="[sizeMap[size], stateMap[state]]">
    <path
      d="M33.045.002A32 32 0 11.002 33.045c-.057-1.723 1.34-3.06 2.977-3.06 1.671 0 2.955 1.343 3.01 2.923A26.01 26.01 0 1032.909 5.99c-1.58-.056-2.924-1.34-2.924-3.011 0-1.636 1.338-3.034 3.06-2.977z"
    />
  </svg>
</template>
