<script setup lang="ts">
import SvgFlow from './assets/flow.svg'
import ProgressIndicator from '../module/components/ProgressIndicator.vue'
</script>

<template>
  <div class="grid h-full place-items-center">
    <Button>
      <template #icon><SvgFlow /></template>
      Hello!
    </Button>

    <ProgressIndicator size="small" class="text-accent" />
    <ProgressIndicator size="medium" class="text-accent" />
    <ProgressIndicator size="large" class="text-accent" />

    Hello world!
  </div>
</template>
