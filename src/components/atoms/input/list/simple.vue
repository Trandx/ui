<template>
  <div
    class="text-white bg-secondary-500 divide-y-2 divide-gray-800 overflow-y-auto max-h-[calc(50vh-100px)] scrollbar-w-sm scrollbar-thin scrollbar-thumb-primary-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full hover:scrollbar-thumb-primary-500 active:scrollbar-thumb-white scrollbar-track-slate-500"
    ref="customSelectElt"
    role="listbox"
  >
    <div
      v-for="(option, key) of options"
      :key="key"
      @click="(e) => makeSelection(e, option, key)"
      @keydown.enter.prevent="(e) => makeSelection(e, option, key)"
      @keydown.space.prevent="(e) => makeSelection(e, option, key)"
      @keydown.down.prevent="() => focusNextItem(key)"
      @keydown.up.prevent="() => focusPreviousItem(key)"
      role="option"
      :aria-selected="isSelected(option, key)"
      :data-index="key"
      :class="[
        isSelected(option, key) ? activeClass : '',
        highlightedIndex === key ? 'ring-2 ring-white' : '',
        'block can-hover:hover:bg-gray-700 focus:ring-0 can-hover:hover:text-gray-200 cursor-pointer truncate transition-all',
        'focus:outline-none focus:bg-gray-700 focus:text-gray-200',
      ]"
      tabindex="0"
      :ref="el => setOptionRef(el, key)"
    >
      <slot :item="option as any" :itemName="optionName(option)" :key="key">
        <div class="px-4 py-0.5 w-full truncate" :title="optionName(option)">
          {{ optionName(option) }}
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRaw, watch, onBeforeUpdate } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import type { IList } from './index.type'
import getDataByStingDeclaration from '../utils/select-data.util'

type PropsType = IList.props
type EmitsType = IList.emits

// Extension du type pour inclure highlightedIndex
interface ExtendedPropsType extends PropsType {
  highlightedIndex?: number
}

const props = defineProps<ExtendedPropsType>()
const customSelectElt = ref<HTMLDivElement>()
const optionRefs = ref<Record<number, HTMLElement>>({})

const selectedItems = ref<Record<number, any>>({})
const isSelectMultiple = computed(() => props.multipleSelect || false)
const activeClass = computed(() => props.activeClass || 'font-bold bg-primary-500')

const optionFormat = computed(() => props.optionFormat || { name: 'name', value: 'value' })

const emit = defineEmits<EmitsType>()

// Réinitialiser les refs avant chaque mise à jour
onBeforeUpdate(() => {
  optionRefs.value = {}
})

// Fonction pour définir les refs avec le bon typage
const setOptionRef = (el: Element | ComponentPublicInstance | null, key: number) => {
  if (el) {
    optionRefs.value[key] = el as HTMLElement
  }
}

const isObject = (item: any): boolean => {
  return typeof item === 'object' && item !== null && !Array.isArray(item)
}

const isSelected = (option: any, key: number): boolean => {
  const data: any = toRaw(props.selectedOptions)
  const rawOption = toRaw(option)

  let check = false

  if (Array.isArray(data) && data.length !== 0) {
    check = data.some((item) => {
      const rawItem = toRaw(item)
      if (isObject(rawItem) && isObject(rawOption)) {
        return JSON.stringify(rawItem) === JSON.stringify(rawOption)
      }
      return rawItem === rawOption
    })
  } else if (isObject(data) && isObject(rawOption)) {
    check = JSON.stringify(data) === JSON.stringify(rawOption)
  } else {
    check = data === rawOption
  }

  if (check) {
    selectedItems.value[key] = rawOption
  } else {
    delete selectedItems.value[key]
  }

  return check
}

const makeSelection = (evt: Event, option: any, key: number): void => {
  const elt = evt.currentTarget as HTMLElement
  const activeClassList = activeClass.value?.split(' ') || []
  const isCurrentlySelected = elt.getAttribute('aria-selected') === 'true'

  // Mode single select : désélectionner tous les autres
  if (!isSelectMultiple.value) {
    const items = customSelectElt.value?.querySelectorAll('[aria-selected="true"]')
    items?.forEach((item) => {
      const itemIndex = parseInt(item.getAttribute('data-index') || '-1')
      if (itemIndex !== -1 && itemIndex !== key) {
        item.setAttribute('aria-selected', 'false')
        item.classList.remove(...activeClassList)
        delete selectedItems.value[itemIndex]
      }
    })
  }

  // Toggle la sélection de l'élément actuel
  if (!isCurrentlySelected) {
    elt.setAttribute('aria-selected', 'true')
    elt.classList.add(...activeClassList)
    selectedItems.value[key] = toRaw(option)
  } else {
    elt.setAttribute('aria-selected', 'false')
    elt.classList.remove(...activeClassList)
    delete selectedItems.value[key]
  }

  // Convertir en array et émettre
  const data = Object.values(selectedItems.value)
  emit('change', data)
}

const optionName = (option: any): string => {
  if (isObject(option)) {
    const name = getDataByStingDeclaration(option, optionFormat.value.name)

    if (name !== undefined && name !== null) {
      return name.toString()
    } else {
      console.error(`Property '${optionFormat.value.name}' doesn't exist in option:`, option)
      return 'N/A'
    }
  }
  return option?.toString() || ''
}

// Navigation au clavier
const focusNextItem = (currentKey: number): void => {
  const nextKey = currentKey + 1
  if (nextKey < props.options.length && optionRefs.value[nextKey]) {
    (optionRefs.value[nextKey] as HTMLElement).focus()
  }
}

const focusPreviousItem = (currentKey: number): void => {
  const prevKey = currentKey - 1
  if (prevKey >= 0 && optionRefs.value[prevKey]) {
    (optionRefs.value[prevKey] as HTMLElement).focus()
  }
}

// Watch pour synchroniser avec highlightedIndex du parent
watch(() => props.highlightedIndex, (newIndex) => {
  if (newIndex !== undefined && newIndex >= 0 && optionRefs.value[newIndex]) {
    const element = optionRefs.value[newIndex] as HTMLElement
    element.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }
})
</script>