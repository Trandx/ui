<template>
    <thead  >
        <slot
        :isSortableField="isSortableField"
        :hasCheckbox="hasCheckbox"
        :sortable="sortable"
        :sort-field="sortField" 
        :check-all="''" 
        :sort = "false"
        >
            <tr
              class=" border-b bg-gray-900"
            >
                <th scope="col" class="p-2 px-4" v-if="hasCheckbox">
                    <div class="flex items-center">
                        <input id="checkbox-all-search"
                        v-model="isCheck"
                        @change="checkState"
                        type="checkbox"
                        class="w-3.5 h-3.5
                        cursor-pointer  rounded checked:ring-primary-400 ring-0
                        text-primary-400 bg-gray-100
                        checked:ring-1 focus:ring-primary-300 border-gray-200">
                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                    </div>
                </th>
                <th class="h-6 p-2" 
                :class="{
                    'cursor-pointer': canBeSorted,
                    'text-primary-400':(sortType.field == item)
                }"
                v-for="(item, key) in data" :key="key"
                @click="()=>handleClick(item, key)">
                    {{ item }}
                    <i class="fa-light fa-arrow-up-arrow-down" v-if="sortType.field != item && isSortableField(item, key)"></i>
                    <i class="fa-solid fa-arrow-up-wide-short" v-else-if="sortType.field == item && sortType.type =='asc'"></i>
                    <i class="fa-solid fa-arrow-down-wide-short" v-else-if="sortType.field == item && sortType.type =='desc'"></i>
                </th>
            </tr>
        </slot>
    </thead>

</template>
<script setup lang="ts">
import {reactive, ref} from "vue"
import {TheadEmitsType, TheadPropsType, sortDataEmit} from "./index.d"

const props = defineProps<TheadPropsType>();

const emit = defineEmits<TheadEmitsType>();

const isCheck = ref(props.isCheck)

const sortType = reactive<sortDataEmit>({
    type: null,
    field: null
})

/*
----  data structure of sortField -----
props.sortField = ['data.fistName', 'data.lastName']
props.sortField = {
    firstName: 'data.fistName',
    lastName: 'data.lastName',
}
-------------------------------
*/

const handleClick = (fieldValue: string, key : number)=>{
    
    if(!props.sortField){
        sortType.field = fieldValue
    }else{
        if(Array.isArray(props.sortField)) {
            sortType.field = props.sortField[key]
        }

        if(props.sortField instanceof Object){
            sortType.field = props.sortField[fieldValue]
        } 
    }
    

    if(sortType.type != "asc"){
        sortType.type = "asc"
    }else{
        sortType.type = "desc"
    }
    //console.log(sortType);
    
    emit("sort", sortType)
}

const checkState = () => {
    //console.log(isCheck.value);
    emit("check-all", isCheck.value);
}

const canBeSorted = ref(false)

const isSortableField = (fieldValue: string, key : number) =>{
    if(props.sortable){
        if(!props.sortField) canBeSorted.value = true

        if(
            (Array.isArray(props.sortField) &&
            props.sortField[key]) ||
            (props.sortField instanceof Object && props.sortField[fieldValue])
        ) {
            canBeSorted.value = true
        }
    }
   
    return canBeSorted.value
}

</script>