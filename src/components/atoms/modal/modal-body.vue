<template>
    <div class="h-[500px] w-full modal-body scrollbar-w-[10px] scrollbar scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-primary-500 scrollbar-track-slate-700" >
        <slot :close="close">

        </slot>
    </div>
</template>
<script setup lang="ts">
import { IModalEmits } from './index.type';

const emit = defineEmits<IModalEmits>()
const close = ()=>{
    emit('close', true)
    //provide("closeModal", true)
}
</script>