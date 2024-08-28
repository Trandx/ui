<template>
    <div
        class="text-white bg-secondary-400 divide-y-2 divide-gray-800 overflow-y-auto max-h-[calc(50vh-100px)] scrollbar-w-[5px]  scrollbar-thin scrollbar-thumb-primary-400 scrollbar-thumb-rounded-full scrollbar-track-rounded-full hover:scrollbar-thumb-primary-500 scrollbar-track-slate-600"
        ref="itemList"
    >
      <div
      v-for="(option, key) of options"
      :key="key"
      @click="()=>makeSelection(option)"
      @keyup.enter="()=>makeSelection(option)"
      :class=" ` ${isItemSelected(option) && 'text-gray-800 bg-primary-400 is-selected'} block  can-hover:hover:bg-gray-700  focus:ring-0 can-hover:hover:text-gray-200 cursor-pointer truncate`"
      tabindex="0"
      >
        <slot
        :item="(option as any)"
        :itemName = "optionName(option)"
        >
          <div class="px-4 py-0.5 w-full truncate" :title="() => optionName(option)">
            {{ optionName(option) }} hello
          </div>
        </slot>
      </div>
  </div>
</template>

<script setup lang="ts">

import { computed, onMounted, ref, watch } from "vue";
import IList from "."
import getDataByStingDeclaration from "../utils/select-data.utils";


type DefaultDataType = {
  name: string;
  value: any
}

type ListType = IList< DefaultDataType>
type PropsType = ListType["props"];
type EmitsType = ListType["emits"];

type OptionsType = PropsType["options"];
type ItemOptionsType = OptionsType[0];

const props = defineProps<PropsType>();
//const datas = ref(props.options);


const isSelectMultiple = computed(() => props.multipleSelect || false);

const optionFormat = computed(
  () => props.optionFormat || { name: "name", value: "value" }
);

const emit = defineEmits<EmitsType>();

const getSectedItems = (data: any)=>{
  
  if(!data){
    return ""
  }

  if(isSelectMultiple.value){
    return [...data]
  }

  return data
}

const selectedItems = ref<ItemOptionsType | OptionsType>( getSectedItems(props.selectedOptions));

watch(props, ()=>{
  selectedItems.value = getSectedItems(props.selectedOptions)
})

const isItemSelected = (option:any)=> {
  
  if(isSelectMultiple && Array.isArray(selectedItems.value)){

    return selectedItems.value.some((item) => JSON.stringify(item) === JSON.stringify(option))

  }else{
    return JSON.stringify(selectedItems.value) === JSON.stringify(option);
  }
  
}


const itemList = ref<HTMLElement>();

const makeSelection = ( option: ItemOptionsType): void => {

    if (isSelectMultiple.value &&  selectedItems.value instanceof Array ) {

      const isSelected = selectedItems.value.some((item, index)=>{
        
        const check = JSON.stringify(option)===JSON.stringify(item)

        if(check &&  selectedItems.value instanceof Array ){
          selectedItems.value.splice(index, 1)
        }
        
        return check
      })

      if(!isSelected){
        selectedItems.value = [
          ...selectedItems.value,
          option
        ];
      }

    } else {
      const oldData = selectedItems.value
      //console.log(option, oldData);
      
      const check = JSON.stringify(option)===JSON.stringify(oldData)
      selectedItems.value = !check ? option: "";
    }

  emit("change", selectedItems.value);

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

onMounted(()=>{
  //emit("change", selectedItems.value);
})
</script>