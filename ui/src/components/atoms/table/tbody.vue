<template>
    <tbody>
        <slot>
            <tr
              class="
            odd:bg-secondary-400 even:bg-gray-700 border-b border-gray-70
              bbg-secondary-400 border-gray-700 hover:bg-gray-600 text-gray-200"
              v-for="(row, rowkey) in data" :key="rowkey"
            >
               <td class="w-4 px-4 py-2" v-if="hasCheckbox">
                    <div class="flex items-center">
                        <input
                        :id="`checkbox-row-${rowkey}`"
                        type="checkbox"
                        :checked="isDataChecked(row)"
                        @change="() => handleCheck(row)"
                        class="w-3.5 h-3.5
                        cursor-pointer  rounded checked:ring-primary-400 ring-0
                        text-primary-400 bg-gray-100
                        checked:ring-1 focus:ring-primary-300 border-gray-200">
                        <label :for="`checkbox-row-${rowkey}`" class="sr-only">checkbox</label>
                    </div>
                </td>
                <td class="py-1 px-2" v-for="(col, colkey) in row" :key="colkey">{{ col }}</td>
            </tr>
        </slot>
    </tbody>

</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import {TbodyEmitsType, TbodyPropsType} from "./index.d"

const props = defineProps<TbodyPropsType>()

const emit = defineEmits<TbodyEmitsType>()

const dataChecked = ref(props.dataChecked || [])


watch(props, (newProps)=>{
    console.log(newProps);
    props.dataChecked && (dataChecked.value = props.dataChecked)
})

const isDataChecked = (row: any)=>{

    if(props.checkAll) return props.checkAll

    const rowStringify = JSON.stringify(row)
    return dataChecked.value.some(item => {
        if(JSON.stringify(item) === rowStringify){
            
        }
    });
}

const handleCheck = (row: any) => {
    const rowStringify = JSON.stringify(row)

    const data = dataChecked.value

    const index = data.findIndex(item => JSON.stringify(item) === rowStringify);

    // If the object exists, remove it; if not, add it
    if (index > -1) {
    // Object found, remove it from the array
    data.splice(index, 1);
    } else {
    // Object not found, add it to the array
    data.push(row);
    }

    dataChecked.value = data

    emit('check', dataChecked.value)
}

</script>