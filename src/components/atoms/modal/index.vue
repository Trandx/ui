<template>
  <Modal
    v-for="modal in modals"
    :open="modal.open"
    :key="modal.id"
    :title="modal.title"
    @close="closeModal(modal.id)"
  >
    <template #icon>
      <span>
        <i v-if="modal.icon" :class="modal.icon"></i>
        <i v-else class="fa-regular fa-files"></i>
      </span>
    </template>
    <template #default>
       <component v-if="modal.content"
      :is="modal.content"
      v-bind="modal.props"
      v-on="modal.on"
    />
      <p v-else>No content provided.</p>
    </template>
    <template #footer>
        {{ modal.footer }}
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { useModal } from "./useModal"
import Modal from "./modal.vue"

const { modals, closeModal } = useModal()

</script>
