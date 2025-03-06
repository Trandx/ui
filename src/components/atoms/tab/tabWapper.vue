<template>
  <div :class="{ flex: !rowAlign, 'space-y-2': true }">
    <nav class="isolate shadow w-max">
      <ul :class="{ 'flex flex-wrap': rowAlign, block: !rowAlign, 'mx-auto gap-x-2': true }">
        <li
          v-for="tabDetail in tabDetails"
          :key="tabDetail.title"
          class="cursor-pointer"
          :class="[
            defaultClass || 'hover:bg-gray-500 px-4',
            tabDetail.title === selectedTitle
              ? activeClass || 'bg-primary-500 text-white font-bold border-b-4 border-secondary-400'
              : '',
          ]"
          @click="selectedTitle = tabDetail.title"
        >
          <div class="flex justify-center items-center text-center py-1 px-1 space-x-2">
            <i v-if="tabDetail.icon" :class="tabDetail.icon"></i>
            <span>{{ tabDetail.title }}</span>
          </div>
        </li>
      </ul>
    </nav>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, provide, onMounted, type VNode } from 'vue'

type PropsType = {
  activeClass?: string
  defaultClass?: string
  rowAlign?: boolean
}

defineProps<PropsType>()

const slots = defineSlots<{
  default(props?: {}): any
  // default?: (props?: {}, attrs?: { title?: string; icon?: string }) => any
}>()
const tabDetails = ref<{ title: string; icon?: string }[]>([])
const selectedTitle = ref<string | undefined>()

const getSlotsData = () => {
  const slotData: { title: string; icon?: string }[] = []
  const slotNodes = slots.default()

  if (Array.isArray(slotNodes)) {
    slotNodes.forEach((node: VNode) => {
      const { props, type, children } = node

      if (!props && type.toString().includes('Symbol(v-fgt)') && Array.isArray(children)) {
        children.forEach((child: any) => {
          if (child.props?.title) {
            slotData.push({ title: child.props.title, icon: child.props.icon })
          }
        })
      } else if (props?.title) {
        slotData.push({ title: props.title, icon: props.icon })
      }
    })

    if (slotData.length > 0) {
      tabDetails.value = slotData
      selectedTitle.value = slotData[0]?.title
    }
  }
}

provide('selectedTitle', selectedTitle)

onMounted(getSlotsData)
</script>
