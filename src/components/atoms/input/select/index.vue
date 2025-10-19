<template>
  <div
    class="relative flex"
    :class="[
      putItemsListToTop ? 'flex-col-reverse' : 'flex-col',
      hasError ? 'outline outline-red-500 rounded-lg' : '',
    ]"
    v-click-outside="closeToggle"
    @keydown="handleKeydown"
  >
    <div
      class="text-white"
      tabindex="0"
      @keyup.enter="showOrHideSelectItemsList"
      ref="selectElement"
    >
      <div
        class="relative w-full flex justify-between focus:ring-4 focus:outline-none hover:bg-gray-700 focus:ring-gray-300"
        :class="[
          !open ? 'rounded-lg' : putItemsListToTop ? 'rounded-b-lg' : 'rounded-t-lg',
          disabled ? 'bg-gray-400' : 'bg-secondary-500',
        ]"
        @click="showOrHideSelectItemsList"
        @blur="closeToggle"
      >
        <slot
          name="optionSelected"
          :placeholder="placeholder"
          :selectedItems="selectedItems"
          :removeSelectedItem="removeSelectedItem"
          :optionName="optionName"
        >
          <div class="w-full pl-1 pr-[20px]">
            <div class="py-0.5 flex items-center flex-wrap">
              <span
                v-if="selectedItems instanceof Array && selectedItems.length === 0"
                class="text-gray-200 py-0.5 pl-1 w-full font-light italic truncate"
              >
                {{ placeholder || 'Select an option' }}
              </span>
              <div
                v-else
                v-for="(selectedItem, selectedItemKey) of selectedItems"
                :key="selectedItemKey"
                :class="`grid grid-auto-fit-[50px] m-0.5 rounded-lg gap-0.5 px-1 ${disabled ? 'bg-gray-600' : activeClass}`"
              >
                <div class="flex justify-between items-center">
                  <div class="text-white truncate px-1">
                    {{ optionName(selectedItem, optionFormat) }}
                  </div>
                  <span
                    v-if="deletableBtn"
                    class="cursor-pointer hover:text-gray-300"
                    @click.stop="!disabled && removeSelectedItem(selectedItemKey)"
                  >
                    <i class="fa-solid fa-circle-xmark"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <span
            :class="`absolute h-full right-0 px-0.5 rounded-r-lg flex justify-center items-center cursor-pointer ${disabled ? 'bg-gray-500' : activeClass}`"
          >
            <i
              :class="`${open && 'rotate-180'} fa-solid fa-chevron-down transition ease-in-out`"
            ></i>
          </span>
        </slot>
      </div>
    </div>
    <div
      class="z-[1000] bg-secondary-500 shadow w-full absolute flex max-h-60 overflow-y-auto"
      :class="[
        !open && 'hidden',
        putItemsListToTop
          ? 'flex-col-reverse rounded-t-lg bottom-[100%]'
          : 'flex-col rounded-b-lg top-[100%]',
      ]"
      ref="itemsList"
    >
      <div class="relative m-2" v-if="searchable" @click.stop="!disabled && (open = true)">
        <slot name="search" :placeholder="placeholder" :keyup="handleSearch">
          <input
            ref="searchInputRef"
            type="search"
            class="block py-0 px-1 pr-8 w-full z-20 text-gray-900 bg-gray-50 rounded-lg border-l-2 border border-primary-500 focus:border-primary-500 focus:ring-primary-500 ring-primary-500 focus:ring-1 focus:outline-none placeholder:italic placeholder:font-light"
            :placeholder="placeholder || 'Search'"
            @input="handleSearch"
            @keydown.down.prevent="navigateDown"
            @keydown.up.prevent="navigateUp"
            @keydown.enter.prevent="selectHighlightedItem"
            @keydown.escape="closeToggle"
            v-model="searchInput"
            :disabled="disabled"
          />
          <div class="absolute top-0 right-0 h-full">
            <button class="bg-primary-500 px-2 rounded-r-lg h-full text-white">
              <i class="fa-solid fa-search"></i>
            </button>
          </div>
        </slot>
      </div>
      <slot
        name="listOption"
        :options="data"
        :multipleSelect="isSelectMultiple"
        :optionFormat="optionFormat"
        :selectedOptions="selectedItems"
        :change="SecletedData"
        :highlightedIndex="highlightedIndex"
      >
        <NList
          :options="data"
          :multiple-select="isSelectMultiple"
          :optionFormat="optionFormat"
          :selected-options="selectedItems"
          :highlighted-index="highlightedIndex"
          @change="SecletedData"
          v-slot="{ itemName, key }"
          class="my-0"
          :class="putItemsListToTop ? 'rounded-t-lg' : 'rounded-b-lg'"
        >
          <div 
            :ref="el => { if (key === highlightedIndex) highlightedItemRef = el }"
            class="py-0.5 px-4 w-full truncate transition-colors"
            :class="{ 'bg-primary-600': key === highlightedIndex }"
            :title="itemName"
          >
            {{ itemName }}
          </div>
        </NList>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, toRaw, watch, watchEffect, nextTick } from 'vue'

import { ChooseCorrectWayForItemsList } from '@/mixins'
import { NList } from '../..'
import { optionName, parseToArray, search as runSearch } from '../utils'
import type { ISelect } from './index.type'

type PropsType = ISelect.props
type EmitsType = ISelect.emits

const props = defineProps<PropsType>()

const data = ref<any>(props.options)
const PropsOptions = ref(props.options)

