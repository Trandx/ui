<template>
  <!-- Toast -->
    <div ref="toastElt" class="w-auto min-w-[320px] bg-white rounded-xl shadow-lg flex flex-wrap justify-center item-center " role="alert">
      <div class="flex p-2 w-full">
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
            <slot name="toastMessage" :message>
              {{ message }}
            </slot>
          </div>
          <div @click='close'>
            <slot name="toastClose">
              <button
                id="btn-close"
                type="button"
                class="-mr-0.5 w-6 h-6 m-1 rounded-lg text-gray-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100"
              >
                <IconClose class="m-auto" />
              </button>
          </slot> 
          </div>
        </div>
      </div>
      <div class=" px-0.5 mx-0 w-full">
        <slot name="toastProgessBar" :percent :progressColor >
          <div class="w-full bg-gray-400 h-1.5 rounded-b-lg">
            <div
              class="bg-secondary-400 h-1.5 rounded-b-full w-full"
              :class="progressColor"
              :style="`width: ${percent}%`"
            ></div>
          </div>
        </slot>
      </div>
    </div>
  <!-- End Toast -->
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import IconClose from '../icons/alerts/IconClose.vue';
import { IToast } from './index.d';
import { zoomIn, zoomOut } from '@/mixins';

  const open = defineModel({ type: Boolean, required: true, default: false})
  const emit = defineEmits()

  const toastElt = ref<HTMLDivElement>()


  //const count = defineModel('count', { type: Number, default: 0 })

  const props = defineProps<IToast>();

  const percent = ref(0);
  const completed = ref(false);

  let intervalId: ReturnType<typeof setInterval>;
  
  const close = () =>{
    open.value = false

    // clear timer if it's running
    intervalId && clearInterval(intervalId)

    //emit('close', true)
  }

  const timer = (time: number = 5000): void => {
    //console.log(intervalId);
    //reset all state
    percent.value = 0
    clearInterval(intervalId)
    // end reset state

    const intervalTime = 50;
    const pas = 100 / (time / intervalTime);
  
    intervalId = setInterval(() => {
      if (percent.value < 100) {
        percent.value += pas;
        //console.log('percent: '+percent.value );
      } else {
        clearInterval(intervalId);
        completed.value = true;
        
        //console.log('autoclose: '+ props.autoclose);
        
        if ( props.autoclose ) {
          open.value = false
        }
      }
    }, intervalTime);
  };

  const isAutoclosed = () => {

    if(!props.autoclose) {
      percent.value = 100
      completed.value = true
    }

    return props.autoclose
  }

  const toggleToast = () => {
    if(open.value){
        
      const openAnimation = props.animation?.open

      openAnimation ? openAnimation(toastElt.value as HTMLElement) : zoomIn(toastElt.value as HTMLElement)

    }else{

      const closeAnimation = props.animation?.close

      closeAnimation ? closeAnimation(toastElt.value as HTMLElement) : zoomOut(toastElt.value as HTMLElement)
      
    }
  }

  watch(
    [open, () => props ],
    ([openState, propsState]) => {
      //console.log({...propsState});
      //toast.open = currentValue
      
      (openState && isAutoclosed()) && timer(propsState.time);

      toggleToast()
    }
  );

  onMounted(() => {
    //run timer
    //console.log(open.value);
    
    (open.value && isAutoclosed()) && timer(props.time)

    if(!open.value){
      toastElt.value?.classList.add('hidden')
      //toggleToast()
    }

  });

</script>