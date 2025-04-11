<template>
  <Teleport :to="'#' + (to || 'modal')" >
    <slot> </slot>
  </Teleport>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { ITeleportProps } from './index.type'
defineProps<ITeleportProps>()

// const isLoaded = ref(false)
// onMounted(() => {
//   isLoaded.value = true
// })
</script>
