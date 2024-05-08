<template>
    <!-- Card -->
    <div class=" rounded-lg shadow-sm p-3 flex items-center" >
            <slot 
            :data="data"
            >
                <div class="p-3 mr-4 bg-primary-400 text-white rounded-full flex items-center"><i :class="data.icon" ></i></div>
                <div class="w-full">
                    <p class="mb-1 text-lg font-medium text-gray-900">{{ data.title }}</p>
                    <p class=" font-normal text-gray-800">{{ data.description }}</p>
                </div>
            </slot>
    </div>
</template>

<script setup lang="ts" >
import {ICardSummary} from "./index"
defineProps<ICardSummary>()
</script>