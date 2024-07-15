<!-- <template>
    <div
        class="relative w-full flex"
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
            class=" pl-4 w-full min-h-[30px] flex justify-around focus:ring-4 focus:outline-none bg-gray-700 hover:bg-secondary-400 focus:ring-gray-300 "
            :class="[
                !isOpen
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
            <div class="w-full">
                <div class="flex items-center flex-wrap w-[90%]" v-if="isSelectMultiple">
                <span
                    v-if="selectedItems instanceof Array && selectedItems.length === 0"
                    class="text-gray-200 py-1 w-full font-light italic"
                >
                    {{ placeholder }}
                </span>
                <div
                    v-else
                    v-for="(selectedItem, selectedItemKey) of selectedItems"
                    :key="selectedItemKey"
                    class=" flex justify-start w-auto max-w-[100%] "
                >
                    <div class="max-w-[88%] text-white py-1 truncate  ">
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

                <div class="flex items-center flex-wrap w-[90%]" v-else>
                <span
                    v-if="!selectedItems"
                    class="text-gray-200 py-1 w-full font-light italic"
                >
                    {{ placeholder }}
                </span>
                <div
                    v-else
                    class=" flex justify-start w-auto max-w-[100%] "
                >
                    <div class="w-full text-white py-1 truncate  ">
                    {{ optionName(selectedItems) }}
                    </div>
                    <span
                    class="w-[5%] px-1 py-1 cursor-pointer hover:text-primary-400"
                    @click="removeSelectedItem()"
                    v-if="deletableBtn"
                    >
                    <i class="fa-solid fa-circle-xmark"></i>
                    </span>
                </div>
                </div>
            
            </div>
            <span class="w-[30px] bg-primary-400 py-1 rounded-r-lg flex justify-center items-center cursor-pointer">
                <i :class="` ${isOpen && 'rotate-180'} fa-solid fa-chevron-down transition ease-in-out`"></i>
            </span>
            </slot>
            </div>

        </div>

        <div
            class="z-50 bg-gray-700 shadow w-full absolute flex"
            :class="[
                !isOpen && 'hidden',
                putItemsListToTop
                ? 'flex-col-reverse rounded-t-lg bottom-[100%]'
                : 'flex-col rounded-b-lg top-[100%]',
            ]"
            ref="itemsList"

            @click="isOpen = !autoclose"
        >

            <slot 
            name="itemList"
                
            >
                <NListSearch
                :searchable="searchable"
                :options="options"
                :multipleSelect="multipleSelect"
                :optionFormat="optionFormat"
                :selectedOptions="selectedOptions"
                @change=""
                />
            </slot>

        </div>
    </div>
</template>
<script setup lang="ts">
import { ChooseCorrectWayForItemsList } from '@/mixins';
import { computed, ref } from 'vue';
import  {IPropsSelect}  from "./index.d";
import { NListSearch } from '..';
import getDataByStingDeclaration from '../utils/select-data.utils';

type DefaultDataType =  {
  name: string,
  value: any,
}

const props = defineProps<IPropsSelect<DefaultDataType>>();

const isOpen = ref<boolean>();

const putItemsListToTop = ref<boolean>();
    const closeToggle = ()=>{
  if(isOpen.value){
    isOpen.value = false
  }
}

const selectElement = ref();

const optionFormat = computed(
  () => props.optionFormat || { name: "name", value: "value" }
);

const isSelectMultiple = computed(() => props.multipleSelect || false);

const autoclose = computed(() => props.autoclose || false);

const selectedItems = ref<ItemOptionsType | OptionsType>(selectDefaultItem());

const data = ref(props.options);

const showOrHideSelectItemsList = () => {
  const position = ChooseCorrectWayForItemsList(selectElement.value)
  //console.log(position);
  
  putItemsListToTop.value = position.top
  isOpen.value = !isOpen.value;
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
</script> -->