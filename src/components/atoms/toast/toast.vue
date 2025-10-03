<template>
  <div
    v-if="isVisible"
    ref="toastElt"
    :class="`min-w-[250px] rounded-lg shadow-lg flex flex-wrap justify-center item-center bg-white
    ${cssClass || ''} ${animationClass}`"
    role="alert"
  >
    <div class="flex p-2 w-full">
      <div class="flex items-start space-x-2 w-full p-0.5">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-6 h-6">
          <slot name="toastIcon">
            <i :class="icon"></i>
          </slot>
        </div>
        <div class="font-normal w-full">
          <slot name="toastTitle" :title>
            <div class=" font-semibold">{{ title }}</div>
          </slot>
          
          <slot name="toastMessage" :message>
            <div class="">
              {{ message }}
            </div>
          </slot>
          <slot name="toastDetails" :details>
            <p class="mt-1 text-sm whitespace-pre-wrap" v-if="details">
               <ul class="list-disc" v-if="Array.isArray(details)">
                <li class=" " v-for="(item, key) in details" :key="key">
                  {{ item }}
                </li>
              </ul>
              <span v-else> {{ details }}</span>
            </p>
          </slot>
        </div>
        
        <div @click="close" class="cursor-pointer w-5 h-5 p-1 rounded-sm bg-red-500 opacity-50 touch:opacity-100 hover:opacity-100 focus:outline-none  focus:opacity-100 flex justify-center items-center text-white ">
          <slot name="toastClose">
                <i class="fa-regular fa-xmark "></i>
          </slot>
        </div>
      </div>
    </div>
    <div class="px-0.5 mx-0 w-full">
      <slot name="toastProgressBar" :percent="percent" :progressColor="progressColor">
        <div class="w-full bg-gray-300 h-1.5 rounded-b-lg">
          <div
            class="bg-secondary-500 h-1.5 rounded-b-full"
            :class="progressColor"
            :style="`width: ${percent}%`"
          ></div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import type { ToastProps } from "./index.type";

const props = withDefaults(defineProps<ToastProps>(), {
  time: 5000,
  autoclose: true,
  progressColor: "",
  animation: () => ({
    open: "animate-[slide-in-down_0.7s]",
    close: "animate-[slide-out-up_0.7s]",
  }),
});

const emit = defineEmits(["close"]);

const toastElt = ref<HTMLElement | null>(null);
const percent = ref(0);
const isVisible = ref(true);
const animationClass = ref<string>();

let intervalId: number | undefined;

const close = () => {

  animationClass.value = props.animation.close
  const index = animationClass.value?.search(/_\w+s/i)

  const time = index ? animationClass.value?.[index] : null

  setTimeout(() => {
    isVisible.value = false;

    emit("close");
  }, time ? (+time)*1000 : 300);
};

const timer = (time: number = 5000): void => {
  percent.value = 0;
  clearInterval(intervalId);

  const intervalTime = 50;
  const pas = 100 / (time / intervalTime);

  intervalId = window.setInterval(() => {
    if (percent.value < 100) {
      percent.value += pas;
    } else {
      clearInterval(intervalId);
      if (props.autoclose) close();
    }
  }, intervalTime);
};

watch(isVisible, (newValue) => {
  if (newValue && props.autoclose) {
    timer(props.time);
  }
});

onMounted(() => {
  animationClass.value = props.animation.open
  
  if (props.autoclose) {
    timer(props.time);
  }
});
</script>
