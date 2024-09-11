<template>
    <button
    :type="type"
    class=" text-white focus:ring-2 focus:outline-none font-medium rounded-lg  px-2 py-2 text-center bg-primary-400 hover:bg-gray-600 focus:ring-primary-300 pointer
    disabled:opacity-80 disabled:animate-[pulse_3s_infinite] disabled:cursor-not-allowed disabled:bg-gray-500 grid content-center space-x-2 h-[32px]"
    :disabled="isLoading || disabled || false"
    >

        <slot :isLoading v-if="!isLoading">
            <span>{{ ( label || 'Button' ) }}</span>
        </slot>

        <div  v-if="isLoading" class=" inline-flex items-center justify-center space-x-2">
            <i class="fa-duotone fa-spinner-third inline animate-spin"></i>
            <span>{{  isLoading && (loadingMsg || 'Loading...') }}</span>
        </div>
    </button>
    
</template>

<script setup lang="ts">
import {IButton} from './index.d'
defineProps<IButton>();
</script>