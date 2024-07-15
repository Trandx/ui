<template>
  <div ref="dropdrownElement" v-click-outside="closeToggle" class=" relative inline-flex">
    <div  @click.prevent="toggle">
      <slot name="btn" :title="title" >
          <button  type="button" class=" py-1 px-2 inline-flex items-center gap-x-1 text-sm font-medium rounded-sm border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-secondary-400 border-gray-700 text-white hover:bg-secondary-400 focus:outline-none focus:ring-1 focus:ring-gray-600">
              
              <i class="fa-solid fa-bars"></i>
          </button>
      </slot>
    </div>
      

      <div
      @click.prevent="closeToggleItems"
      :class="[
  !isOpen && 'hidden',
  positionList?.top
    ? ' bottom-[100%] mb-0.5'
    : ' top-[100%] mt-0.5',

  positionList?.left
    ? 'right-0'
    : 'left-0',
]"  class=" absolute z-10 min-w-full" tabindex="0" >
          <slot name="items" 
          :options="options" 
          :optionFormat="optionFormat"
          @change="selectedItem"
          >
              <div class="min-w-60 shadow-md py-2 bg-secondary-400 border border-gray-700 divide-gray-700 transition-[opacity,margin,hidden] duration-[50000]">
                  {{ options }}
                  <a
                  v-for="(option, key) in options" 
                  :key="key"
                  @click="()=>selectedItem(option)"
                  @keyup.enter="()=>selectedItem(option)"
                   class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm  focus:outline-none  text-gray-400 hover:bg-gray-700 hover:text-gray-300 focus:bg-gray-700" >
                  {{ option[optionFormat.name] }}
                  </a>
                  
              </div>
          </slot>
      </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import {IDropDown} from "./index.d"
import { ChooseCorrectWayForItemsList } from "@/mixins";
type DefaultDataType =  {
  name: string,
  value: any,
}

type DropdownType = IDropDown<DefaultDataType>
type PropsType = DropdownType["props"];
type EmitsType = DropdownType["emits"];

const props = defineProps<PropsType>();

const emit = defineEmits<EmitsType>();

const dropdrownElement = ref()
const positionList = ref<any>();
const isOpen = ref(props.open||false);
const closeAfterClick  = ref(props.closeAfterClick || false)

const optionFormat = computed(
  () => props.optionFormat || { name: "name", value: "value" }
);


const toggle = ()=>{
    
    const position = ChooseCorrectWayForItemsList(dropdrownElement.value)
    //console.log(position);
  
    positionList.value = position

    isOpen.value = !isOpen.value
}

const closeToggle = ()=>{
  if(isOpen.value){
    isOpen.value = false
  }
}

const closeToggleItems = ()=>{
  if(closeAfterClick.value){
    isOpen.value = false
  }
}

const selectedItem = (option: any) => {
  emit("change", option)
}
</script>