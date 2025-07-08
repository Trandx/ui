<template>
  <div class="modal-footer p-2">
    <slot :close="close"> </slot>
  </div>
</template>
<script setup lang="ts">
import type { IModalEmits } from './index.type'

const emit = defineEmits<IModalEmits>()
const close = () => {
  emit('close', true)
}
</script>
