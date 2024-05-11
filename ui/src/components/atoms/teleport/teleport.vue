<template>
    <Teleport :to="'#'+(to || 'modal')" v-if="isLoaded">
           <slot>
             
           </slot>
    </Teleport>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import {ITeleportProps} from './index.d'
defineProps<ITeleportProps>()

const isLoaded = ref(false);
onMounted(() => {
    isLoaded.value = true;
});
</script>