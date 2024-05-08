<template>
    <Teleport :to="'#'+(teleportName || 'modal')" v-if="teleportName">
           <slot>
             
           </slot>
    </Teleport>
</template>

<script lang="ts" setup>
import {ITeleportProps} from './index.d'
defineProps<ITeleportProps>()

</script>