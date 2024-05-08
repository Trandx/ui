<template>
    <button
    :type="type"
    class="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg  px-5 py-2.5 text-center bg-primary-400 hover:bg-gray-600 focus:ring-primary-300 pointer
    disabled:opacity-50 disabled:cursor-not-allowed"

    :disabled="disabled || false"
    >
    {{  label || 'Button' }}
    </button>
</template>

<script setup lang="ts">
import {IButton} from './index.d'
defineProps<IButton>();
</script>