<template>
    <div
      id="toast-default"
      class="max-w-xs text-gray-500 bg-gray-600 rounded-lg shadow "
      role="alert"
    >
      <div class="flex items-center w-full p-0.5">
        <div
          class="inline-flex items-center justify-center flex-shrink-0 w-6 h-6"
        >
          <slot name="toastIcon">
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </slot>
        </div>
        <div class="ml-3 font-normal w-full">
          <slot name="toastMessage"></slot>
        </div>
        <slot name="toastClose">     
          <button
            id="btn-close"
            type="button"
            class="-mr-0.5 w-6 h-6 m-1  rounded-lg focus:ring-2 focus:ring-gray-300 p-1 inline-flex text-gray-500 hover:text-white bg-gray-800 hover:bg-gray-700"
          >
            <IconClose class="m-auto" />
          </button>
        </slot> 
      </div>
      <div class="px-0.5">
        <div class="w-full bg-gray-200 h-1 rounded-b-full">
          <div
            class="bg-gray-600 h-1 rounded-b-full"
            :class="props_options.progressColor"
            :style="`width: ${percent}%`"
          ></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { Dismiss } from "flowbite";
  import type { DismissOptions, DismissInterface } from "flowbite";
  import { Ref, onMounted, ref, toRefs, watch } from "vue";
  import IconClose from "@/components/atoms/icons/alerts/IconClose.vue";
  
  type Toast = {
    time?: number;
    autoclose: boolean;
    progressColor ?: string;
  };
  
  const percent: Ref<number> = ref(0);
  const completed: Ref<boolean> = ref(false);
  let toast_elt = ref<DismissInterface>();
  
  const props = defineProps<{ options: Toast }>();
  const { options } = toRefs(props);
  const props_options = options;
  
  let intervalId: ReturnType<typeof setInterval>;
  const timer = (time: number = 5000): void => {
    const intervalTime = 100;
    const pas = 100 / (time / intervalTime);
  
    intervalId = setInterval(() => {
      if (percent.value < 100) {
        percent.value += pas;
      } else {
        clearInterval(intervalId);
        completed.value = true;
  
        if (options.value.autoclose && toast_elt.value) {
          toast_elt.value.hide();
        }
      }
    }, intervalTime);
  };
  
  watch(
    () => props_options.value,
    (currentValue) => {
      if (currentValue.autoclose) {
        currentValue.time ? timer(currentValue.time) : timer();
      }
    }
  );
  
  const run_toast = (): DismissInterface => {
    // target element that will be dismissed
    const _targetEl: HTMLElement | null =
      document.getElementById("toast-default");
  
    // optional trigger element
    const _triggerEl: HTMLElement | null = document.getElementById("btn-close");
  
    // options object
    const _options: DismissOptions = {
      transition: "transition-opacity",
      duration: 1000,
      timing: "ease-out",
  
      // callback functions
      onHide: (targetEl) => {
        console.log("element has been dismissed");
        console.log(targetEl);
      },
    };
  
    /*
     * targetEl: required
     * triggerEl: optional
     * options: optional
     */
    const dismiss: DismissInterface = new Dismiss(
      _targetEl,
      _triggerEl,
      _options
    );
  
    if (props_options.value.autoclose) {
      props_options.value.time ? timer(props_options.value.time) : timer();
    }
  
    return dismiss;
  
    // programmatically hide it
    //dismiss.hide();
  };
  
  onMounted(() => {
    toast_elt.value = run_toast();
    //run timer
    //timer()
    console.log(completed.value);
  });
  </script>
  