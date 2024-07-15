<template>
    <div
        class="text-white relative bg-secondary-400 divide-gray-800 "
        ref="itemList"
    >
        <slot
        name="search"
        :isloading="searchState.isloading" 
        :placeholder="searchState.placeholder"
        :change="doSearch"
        >
            <NSearch :isloading="searchState.isloading" :placeholder="searchState.placeholder" @change="doSearch" />
        </slot>
        <slot name="list" 
        :options="options"
        :optionFormat="optionFormat"
        >
            <NList 
            class="absolute z-10 w-full -mt-2"
            :optionFormat="optionFormat" 
            :options="options"
            :multipleSelect="true"
            :selectedOptions="selectedOptions"
            @change="(data) =>  emit('change', data)"
             />
        </slot>
  </div>
</template>

<script setup lang="ts">

import { computed, reactive, ref } from "vue";
import IList from "."
import { NList, NSearch } from "..";
import SearchData from "../utils/search.utils";


type DefaultDataType = {
  name: string;
  value: any
}

type ListType = IList< DefaultDataType>
type PropsType = ListType["props"];
type EmitsType = ListType["emits"];


const props = defineProps<PropsType>();
//const datas = ref(props.options);

const searchState = reactive({
    keyWord: "",
    isloading: false,
    placeholder: "Search"
})

const options = ref(props.options)


const optionFormat = computed(
  () => props.optionFormat || { name: "name", value: "value" }
);

const emit = defineEmits<EmitsType>();

const doSearch = async (keyword: string) => {
    console.log(keyword);
    
    searchState.keyWord = keyword
    
    searchState.isloading = true
    const {new_data} = await SearchData({data: props.options, keyword: searchState.keyWord, dataFormat: optionFormat.value })

    console.log(new_data);
    

    options.value = new_data

    searchState.isloading = false
    
}

</script>../utils/search.utils