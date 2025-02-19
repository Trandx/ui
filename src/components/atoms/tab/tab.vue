<template>
    <div
    v-show="props.title == selectedTitle"
    >
        <slot />
    </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';

interface ITab{
    title: string
    icon?: string
}

const props = defineProps<ITab>()
const selectedTitle = inject("selectedTitle")

</script>