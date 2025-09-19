import { readonly, ref } from "vue"

export interface ModalOptions {
  title: string
  icon?: string
  content?: any
  footer?: any
  props?: Record<string, any>
  on?: Record<string, Function> // event handlers
}

export interface ModalItem extends ModalOptions {
  id: number,
  open: boolean
}

const modals = ref<ModalItem[]>([])

export function useModal() {
  const openModal = (options: ModalOptions) => {
    const modal: ModalItem = {
      id: Date.now(),
      ...options,
      open: true,
    }
    modals.value.push(modal)
    
    return modal.id
  }

  const closeModal = (id: number) => {
    modals.value = modals.value.filter(m => m.id !== id)
  }

  return {
    modals:  readonly(modals),
    openModal,
    closeModal,
  }
}
