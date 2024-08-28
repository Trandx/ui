<template>
    <div class="modal-header h-8 bg-primary-400 text-center uppercase text-white font-bold flex items-center justify-between space-x-2 px-4 w-full cursor-move">
        <slot name="title" :title="title">
            <div class=" w-full text-lg text-left">{{ title || 'modal title' }}</div>
        </slot>
        <slot name="closeBtn" :close="close">
            <button class="text-lg hover:text-red-500 " @click="close">
                <i class="fa-solid fa-window-close "></i>
            </button>
        </slot>
    </div>
</template>
<script setup lang="ts">

//import { provide } from "vue";
import {IModalEmits, IModalHeaderProps} from "./index.d"

defineProps<IModalHeaderProps>()

const emit = defineEmits<IModalEmits>()

const close = ()=>{
    emit('close', true)
    //provide("closeModal", true)
}
</script>