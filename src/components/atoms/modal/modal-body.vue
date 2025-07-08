<template>
  <div
    class=" flex-1 overflow-y-scroll w-full p-4 modal-body scrollbar-w-[5px] scrollbar scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-primary-500 scrollbar-track-gray-300"
  >
    <slot :close="close"> </slot>
  </div>
</template>
<script setup lang="ts">
import type { IModalEmits } from './index.type'

const emit = defineEmits<IModalEmits>()
const close = () => {
  emit('close', true)
  //provide("closeModal", true)
}
</script>
