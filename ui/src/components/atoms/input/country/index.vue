<template>
    <div class="flex">
        <NSelect
        :options="props.options || selectOptions"
        :searchable="props.searchable || true"
        :selected-options="props.selectedOptions || selectOptions[0]"
        :placeholder=" props.placeholder || 'country code'"
        :multiple-select="props.multipleSelect"
        :option-format="props.optionFormat"
        @change="handleSelection"
        />
    </div>

</template>

<script lang="ts" setup>
import { computed } from "vue";
import {NSelect} from "@/components"
import countryDialInfo  from "../data/country_dial_info.json"
import ISeclect from "../select";

type DefaultDataType =  {
  name: string,
  value: any,
}

type SelectType =  ISeclect<DefaultDataType>

type PropsType = SelectType["props"];
type EmitsType = SelectType["emits"];


const emit = defineEmits<EmitsType>()

const props = defineProps<Partial<PropsType>>();

/**
 * @selected=""
        :options="selectOptions"
        :optionFormat="optionFormat"
        placeholder="select element"
        :default="selectOptions[0]"
        :selectMultiple="true"
        :autoclose="false"
        :searchable="true"
 */
    const handleSelection = (data: any ) =>{
        //console.log(data.name);

        if(props.options){
            
            emit("update:modelValue", data as typeof props.options[0])
            //console.log(data);
            return
        }

        emit("update:modelValue", data as typeof selectOptions.value[0])
        //console.log(data);
    }

    const selectOptions = computed(()=>{
        return countryDialInfo.map(element => {
            return {
                name: `${element.flag} ${element.name}` ,
                value: element,
            }
        })
    
    });

</script>../select