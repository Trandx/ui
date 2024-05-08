<template>
  <div
    class="relative flex"
    :class="putItemsListToTop ? 'flex-col-reverse' : 'flex-col'"
    v-click-outside="closeToggle"
  >
    <div
      class="text-white"
      tabindex="0"
      @keyup.enter="showOrHideSelectItemsList"
      ref="selectElement"
    >
      <div
        class=" relative w-full min-h-[30px] flex justify-between focus:ring-4 focus:outline-none bg-gray-800 hover:bg-gray-700 focus:ring-gray-300 "
        :class="[
          !open
            ? 'rounded-lg'
            : putItemsListToTop
            ? 'rounded-b-lg'
            : 'rounded-t-lg',
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
            <div class="flex items-center flex-wrap" v-if="isSelectMultiple">
              <span
                v-if="selectedItems instanceof Array && selectedItems.length === 0"
                class="text-gray-200 py-1 pl-1 w-full font-light italic truncate"
              >
                {{ placeholder }}
              </span>
              <div
                v-else
                v-for="(selectedItem, selectedItemKey) of selectedItems"
                :key="selectedItemKey"
                class=" flex justify-start  w-auto max-w-[100%]"
              >
                <div class=" text-white py-1 truncate px-1 ">
                  {{ optionName(selectedItem) }}
                </div>
                <span
                  class=" px-1 py-1 cursor-pointer hover:text-primary-400"
                  @click.stop="removeSelectedItem(selectedItemKey)"
                  v-if="deletableBtn"
                >
                  <i class="fa-solid fa-circle-xmark"></i>
                </span>
              </div>
            </div>

            <div class="flex items-center" v-else>
              <span
                v-if="!selectedItems"
                class="text-gray-200 py-1 w-full font-light italic truncate"
              >
                {{ placeholder }}
              </span>
              <div
                v-else
                class=" flex justify-start flex-wrap w-auto max-w-[100%]"
              >
                <div class="w-full text-white py-1 truncate px-1 ">
                  {{ optionName(selectedItems) }}
                </div>
                <span
                  class=" px-0.5 py-1 cursor-pointer hover:text-primary-400"
                  @click="removeSelectedItem()"
                  v-if="deletableBtn"
                >
                  <i class="fa-solid fa-circle-xmark"></i>
                </span>
              </div>
            </div>
          </div>
          <span class="absolute h-full right-0 px-0.5 bg-primary-400 rounded-r-lg flex justify-center items-center cursor-pointer">
            <i :class="` ${open && 'rotate-180'} fa-solid fa-chevron-down transition ease-in-out`"></i>
          </span>
        </slot>
      </div>
    </div>
    <div
      class="z-50 bg-gray-800 shadow w-full absolute flex"
      :class="[
        !open && 'hidden',
        putItemsListToTop
          ? 'flex-col-reverse rounded-t-lg bottom-[100%]'
          : 'flex-col rounded-b-lg top-[100%]',
      ]"
      ref="itemsList"

      @click="open = !autoclose"
    >
      <div class="relative m-2"
       v-if="searchable"
       @click.stop="open = true"
       >
        <slot
        name="search"

          :placeholder="placeholder"
          :keyup="search"
          
        >
          <input
            type="search"
            class="block py-0 px-1 pr-8 w-full z-20 text-gray-900 bg-gray-50 rounded-lg border-l-2 border border-primary-400 focus:border-primary-400 focus:ring-primary-400  ring-primary-400 focus:ring-1 focus:outline-none placeholder:italic placeholder:font-light"
            :placeholder="placeholder || 'Search'"
            @keyup="() => search"
            v-model="searchInput"
            
          />
          <div class="absolute top-0 right-0 h-full">
            <button class="bg-primary-400 px-2 rounded-r-lg h-full text-white">
              <i class="fa-solid fa-search"></i>
            </button>
          </div>
<!--          
          <span
            class="absolute top-0 right-0 py-0 p-0.5 font-medium text-white bg-primary-400 rounded-r-lg focus:outline-none h-full"
          >
            <i class="fa-solid fa-magnifying-glass mx-1"></i>
          </span> -->
        </slot>
        
      </div>
      <slot
        name="listOption"
        :options="data"
        :multipleSelect="isSelectMultiple" 
        :optionFormat="optionFormat" 
        :selected-options="selectedItems"
        :change="SecletedData"
      >

        <NList
        :options="data"
        :multiple-select="isSelectMultiple"
        :optionFormat="optionFormat"
        :selected-options="selectedItems"
        @change="SecletedData" 
        v-slot="{ itemName}"
        class="my-0 "
        >
          <div class=" py-0.5 px-4  w-full truncate" :title="itemName" >
            {{ itemName }}
          </div>
        </NList>
      </slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, watch, watchEffect } from "vue";
