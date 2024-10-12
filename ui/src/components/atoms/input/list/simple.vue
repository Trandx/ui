<template>
    <div
        class="text-white bg-secondary-400 divide-y-2 divide-gray-800 overflow-y-auto max-h-[calc(50vh-100px)] scrollbar-w-[5px]  scrollbar-thin scrollbar-thumb-primary-400 scrollbar-thumb-rounded-full scrollbar-track-rounded-full hover:scrollbar-thumb-primary-500 scrollbar-track-slate-600"
        ref="customSelectElt"
        role="listbox"
    >
      <div
      v-for="(option, key) of options"
      :key="key"
      @click="(e) => makeSelection(e, option)"
      @keyup.enter="(e) => makeSelection(e , option)"
      role="option"
      :aria-selected="`${ isSelected(option, (key+1).toString())? true : false }`"
      :aria-id="key+1"
      :class="`${selectedItems[key+1] ? activeClass: ''} block can-hover:hover:bg-gray-700 focus:ring-0 can-hover:hover:text-gray-200 cursor-pointer truncate`"
      tabindex="0"
      >
        <slot
        :item="(option as any)"
        :itemName = "optionName(option)"
        >
          <div class="px-4 py-0.5 w-full truncate" :title="optionName(option)">
            {{ optionName(option) }} 
          </div>
        </slot>
      </div>
  </div>
</template>

<script setup lang="ts">

import { computed, ref, toRaw } from "vue";
import IList from "."
import getDataByStingDeclaration from "../utils/select-data.util.ts";

type PropsType = IList.props;
type EmitsType = IList.emits;

const props = defineProps<PropsType>();
const customSelectElt = ref<HTMLDivElement>()

const selectedItems: Record<string, any> =  {};
const isSelectMultiple = computed(() => props.multipleSelect || false);
const activeClass = computed(()=> props.activeClass || 'text-gray-800 bg-primary-400')

const optionFormat = computed(
  () => props.optionFormat || { name: "name", value: "value" }
);

const emit = defineEmits<EmitsType>();

const isObject = (item: any) => {
  if ( typeof item === 'object' && item !== null && !Array.isArray(item)) {
    return true
  }
  return false
}

const isSelected = (option: any, key: string) => {
  //will use toRaw
  const data: any = toRaw(props.selectedOptions)
  option = toRaw(option)

  let check = false

  if (Array.isArray(data) && data.length !== 0) {

    return data.some(item => {

      if ( isObject(item)) {
        check = JSON.stringify(item) == JSON.stringify(option) 
      } else {
        check = item == option
      }

      if (check) {
        selectedItems[key] = option
      } else {
        delete selectedItems[key]
      }

      return check
    })
  }

  if ( isObject(data)) {
    check = JSON.stringify(data) == JSON.stringify(option)
  }

  check = data == option

  if (check) {
    selectedItems[key] = option
  } else {
    delete selectedItems[key]
  }

  return check
}


const makeSelection = (evt: Event, option: any): void => {
  
  
  const elt = evt.currentTarget as HTMLElement
  const activeClassList = activeClass.value?.split(' ')
  const state = elt.getAttribute('aria-selected')
  const eltAriaId = elt.getAttribute('aria-id')

  //clear all selected items
  if (!isSelectMultiple.value) {
    //selectedItems = {}
    const items = customSelectElt.value?.querySelectorAll('[aria-selected="true"]')
    items?.forEach(item => {
      const key = item.getAttribute('aria-id') as string
      item.setAttribute('aria-selected', 'false')
      item.classList.remove(...activeClassList)
      delete selectedItems[key]
    })
  }

  if (!state || state == 'false') {
    elt.setAttribute('aria-selected', 'true')
    elt.classList.add(...activeClassList)

    // add select item
    eltAriaId && (selectedItems[eltAriaId] = toRaw(option))

  }else{
    elt.setAttribute('aria-selected', 'false')
    elt.classList.remove(...activeClassList)

    // remove selected item
    eltAriaId && delete selectedItems[eltAriaId]
  }

  // convert to array
  const data = Object.values(selectedItems)

  //data = isSelectMultiple.value ? data : (data[0] || '')

  //console.log(data, isSelectMultiple.value);

  //emit("update:modelValue", data)
  emit("change", data)

};

const optionName = (option: any): string => {
  
  if (option instanceof Object) {

    const optionName = getDataByStingDeclaration(option, optionFormat.value.name)

    //console.log(optionName);

    if (optionName) {
      return optionName.toString();
    } else {
      alert(`${optionFormat.value.name} doesn't existe in option`);
      throw console.error(
        `${optionFormat.value.name} doesn't existe in option`
      );
    }
  } else {
    return option.toString();
  }
};

</script>