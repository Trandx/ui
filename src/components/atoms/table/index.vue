<template>
  <table class="text-white w-full text-sm text-left rtl:text-right" tabindex="0">
    <slot :hasCheckbox :sortable :sortField >
      <NThead />
      <NTbody />
      <NTfoot />
    </slot>
  </table>
</template>
<script setup lang="ts">
import { provide, reactive, ref, toRef } from 'vue'
import type { CommonPropsOptions, RowType, SortDataEmit, TablePropsType, TbodyEmitsType } from './index.type'
import { NTbody, NTfoot, NThead } from '.'

const props = defineProps<TablePropsType>()

const emit = defineEmits<TbodyEmitsType>()

const selectedRows = reactive(new Set(props.selectedRows))

const isChecked = ref(false)

const isSectedAll = () => {

  isChecked.value = props.body.length === selectedRows.size

}

const toggleSelectAll = async (isSelected: boolean) => {
  try {
    if (isSelected) {
      selectedRows.clear();
      await Promise.all(props.body.map(async (row) => {
        selectedRows.add(row.id);
      }));
    } else {
      selectedRows.clear();
    }

    isSectedAll()

    emitSelectedRows(selectedRows);
  } catch (error) {
    console.error('Error in toggleSelectAll:', error);
  }
};

const handleSelect = (row: RowType) => {
  
  if (selectedRows.has(row.id)) {
    selectedRows.delete(row.id);
  } else {
    selectedRows.add(row.id);
  }

  isSectedAll()
  
  emitSelectedRows(selectedRows)
  
};

const emitSelectedRows = (selectedRows: Set<string | number>) => {
  emit('select', [ ...selectedRows ]);
}


const orderState = ref()

const handleSort = ( data: SortDataEmit ) => {

  orderState.value = data

  emit('sort', data)
}


const commonProps: CommonPropsOptions = reactive({
  header: {
    checked: toRef(isChecked), // ✅ Ensures `checked` remains reactive
    data: toRef( props, 'header'), // ✅ Keeps `props.header` reactive
    hasCheckbox: toRef(props, 'hasCheckbox'),
    sortable: toRef(props, 'sortable'),
    sortField: toRef(props, 'sortField'),
    toggleSelectAll,
    handleSort
  },
  body: {
    rows: toRef(props, 'body'),
    hasCheckbox: toRef(props, 'hasCheckbox'),
    selectedRows,
  },
  tr: {
    handleSelect
  },
  footer: {}
});

provide('commonProps', commonProps) 

</script>
