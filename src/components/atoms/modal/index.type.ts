export interface IModalEmits {
  (event: 'close', elt?: any): void
  (event: 'expandOrRestore', elt?: any): void
  (event: 'minimizeOrRestore', elt?: any): void
}

export interface IModalProps {
  open?: boolean
  cssAnimation?: {
    in: string
    out: string
  }
  class?: string
}

export interface IModal {
  props: IModalProps
  emits: IModalEmits
}
export interface IModalHeaderProps {
  title?: string
}
