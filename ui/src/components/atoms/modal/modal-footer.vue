<template>
    <div class="modal-footer">
        <slot :close="close">

        </slot>
    </div>
</template>
<script setup lang="ts">
import { IModalEmits } from './index.type';

const emit = defineEmits<IModalEmits>()
const close = ()=>{
    emit('close', true)
}
</script>