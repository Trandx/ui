<template>
    <div ref="modalContent">
        <div class="resizer r_mid_right cursor-col-resize h-full absolute right-0 top-0 w-1 z-[11]"></div>
        <div class="resizer r_mid_left cursor-col-resize h-full absolute left-0 top-0 w-1 z-[11]"></div>
        <div class="resizer r_mid_top cursor-row-resize w-full absolute top-0 h-2 z-[11]"></div>
        <div class="resizer r_mid_bottom cursor-row-resize w-full absolute bottom-0 h-2 z-[11]"></div>
        <!-- cornaries positions-->
        <div class="resizer r_bottom_right cursor-nwse-resize w-1 absolute bottom-0 right-0 h-2 z-[11]"></div>
        <div class="resizer r_bottom_left cursor-nesw-resize w-1 absolute bottom-0 left-0 h-2 z-[11]"></div>
        <div class="resizer r_top_left cursor-nwse-resize w-1 absolute top-0 left-0 h-2 z-[11]"></div>
        <div class="resizer r_top_right cursor-nesw-resize w-1 absolute top-0 right-0 h-2 z-[11]"></div>
        <div class="relative">
             <slot>
                <ModalHeader />
                <ModalBody />
                <ModalFooter />
            </slot>
        </div>
       
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ModalBody from './modal-body.vue';
import ModalFooter from './modal-footer.vue';
import ModalHeader from './modal-header.vue';

const modalContent = ref<HTMLDivElement>()

let modalBodyScrollHeight: number|null, modalBodyScrollWidth: number|null = null

function adjustModalBodySiize() {

    const elt =  modalContent.value
    const modalBody = elt?.querySelector<HTMLElement>('.modal-body')
    const modalHeader = elt?.querySelector<HTMLElement>('.modal-header')
    const modalFooter = elt?.querySelector<HTMLElement>('.modal-footer')

    if ( !elt || !modalBody) {
        return
    }

    const parentWidth =  elt.clientWidth
    const parentHeight =  elt.clientHeight

    //const totalHeight = modalBody.offsetHeight + (modalHeader?.offsetHeight || 0) + (modalFooter?.offsetHeight || 0)

    if (!modalBodyScrollHeight) {
        modalBodyScrollHeight =  modalBody.scrollHeight
    }

    if (!modalBodyScrollWidth) {
        modalBodyScrollWidth =  modalBody.scrollWidth
    }

    const currentModalBody = parentHeight - (modalHeader?.offsetHeight || 0) - (modalFooter?.offsetHeight || 0)

    //console.log(modalBodyScrollHeight, parentHeight, currentModalBody);

    if (parentHeight === 0) {
        modalBodyScrollHeight =  modalBody.scrollHeight
        elt.style.height = 'auto'
    }

    if (parentWidth === 0) {
        modalBodyScrollWidth =  modalBody.scrollWidth
    }

    if ( modalBodyScrollHeight > currentModalBody && parentHeight !== 0 ) {
        modalBody.style.height = `${currentModalBody}px`;
        modalBody.style.width = `${parentWidth}px`;
    }else {
        modalBody.style.height = 'auto'
    }

    if (modalBodyScrollWidth > parentWidth  && parentWidth !== 0 ) {
        modalBody.style.width = `${parentWidth}px`;
    }else{
        modalBody.style.width = 'auto'
    }

    modalBody.style.overflow = 'auto';

}

onMounted(() => {
    if (modalContent.value) {
        new ResizeObserver(adjustModalBodySiize).observe(modalContent.value)
    }
})

</script>