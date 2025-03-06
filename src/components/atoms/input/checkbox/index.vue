<template>
  <label
  class="flex items-center space-x-2 cursor-pointer"
  :class="{ 'opacity-50 cursor-not-allowed': disabled }"
  >
    <input
      type="checkbox"
      class="hidden"
      :disabled
      :value
      :checked="isChecked"
      @change="onChange"
    />
    <div
      class="size-4.5 border-2 rounded-md flex items-center justify-center transition-all"
      :class="isChecked ? checkedClass || 'bg-primary-500 border-primary-500' : uncheckedClass || 'bg-white border-gray-400'"
    >
      <svg
        v-show="isChecked"
        class="w-4 h-4 text-white"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
      </svg>
    </div>
    <div v-if="label">
        <slot>
            <span >{{ label }}</span>
        </slot>
    </div>
  </label>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';

interface Props {
  modelValue?: any[];
  checked?: boolean
  value: any;
  label?: string;
  disabled?: boolean;
  checkedClass?: string
  uncheckedClass?: string
}
const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue', 'change']);

const isChecked = ref( props.checked || props.modelValue?.includes(props.value));

const onChange = () => {
  
  isChecked.value = !isChecked.value
  
  if(props.modelValue){
    if (isChecked.value) {
      emit('update:modelValue', [...props.modelValue, props.value]);
    } else {
      emit('update:modelValue', props.modelValue.filter(item => item !== props.value));
    }
  }

  emit('change', isChecked.value)
};

watch(() => props.modelValue, () => {
  isChecked.value = props.modelValue?.includes(props.value);
});

watch(() => props.checked, () => {
  isChecked.value = props.checked;
});
</script>
