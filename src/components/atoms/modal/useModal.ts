import { uid } from "@/libs"
import { markRaw, readonly, ref, type Component, type Ref } from "vue"

export interface ModalOptions {
  title: string
  icon?: string
  content?: {
    component: Component
    props?: Record<string, any>
    on?: Record<string, Function>
  }
  footer?: Component | null
  resizable?: boolean
  minimisable?: boolean
  maximisable?: boolean
  closeAfterBgClick?: boolean
  handleClose?: () => void
}

export interface ModalItem extends ModalOptions {
  id: string
  open: boolean
}

const modals = ref<ModalItem[]>([])

export function useModal() {
  const openModal = (options: ModalOptions): string => {
    const modal: ModalItem = {
      id: uid(),
      ...options,
      open: true,
      content: options.content
        ? { ...options.content, component: markRaw(options.content.component) }
        : undefined,
    }
    modals.value.push(modal)
    return modal.id
  }

  const closeModal = (id: string): void => {
    const idx = modals.value.findIndex(m => m.id === id)
    if (idx !== -1) modals.value.splice(idx, 1)
  }

  const closeAllModal = () => {
    modals.value = []
  }

  return {
    modals: readonly(modals) as Readonly<Ref<ModalItem[]>>,
    openModal,
    closeModal,
    closeAllModal
  }
}
