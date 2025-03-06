<template>
    <label
      class="flex items-center gap-2 cursor-pointer"
      :class="{ 'opacity-50 cursor-not-allowed': disabled }"
    >
      <input
        type="radio"
        class="hidden"
        :value
        :checked="isChecked"
        :disabled
        @change="handleChange"
      />
      <span
        class=" size-4.5 flex items-center justify-center border-2 rounded-full transition bg-white"
        :class="` ${ isChecked ? checkedClass || 'border-primary-500 bg-primary-500 ': uncheckedClass || 'border-gray-500' }`"
      >
        <span
          class="w-3 h-3 rounded-full transition border-white border"
          :class = "`${isChecked ? checkedClass || 'border-primary-500 bg-primary-500': uncheckedClass || 'border-red-500 bg-red-500' }`"
        ></span>
      </span>
      <div v-if="label">
        <slot>
            <span >{{ label }}</span>
        </slot>
      </div>
    </label>
</template>
<script setup lang="ts">
import { computed } from "vue";

interface Props {
  modelValue: any;
  value: any;
  label?: string;
  disabled?: boolean;
  checkedClass?: string
  uncheckedClass?: string
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (event: "update:modelValue", value: any): void;
}>();

const isChecked = computed(() => props.modelValue === props.value);

const handleChange = () => {
  if (!props.disabled) emit("update:modelValue", props.value);
};
</script>
