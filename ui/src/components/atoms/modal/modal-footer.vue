<template>
    <slot @close="close">

    </slot>

</template>
<script setup lang="ts">
import { IModalEmits } from './index.d';

//import { provide } from 'vue';

const emit = defineEmits<IModalEmits>()
const close = ()=>{
    emit('close', true)
    //provide("closeModal", true)
}
</script>