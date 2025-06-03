<template>
    <div class="fixed z-1000 space-y-2"
    :class="toastPosition[position]"
    >
      <Toast
        class ="pointer-events-auto"
        v-for="toast in toasts"
        :key="toast.id"
        :="{...toast as any}"
        @close="closeToast(toast.id)"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { useToast } from "./use-toast.ts"
  import Toast from "./toast.vue";

  interface IProps {
    position?: "center" | "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center"
  }

  withDefaults(defineProps<IProps>(), { position: 'bottom-left'}) 

  const toastPosition = {
    "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "top-left": "top-2.5 left-2.5",
    "top-right": "top-2.5 right-2.5",
    "top-center": "top-2.5 left-1/2 -translate-x-1/2",
    "bottom-left": "bottom-2.5 left-2.5",
    "bottom-right": "bottom-2.5 right-2.5",
    "bottom-center": "bottom-2.5 left-1/2 -translate-x-1/2",
  }
  
  const { toasts, close } = useToast();
  
  const closeToast = (id: number | string) => {
    console.log(`Closing toast with id: ${id}`);
    
    close(id);
  };
  </script>
  