<template>
    <tr class="odd:bg-secondary-500 even:bg-gray-700 border-b border-gray-70 bbg-secondary-500 border-gray-700 hover:bg-gray-600 text-gray-200"
        >
        <td class="w-4 px-4 py-2" v-if="hasCheckbox">
            <div class="flex items-center">
                <NCheckbox 
                :checked
                @change="handleSelect(row)"
                    checked-class=" !rounded-sm border-primary-500 bg-primary-500 "
                    unchecked-class=" !rounded-sm border-gray-500" :value="row.id" />
            </div>
        </td>
        <slot :row>
            <td class="py-1 px-2" v-for="(col, colkey) in row" :key="colkey">{{ col }}</td>
        </slot>
    </tr>
</template>
<script setup lang="ts">
import { inject } from 'vue';
import { NCheckbox } from '../input';
import type { CommonPropsOptions, NtrOPtions, RowType } from './index.type';

defineProps<NtrOPtions>();

const { tr: { handleSelect } } = inject("commonProps") as CommonPropsOptions

</script>