import  ISeclect  from "./index.d";
import { ChooseCorrectWayForItemsList } from "@/mixins";
import { NList } from "../../";
import getDataByStingDeclaration from "../utils/select-data.utils";

type DefaultDataType =  {
  name: string,
  value: any,
}

type SelectType =  ISeclect<DefaultDataType>

type PropsType = SelectType["props"];
type EmitsType = SelectType["emits"];

type OptionsType = PropsType["options"];
type ItemOptionsType = OptionsType[0];
type MakeSearchType = {
keyword: string;
//searchableData: OptionsType;
searchableData: OptionsType;
reverse?: boolean;
strict?: boolean;
};

const props = defineProps<PropsType>();

const data = ref(props.options);
const PropsOptions = ref(props.options)

const isSelectMultiple = computed(() => props.multipleSelect || false);

const optionFormat = computed(
  () => props.optionFormat || { name: "name", value: "value" }
);

const autoclose = computed(() => props.autoclose || false);

const searchInput = ref<string>();
const open = ref<boolean>();
const selectDefaultItem = (()=>{
  //console.log(props.selectedOptions);
  
  if(!props.selectedOptions){
    return !isSelectMultiple.value?"": []
  }

  if(isSelectMultiple.value && !Array.isArray(props.selectedOptions)){
    return [props.selectedOptions]
  }

  if(!isSelectMultiple.value && Array.isArray(props.selectedOptions)){
    throw new Error("the selected options would not be an Array when 'is-select-Multiple'= false");
  }

  return props.selectedOptions
})

const selectedItems = ref<ItemOptionsType | OptionsType>(selectDefaultItem());

watch(props, (newProps)=>{
  data.value = newProps.options
  PropsOptions.value = data.value
  selectedItems.value = selectDefaultItem()
})

const selectElement = ref();
const itemsList = ref();
const putItemsListToTop = ref<boolean>();

const emit = defineEmits<EmitsType>();

const showOrHideSelectItemsList = () => {
  const position = ChooseCorrectWayForItemsList(selectElement.value)
  //console.log(position);
  
  putItemsListToTop.value = position.top
  open.value = !open.value;
};

const optionName = (option: any): string => {
  
  if (option instanceof Object) {

    const optionName = getDataByStingDeclaration(option, optionFormat.value.name)
    
    if (optionName ) {
      return optionName.toString();
    } else {
      // option["name"] = "no data"
      // option["value"] = null
      data.value = []
      return "no data"
      // alert(`${name} doesn't existe in option`);
      // throw console.error(
      //   `${name} doesn't existe in option`
      // );
    }
  } else {
    return option.toString();
  }
};

const removeSelectedItem = (keyIndex: number| null = null): void => {

  if(keyIndex != null && isSelectMultiple.value && selectedItems.value instanceof Array){
    selectedItems.value.splice(keyIndex, 1)
    return
  }
  
 selectedItems.value = "";

};

const SecletedData = (data: ItemOptionsType)=>{
  
  //open.value = !autoclose.value;

  //console.log(data);

  selectedItems.value = data
  
  emit("update:modelValue", data);
  emit("change", data);
  
}

const makeSearch = ({
keyword,
searchableData,
reverse = false,
strict = false,
}: MakeSearchType): { has_result: boolean; data: OptionsType } => {
let has_result: boolean = false;

keyword = keyword.toLowerCase();

const _data = searchableData.filter((option) => {
  let test: boolean = false;
  let name: string;

  name = optionName(option).toLowerCase();

  if (strict) {
    test = name === keyword;
  } else {
    test = name.includes(keyword);
  }

  if (!has_result && test && reverse) {
    has_result = true;
  }
  if (!has_result && test && !reverse) {
    has_result = true;
  }

  return reverse ? !test : test;
});

const result = {
  has_result: has_result,
  data: _data,
};

return result;
};

const search = computed((): void => {
  const keyword: string | undefined = searchInput.value?.trim();
  if (keyword) {
    const result = makeSearch({
      keyword: keyword,
      searchableData: PropsOptions.value,
    });
    data.value = result.data;
    
  } else {
    data.value = PropsOptions.value;
  }
});

const closeToggle = ()=>{
  if(open.value){
    open.value = false
  }
}

const resetSearch = ()=>{
  searchInput.value = ""
  data.value = PropsOptions.value;
}

watchEffect(()=>{
  if(open.value == false){
    resetSearch()
  }
})

</script>
