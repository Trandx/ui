<template>
  <div
    class="modal-header h-8 bg-primary-500 text-center uppercase text-white font-bold flex items-center justify-between space-x-2 px-2 w-full  hover:cursor-move"
  >
    <div>
      <slot name="icon">
        <i class="fa-solid fa-window"></i>
      </slot>
    </div>
    <div>
      <slot name="titleText">
        <span class="w-full text-lg">{{ title || 'modal title' }}</span>
      </slot>
    </div>
    <div class="flex items-end space-x-2">
      <slot name="closeBtn" :close :minimizeOrRestore :expandOrRestore>
        <button class="text-lg hover:text-gray-800 cursor-pointer" @click="minimizeOrRestore">
          <i v-if="!isMinimize" class=" fa-solid fa-window-minimize"></i>
          <i v-else class="fa-duotone fa-solid fa-window-restore"></i>
        </button>
        <button class="text-lg hover:text-gray-800 cursor-pointer" @click="expandOrRestore">
          <i v-if="!isExpand" class="fa-duotone fa-solid fa-expand"></i>
          <i v-else class="fa-duotone fa-solid fa-compress"></i>
        </button>
        <button class="text-lg hover:text-red-500 cursor-pointer" @click="close">
          <i class="fa-solid fa-window-close"></i>
        </button>
      </slot>
    </div>
   
  </div>
</template>
<script setup lang="ts">
//import { provide } from "vue";
import { ref } from 'vue';
import type { IModalEmits, IModalHeaderProps } from './index.type'

const isExpand = ref(false)
const isMinimize = ref(false)

defineProps<IModalHeaderProps>()

const emit = defineEmits<IModalEmits>()

const close = () => {
  emit('close', true)
  //provide("closeModal", true)
}

const minimizeOrRestore = ( event: Event) => {
  event.stopPropagation();
  isMinimize.value = !isMinimize.value
  isExpand.value = false
  emit('minimizeOrRestore', isMinimize.value)
  //console.log('minimizeOrRestore modal');
}

const expandOrRestore = (event: Event) => {
  event.stopPropagation();
  isExpand.value = !isExpand.value
  isMinimize.value = false
  emit('expandOrRestore', isExpand.value)
  //console.log('expand modal');
}
</script>
