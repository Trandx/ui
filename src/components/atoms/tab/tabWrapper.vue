<template>
  <div :class="['space-y-2', { 'flex': !isRowAlign }]">
    <nav class="isolate shadow rounded-lg w-max">
      <ul :class="['mx-auto', isRowAlign ? 'flex flex-wrap' : 'block']">
        <li
          v-for="tab in tabList"
          :key="tab.title"
          class="cursor-pointer transition-colors duration-200"
          :class="[
            itemClass?.default ?? 'hover:bg-gray-100 px-4',
            tab.title === currentActiveTab
              ? itemClass?.active ?? 'bg-primary-500 text-white font-semibold border-b-4 border-secondary-400'
              : '',
          ]"
          @click="selectTab(tab.title)"
        >
          <div class="flex items-center justify-center px-2 space-x-2">
            <i v-if="tab.icon" :class="tab.icon"></i>
            <span>{{ tab.title }}</span>
          </div>
        </li>
      </ul>
    </nav>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, provide, onMounted, watch, type VNode } from 'vue'

defineProps<{
  itemClass?: { active: string; default: string }
  isRowAlign?: boolean
}>()

const slots = defineSlots<{
  default(): any
}>()

const tabList = ref<{ title: string; icon?: string; active?: boolean }[]>([])

watch(
  () => slots.default?.(),
  () => {
    extractTabs()
  }
)

function extractTabs() {
  const nodes = slots.default?.() ?? []
  const result: { title: string; icon?: string; active?: boolean }[] = []

  console.log(nodes);
  

  nodes.flat().forEach((node: VNode) => {
    // Handle fragments (from v-for or template)
    const children = (node.type === Symbol.for('v-fgt') || node.type === 'template') && Array.isArray(node.children)
      ? node.children
      : [node]

    children.forEach((child: any) => {
      const props = child.props ?? {}
      if (props.title) {
        result.push({ title: props.title, icon: props.icon, active: props.active })
      }
    })
  })

  tabList.value = result
  // Set the first active tab if not already set
  if (!currentActiveTab.value && tabList.value.length) {
    const activeTab = tabList.value.find(tab => tab.active)
    currentActiveTab.value = activeTab ? activeTab.title : tabList.value[0].title
  }
}
const currentActiveTab = ref<string>('')

function selectTab(title: string) {
  currentActiveTab.value = title
}

provide('activeTab', currentActiveTab)

onMounted(extractTabs)

// If activeTab prop changes, update currentActiveTab

</script>
