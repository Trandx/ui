<template>
  <div ref="modalContent">
    <div class="resizer r_mid_right cursor-col-resize h-full absolute right-0 top-0 w-1 z-[11]"></div>
    <div class="resizer r_mid_left cursor-col-resize h-full absolute left-0 top-0 w-1 z-[11]"></div>
    <div class="resizer r_mid_top cursor-row-resize w-full absolute top-0 h-2 z-[11]"></div>
    <div class="resizer r_mid_bottom cursor-row-resize w-full absolute bottom-0 h-2 z-[11]"></div>
    <!-- corners -->
    <div class="resizer r_bottom_right cursor-nwse-resize w-1 absolute bottom-0 right-0 h-2 z-[11]"></div>
    <div class="resizer r_bottom_left cursor-nesw-resize w-1 absolute bottom-0 left-0 h-2 z-[11]"></div>
    <div class="resizer r_top_left cursor-nwse-resize w-1 absolute top-0 left-0 h-2 z-[11]"></div>
    <div class="resizer r_top_right cursor-nesw-resize w-1 absolute top-0 right-0 h-2 z-[11]"></div>
    <div class="flex flex-col max-h-full">
      <slot>
        <ModalHeader />
        <ModalBody />
        <ModalFooter />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ModalBody from './modal-body.vue'
import ModalFooter from './modal-footer.vue'
import ModalHeader from './modal-header.vue'

const modalContent = ref<HTMLDivElement | null>(null)

let modalBodyScrollHeight: number | null = null
let modalBodyScrollWidth: number | null = null

function adjustModalBodySize() {
  const elt = modalContent.value
  if (!elt) return

  const modalBody = elt.querySelector<HTMLElement>('.modal-body')
  const modalHeader = elt.querySelector<HTMLElement>('.modal-header')
  const modalFooter = elt.querySelector<HTMLElement>('.modal-footer')

  if (!modalBody) return

  const parentWidth = elt.clientWidth
  const parentHeight = elt.clientHeight

  if (modalBodyScrollHeight === null) {
    modalBodyScrollHeight = modalBody.scrollHeight
  }
  if (modalBodyScrollWidth === null) {
    modalBodyScrollWidth = modalBody.scrollWidth
  }

  const availableHeight = parentHeight - (modalHeader?.offsetHeight || 0) - (modalFooter?.offsetHeight || 0)

  if (parentHeight === 0) {
    modalBodyScrollHeight = modalBody.scrollHeight
    elt.style.height = 'auto'
  }
  if (parentWidth === 0) {
    modalBodyScrollWidth = modalBody.scrollWidth
  }

  if (modalBodyScrollHeight > availableHeight && parentHeight !== 0) {
    modalBody.style.height = `${availableHeight}px`
    modalBody.style.width = `${parentWidth}px`
  } else {
    modalBody.style.height = 'auto'
  }

  if (modalBodyScrollWidth > parentWidth && parentWidth !== 0) {
    modalBody.style.width = `${parentWidth}px`
  } else {
    modalBody.style.width = 'auto'
  }

  modalBody.style.overflow = 'auto'
}

onMounted(() => {
  if (modalContent.value) {
    new ResizeObserver(adjustModalBodySize).observe(modalContent.value)
  }
})
</script>
