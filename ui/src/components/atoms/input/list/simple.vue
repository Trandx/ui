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
      :class="`${selectedItems[key+1] ? 'text-gray-800 bg-primary-400': ''} block can-hover:hover:bg-gray-700 focus:ring-0 can-hover:hover:text-gray-200 cursor-pointer truncate`"
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

import { computed, onMounted, ref, toRaw } from "vue";
import IList from "."
import getDataByStingDeclaration from "../utils/select-data.utils";
import { random } from "@/libs";


type PropsType = IList.props;
type EmitsType = IList.emits;

//type OptionsType = PropsType["options"];
//type ItemOptionsType = OptionsType[0];

const props = defineProps<PropsType>();
const customSelectElt = ref<HTMLDivElement>()

const selectedItems: Record<string, any> =  {};


const isSelectMultiple = computed(() => props.multipleSelect || false);

const optionFormat = computed(
  () => props.optionFormat || { name: "name", value: "value" }
);

const emit = defineEmits<EmitsType>();

// Conversion en objet avec des clés personnalisées
const arrayToObject = <T>(data: T[]): Record<string, T> => {
  return data.reduce((acc: Record<string, T>, curr: T) => {
    const key = random(5, 'alphanumeric');
    acc[key] = curr;
    return acc;
  }, {});
}

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

  console.log('check', data);

  console.log('isSelected', option, selectedItems);

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

      console.log('check', check, key);

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

  const activeClassList = ['text-gray-800', 'bg-primary-400'] //props.activeClass.split(',')
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
  let data = Object.values(selectedItems)

  data = isSelectMultiple ? data : (data[0] || '')

  //console.log(data);

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

// watch(() => props.selectedOptions, ( newSelectedData, oldSelectedData )=>{
//   //selectedItems = getSelectedItems()
//   // const check = JSON.stringify(toRaw(oldSelectedData)) == JSON.stringify(toRaw(newSelectedData))

//   // console.log('check', check);
  
//   //!check && defaultSelect()
//   //console.log('test');
// }, )

onMounted(() => {
  //defaultSelect()
})
</script>