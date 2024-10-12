<template>
  <div
    class="relative flex "
    :class="[
      putItemsListToTop ? 'flex-col-reverse' : 'flex-col',
      hasError ? 'outline outline-2 outline-red-500 rounded-lg' : '',
    ]"
    v-click-outside="closeToggle"
  >
    <div
      class="text-white"
      tabindex="0"
      @keyup.enter="showOrHideSelectItemsList"
      ref="selectElement"
    >
      <div
        class=" relative w-full flex justify-between focus:ring-4 focus:outline-none hover:bg-gray-700 focus:ring-gray-300 "
        :class="[
          !open
            ? 'rounded-lg'
            : putItemsListToTop
            ? 'rounded-b-lg'
            : 'rounded-t-lg',
          disabled ? 'bg-gray-400' : 'bg-secondary-400',
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
            <div class="flex items-center flex-wrap" >
              <span
                v-if="selectedItems instanceof Array && selectedItems.length === 0"
                class="text-gray-200 py-0.5 pl-1 w-full font-light italic truncate"
              >
                {{ placeholder }}
              </span>
              <div
                v-else
                v-for="(selectedItem, selectedItemKey) of selectedItems"
                :key="selectedItemKey"
                :class="`
                flex justify-start w-auto max-w-[100%] m-0.5 rounded-lg space-x-0.5 px-1 ${disabled ? 'bg-gray-600' : activeClass}
                `"
              >
                <div class=" text-white truncate px-1 ">
                  {{ optionName(selectedItem, optionFormat) }}
                </div>
                <span
                  class="cursor-pointer hover:text-gray-300"
                  @click.stop="!disabled && removeSelectedItem(selectedItemKey)"
                  v-if="deletableBtn"
                >
                  <i class="fa-solid fa-circle-xmark"></i>
                </span>
              </div>
            </div>
          </div>
          <span :class="`
          absolute h-full right-0 px-0.5 rounded-r-lg flex justify-center items-center cursor-pointer
          ${ disabled ? 'bg-gray-500' : activeClass}
          `">
            <i :class="` ${open && 'rotate-180'} fa-solid fa-chevron-down transition ease-in-out`"></i>
          </span>
        </slot>
      </div>
    </div>
    <div
      class="z-50 bg-secondary-400 shadow w-full absolute flex"
      :class="[
        !open && 'hidden',
        putItemsListToTop
          ? 'flex-col-reverse rounded-t-lg bottom-[100%]'
          : 'flex-col rounded-b-lg top-[100%]',
      ]"
      ref="itemsList"

      @click="!disabled && (open = !autoclose)"
    >
      <div class="relative m-2"
       v-if="searchable"
       @click.stop="!disabled && (open = true)"
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
            :disabled
          />
          <div class="absolute top-0 right-0 h-full">
            <button class="bg-primary-400 px-2 rounded-r-lg h-full text-white">
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
import { computed, onMounted, ref, toRaw, watch, watchEffect } from "vue";
import  ISeclect  from ".";
import { ChooseCorrectWayForItemsList } from "@/mixins";
import { NList } from "../../";
import { optionName, parseToArray, search as runSearch } from "../utils";

type PropsType = ISeclect.props;
type EmitsType = ISeclect.emits;

const props = defineProps<PropsType>();

const data = ref<any>(props.options);
const PropsOptions = ref(props.options)

const isSelectMultiple = computed(() => props.multipleSelect || false);

const optionFormat = computed(
  () => props.optionFormat || { name: "name", value: "value" }
);

const autoclose = computed(() => props.autoclose || false);
const activeClass = computed(()=> props.activeClass || 'text-gray-800 bg-primary-400')

const searchInput = ref<string>();
const open = ref<boolean>();
const selectElement = ref();
const itemsList = ref();
const putItemsListToTop = ref<boolean>();

const emit = defineEmits<EmitsType>();

const selectedItems = ref(parseToArray(toRaw(props.selectedOptions))) ;

const showOrHideSelectItemsList = (evt: Event) => {
  if (props.disabled) {
    evt.stopPropagation()
    return
  }
  const position = ChooseCorrectWayForItemsList(selectElement.value)
  //console.log(position);
  
  putItemsListToTop.value = position.top
  open.value = !open.value;
};


const removeSelectedItem = (keyIndex: number): void => {
  selectedItems.value.splice(keyIndex, 1)
  const data =toRaw(selectedItems.value)

  emit("change", data)
};

const SecletedData = (data: any)=>{

  selectedItems.value = data
  
  data = isSelectMultiple.value ? data : (data[0] || '')

  //emit("update:modelValue", data);
  emit("change", data);
}

const search = computed((): void => {
  const keyword: string | undefined = searchInput.value?.trim();
  if (keyword) {
    runSearch({
      dataFormat: optionFormat.value,
      keyword: keyword,
      data: PropsOptions.value,
    }).then(( result) => {
      data.value = result.data;
    });
    
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

watch(props, (newProps)=>{
  data.value = newProps.options
  PropsOptions.value = data.value
  selectedItems.value = parseToArray(toRaw(props.selectedOptions))
})

watchEffect(()=>{
  if(open.value == false){
    resetSearch()
  }
})

onMounted(() => {
  if(!isSelectMultiple.value && Array.isArray(props.selectedOptions)){
      throw new Error("the selected options would not be an Array when 'is-select-Multiple'= false");
    }
})

</script>