const isSelectMultiple = computed(() => props.multipleSelect || false)

const optionFormat = computed(() => props.optionFormat || { name: 'name', value: 'value' })

const autoclose = computed(() => props.autoclose || false)
const activeClass = computed(() => props.activeClass || 'text-gray-800 bg-primary-500')

const searchInput = ref<string>('')
const open = ref<boolean>(false)
const selectElement = ref()
const itemsList = ref()
const searchInputRef = ref()
const putItemsListToTop = ref<boolean>(false)
const highlightedIndex = ref<number>(-1)
const highlightedItemRef = ref<any>(null)

const emit = defineEmits<EmitsType>()

const selectedItems = ref(parseToArray(toRaw(props.selectedOptions)))

const showOrHideSelectItemsList = (evt: Event) => {
  if (props.disabled) {
    evt.stopPropagation()
    return
  }
  const position = ChooseCorrectWayForItemsList(selectElement.value)

  putItemsListToTop.value = position.top
  open.value = !open.value
  
  if (open.value) {
    highlightedIndex.value = -1
    nextTick(() => {
      if (props.searchable && searchInputRef.value) {
        searchInputRef.value.focus()
      }
    })
  }
}

const removeSelectedItem = (keyIndex: number): void => {
  selectedItems.value.splice(keyIndex, 1)
  const dataToEmit = toRaw(selectedItems.value)

  emit('change', dataToEmit)
}

const SecletedData = (dataReceived: any) => {
  selectedItems.value = dataReceived

  const dataToEmit = isSelectMultiple.value ? dataReceived : dataReceived[0] || ''

  if (autoclose.value) {
    open.value = false
    highlightedIndex.value = -1
  }

  emit('change', dataToEmit)
}

const handleSearch = (): void => {
  highlightedIndex.value = -1
  const keyword: string = searchInput.value?.trim() || ''
  if (keyword) {
    runSearch({
      dataFormat: optionFormat.value,
      keyword: keyword,
      data: PropsOptions.value,
    }).then((result) => {
      data.value = result.data
    })
  } else {
    data.value = PropsOptions.value
  }
}

const navigateDown = (): void => {
  if (!open.value) {
    open.value = true
    return
  }
  
  if (highlightedIndex.value < data.value.length - 1) {
    highlightedIndex.value++
    scrollToHighlightedItem()
  }
}

const navigateUp = (): void => {
  if (!open.value) {
    open.value = true
    return
  }
  
  if (highlightedIndex.value > 0) {
    highlightedIndex.value--
    scrollToHighlightedItem()
  } else if (highlightedIndex.value === 0) {
    highlightedIndex.value = -1
  }
}

const scrollToHighlightedItem = (): void => {
  nextTick(() => {
    if (highlightedItemRef.value && itemsList.value) {
      const itemElement = highlightedItemRef.value as HTMLElement
      const listElement = itemsList.value as HTMLElement
      
      const itemTop = itemElement.offsetTop
      const itemBottom = itemTop + itemElement.offsetHeight
      const listScrollTop = listElement.scrollTop
      const listHeight = listElement.clientHeight
      
      if (itemBottom > listScrollTop + listHeight) {
        listElement.scrollTop = itemBottom - listHeight
      } else if (itemTop < listScrollTop) {
        listElement.scrollTop = itemTop
      }
    }
  })
}

const selectHighlightedItem = (): void => {
  if (highlightedIndex.value >= 0 && highlightedIndex.value < data.value.length) {
    const item = data.value[highlightedIndex.value]
    
    if (isSelectMultiple.value) {
      const isAlreadySelected = selectedItems.value.some(
        (selected: any) => selected[optionFormat.value.value] === item[optionFormat.value.value]
      )
      
      if (isAlreadySelected) {
        const index = selectedItems.value.findIndex(
          (selected: any) => selected[optionFormat.value.value] === item[optionFormat.value.value]
        )
        selectedItems.value.splice(index, 1)
      } else {
        selectedItems.value.push(item)
      }
      
      emit('change', toRaw(selectedItems.value))
    } else {
      SecletedData([item])
    }
  }
}

const handleKeydown = (event: KeyboardEvent): void => {
  if (props.disabled) return
  
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      navigateDown()
      break
    case 'ArrowUp':
      event.preventDefault()
      navigateUp()
      break
    case 'Enter':
      if (open.value && highlightedIndex.value >= 0) {
        event.preventDefault()
        selectHighlightedItem()
      }
      break
    case 'Escape':
      event.preventDefault()
      closeToggle()
      break
    case ' ':
      if (!open.value && !props.searchable) {
        event.preventDefault()
        showOrHideSelectItemsList(event)
      }
      break
  }
}

const closeToggle = () => {
  if (open.value) {
    open.value = false
    highlightedIndex.value = -1
  }
}

const resetSearch = () => {
  searchInput.value = ''
  data.value = PropsOptions.value
  highlightedIndex.value = -1
}

watch(() => props.options, (newOptions) => {
  data.value = newOptions
  PropsOptions.value = newOptions
  highlightedIndex.value = -1
})

watch(() => props.selectedOptions, (newSelectedOptions) => {
  selectedItems.value = parseToArray(toRaw(newSelectedOptions))
})

watchEffect(() => {
  if (open.value === false) {
    resetSearch()
  }
})

onMounted(() => {
  if (!isSelectMultiple.value && Array.isArray(props.selectedOptions)) {
    throw new Error("the selected options would not be an Array when 'is-select-Multiple'= false")
  }
})
</script>