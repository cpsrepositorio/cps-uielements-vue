<script setup lang="ts">
import { $ref } from 'vue/macros'
import ProgressIndicator from '../module/components/ProgressIndicator.vue'
import TextField from '../module/components/TextField.vue'
import SvgFlow from './assets/flow.svg'

const name = $ref('Hello!')
</script>

<template>
  <div class="grid h-full place-items-center">
    <Button>
      <template #icon><SvgFlow /></template>
      Hello!
    </Button>

    <ProgressIndicator size="small" class="text-accent" />

    <TextField v-model="name" />
    <div>{{ name }}</div>
  </div>
</template>
