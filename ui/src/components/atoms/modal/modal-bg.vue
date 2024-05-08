<template>
    <div class="bg-gray-400 bg-opacity-30 h-full w-full transition-all duration-1000 flex justify-start items-center"
    >
        <slot>
            <ModalContent />
        </slot>
    </div>
</template>
<script setup lang="ts">
import ModalContent from './modal-content.vue';

</script>
