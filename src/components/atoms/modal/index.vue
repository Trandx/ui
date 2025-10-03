<template>
  <Modal
    v-for="modal in modals"
    :open="modal.open"
    :key="modal.id"
    :title="modal.title"
    :resizable="modal.resizable"
    :maximisable="modal.maximisable"
    :minimisable="modal.minimisable"
    :close-after-bg-click="modal.closeAfterBgClick"
    @close="handleCloseModal(modal)"
  >
    <template #icon>
      <span>
        <i v-if="modal.icon" :class="modal.icon"></i>
        <i v-else class="fa-regular fa-files"></i>
      </span>
    </template>
    <template #default>
       <component v-if="modal.content"
      :is="modal.content.component"
      v-bind="modal.content.props"
      v-on="modal.content.on"
    />
      <p v-else>No content provided.</p>
    </template>
    <template #footer>
        {{ modal.footer }}
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { useModal, type ModalItem } from "./useModal"
import Modal from "./modal.vue"

const { modals, closeModal } = useModal()

function handleCloseModal(modal: ModalItem) {

  if (typeof modal.handleClose === 'function') {
    modal.handleClose()
  }
  closeModal(modal.id)
}

</script>
