<template>
    <table class=" text-white w-full text-sm text-left rtl:text-right" tabindex="0">
        <slot
        :hasCheckbox="hasCheckbox"
        :sortable = "sortable"
        :sortField = "sortField"
        >
            <NThead
            :data="header"
            :has-checkbox="hasCheckbox"
            sortable
            :sort-field="sortField"
            @check-all="selectAllItems" 
            @sort="sortBody"
            >
                <template v-slot="{
                    hasCheckbox,
                    /*isSortableField,*/
                    sortable,
                    sortField,
                    checkAll,
                    sort,
                }" >
                    <slot name="theader"
                    :hasCheckbox="hasCheckbox"
                    :sortable="sortable"
                    :sort-field="sortField" 
                    :check-all="checkAll" 
                    :sort = "sort"
                    >
                        <!-- Eg: pagination -->
                    </slot>
                </template>
                
            </NThead>
            <NTbody :data="body" :has-checkbox="hasCheckbox" :checkAll="checkAllRows" >
                <slot name="tbody"
                :hasCheckbox="hasCheckbox"
                >
                </slot>
            </NTbody>
            <NTfoot class="">
                <slot name="tfooter">
                </slot>
            </NTfoot>
        </slot>
    </table>
</template>
<script setup lang="ts">
import {ref} from "vue"
import {TablePropsType, TbodyEmitsType} from "./index.d"
import {NTbody, NTfoot, NThead,} from "."

const props = defineProps<TablePropsType>();

const emit = defineEmits<TbodyEmitsType>()

const checkAllRows = ref(false)

const selectAllItems = (selected: boolean) => {
    checkAllRows.value = selected
  /*if (selected) {
    this.selectedItems = [...this.tableItems];
  } else {
    this.selectedItems = [];
  }
  */
 emit("check", props.body )
}

const sortBody = (data: any) => {
    console.log(data);
    emit("sort", data)
}

</script>