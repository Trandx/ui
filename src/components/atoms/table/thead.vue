<template>
  <thead>
    <tr class="border-b bg-gray-900">
      <th scope="col" class="p-2 px-4" v-if="header.hasCheckbox">
        <div class="flex items-center">
          <NCheckbox
            checked-class="!rounded-sm border-primary-500 bg-primary-500"
            unchecked-class="!rounded-sm border-gray-500"
            :checked="header.checked"
            @change="(state: boolean) => header.toggleSelectAll(state)"
            value="checkall"
          />
        </div>
      </th>
      <slot>
        <th
          v-for="(item, key) in header.data"
          :key="key"
          class="h-6 p-2 cursor-pointer"
          :class="{
            'text-primary-500': sortType.item === item,
          }"
          @click="reverseSort({ item, type: sortType.type })"
        >
          {{ item }}
          <i
            v-if="isSortableField(item, key)"
            :class="{
              'fa-light fa-arrow-up-arrow-down': sortType.item !== item,
              'fa-solid fa-arrow-up-wide-short': sortType.item === item && sortType.type === 'asc',
              'fa-solid fa-arrow-down-wide-short': sortType.item === item && sortType.type === 'desc'
            }"
          ></i>
        </th>
      </slot>
    </tr>
  </thead>
</template>

<script setup lang="ts">
import { inject, reactive } from 'vue';
import type { CommonPropsOptions, SortDataEmit } from './index.type';
import { NCheckbox } from '../input';

const { header } = inject("commonProps") as CommonPropsOptions;

const sortType = reactive<SortDataEmit>({
  type: null,
  item: null,
});

const reverseSort = (data: SortDataEmit) => {
  sortType.item = data.item;
  sortType.type = data.type === 'asc' ? 'desc' : 'asc';
  header.handleSort(sortType);
};

const isSortableField = (fieldValue: string, key: number) => {
  return header.sortable && (!header.sortField || header.sortField[key] === fieldValue);
};
</script>
