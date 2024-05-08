<template>
    <div
    class="absolute inset-0 w-full flex justify-center items-center z-20 transition-all "
    :class="`${(open?cssAnimation?.in:cssAnimation?.out)} ${props.class}`"
    >
        <slot>
            <ModalBg />
        </slot>
    </div>
</template>

<script lang="ts" setup>
import { reactive} from 'vue';
import {IModalEmits, IModalProps} from './index.d'
import ModalBg from './modal-bg.vue';

const props = defineProps<IModalProps>()
const emit = defineEmits<IModalEmits>()

//const isopen = ref(props.open || true)

const cssAnimation = reactive({
    in: props.cssAnimation?.in || "animate-[fade-in_1s] duration-300",
    out: props.cssAnimation?.out || "invisible"
})

</script>