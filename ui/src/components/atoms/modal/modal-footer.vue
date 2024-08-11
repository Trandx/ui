<template>
    <div >
        <slot :close="close">

        </slot>
    </div>
</template>
<script setup lang="ts">
import { IModalEmits } from './index.d';

const emit = defineEmits<IModalEmits>()
const close = ()=>{
    emit('close', true)
}
</script>