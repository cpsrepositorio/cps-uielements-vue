<script setup lang="ts">
export interface CardProps {
  actionable?: boolean
  title?: string
}

const props = withDefaults(defineProps<CardProps>(), {
  actionable: false,
  title: ''
})

const emit = defineEmits(['click'])

function onClick() {
  if (props.actionable) emit('click')
}
</script>

<template>
  <div
    class="relative p-4 rounded-lg text-sm shadow-card dark:shadow-dark-card bg-layer-light-quaternary/80 dark:bg-layer-dark-quaternary/70"
    :class="{
      'hover:shadow-hover dark:hover:shadow-dark-hover hover:-translate-y-0.5 hover:bg-layer-light-quaternary dark:hover:bg-layer-dark-quaternary can-focus can-touch':
        actionable
    }"
    :tabindex="actionable ? 0 : -1"
    @click="onClick"
  >
    <strong class="block mb-4" v-if="title">{{ title }}</strong>
    <slot />
  </div>
</template>
