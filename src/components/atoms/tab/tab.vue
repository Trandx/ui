<template>
  <div v-show="title == activeTab">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue'

interface ITab {
  title: string
}

defineProps<ITab>()
const activeTab = inject('activeTab')
</script>
