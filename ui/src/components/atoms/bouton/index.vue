<template>
    <button
    :type="type"
    class=" text-white focus:ring-2 focus:outline-none font-medium rounded-lg  px-5 py-2.5 text-center bg-primary-400 hover:bg-gray-600 focus:ring-primary-300 pointer
    disabled:opacity-80 disabled:animate-[pulse_3s_infinite] disabled:cursor-not-allowed disabled:bg-gray-500 inline-flex items-center justify-center space-x-2"
    :disabled="isLoading || disabled || false"
    >
        <slot
            :isLoading
            :loadingMsg
        >
            <i v-if="isLoading" class="fa-duotone fa-spinner-third inline animate-spin"></i>
            <span>{{  isLoading ? (loadingMsg || 'Loading...') : ( label || 'Button' ) }}</span>
        </slot>
    </button>
    
</template>

<script setup lang="ts">
import {IButton} from './index.d'
defineProps<IButton>();
</script>