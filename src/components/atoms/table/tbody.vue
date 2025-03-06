<template>
  <tbody>
    
    <slot :rows :has-checkbox :selectedRows >
      <NTr :row :has-checkbox :checked="selectedRows?.has(row.id)"
        v-for="(row, key) in rows "
        :key
      >
    </NTr>
    </slot>
  </tbody>
</template>
<script setup lang="ts">
import type { CommonPropsOptions} from './index.type'
import { NTr } from '.';
import { inject } from 'vue';

const { body: { rows, hasCheckbox, selectedRows} } = inject("commonProps") as CommonPropsOptions

</script>
