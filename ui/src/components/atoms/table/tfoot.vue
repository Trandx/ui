<template>
    <tfoot >
        <tr class="w-full">
            <slot
            :currentPage="props.currentPage"
            :itemsPerPage="props.itemsPerPage"
            :itemsPerPageList="props.itemsPerPageList"
            :totalItems="props.totalItems"
            :pageNumberLimit="props.pageNumberLimit"
            :change=" handleChangePagination"
            >
                <td :colspan="100000">
                    <div class="flex justify-end space-x-4 pt-3 pb-1 px-1 w-full">
                    <NSelect
                    class="w-[5.5rem]"
                    :options="(paginationData.itemsPerPageList as any)"
                    :selected-options="paginationData.itemsPerPage"
                    placeholder="select element"
                    :multiple-select="false"
                    :autoclose="true"
                    :searchable="false"
                    :deletable-btn="false"
                    @change="(data) => handleChangePagination({itemsPerPage: data})"
                    />
                    <NPagination
                    :current-page="paginationData.currentPage"
                    :items-per-page="paginationData.itemsPerPage"
                    :total-items="paginationData.totalItems"
                    :page-number-limit="paginationData.pageNumberLimit"
                    @change="(data) => handleChangePagination({currentPage: data})"
                    />
                    </div>
                </td>

            </slot>
        </tr>
    </tfoot>

</template>
<script setup lang="ts">
import {reactive, watch} from "vue";
import { NPagination, NSelect } from "..";

import {TFooterEmitsType, TFooterPropsType} from "./index.d"

const props = defineProps<TFooterPropsType>()

const emit = defineEmits<TFooterEmitsType>()

const paginationData = reactive({
    currentPage: props.currentPage || 4, // add props condition
    itemsPerPage: props.itemsPerPage || 20,
    itemsPerPageList: props.itemsPerPageList || [10, 50, 100, 500, 1000],
    totalItems: props.totalItems || 200,
    pageNumberLimit: props.pageNumberLimit || 5,
})

watch(props, (newProps) => {
    newProps.currentPage && (paginationData.currentPage = newProps.currentPage)
    newProps.itemsPerPage && (paginationData.itemsPerPage = newProps.itemsPerPage)
    newProps.itemsPerPageList && (paginationData.itemsPerPageList = newProps.itemsPerPageList)
    newProps.totalItems && (paginationData.totalItems = newProps.totalItems)
    newProps.pageNumberLimit && (paginationData.pageNumberLimit = newProps.pageNumberLimit)
})

const handleChangePagination = (data: any)=>{
    console.log(data);
    
    data.currentPage && (paginationData.currentPage = data.currentPage)

    data.itemsPerPage && (paginationData.itemsPerPage = data.itemsPerPage)
    
    emit("change-pagination", paginationData)

    console.log(paginationData);
}

</script>