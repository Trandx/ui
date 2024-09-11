<template>
    <div class="progress-bar w-ful text-[12px] text-white overflow-hidden h-5 rounded-lg border bg-gray-300 ">
        <div class="h-full">
                <slot>
                <div class="bg-primary-400 h-full progress-bar-striped  rounded-lg animate-stripe text-center font-bold grid content-center" :style="`width: ${pourcentage}%`">
                    <span>{{pourcentage}}%</span>
                </div>
                </slot>
        </div>
    </div>
</template>
<script setup lang="ts">
type PropType = {
    pourcentage: number
}
const prop = defineProps<PropType>()
</script>