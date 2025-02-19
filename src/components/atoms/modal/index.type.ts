export interface IModalEmits {
    (event: "close", elt?: any): void;
}

export interface IModalProps {
    open?: boolean
    cssAnimation?: {
        in:  string
        out: string
    },
    class?: string
}

interface IModal {
  props: IModalProps;
  emits: IModalEmits;
}
export interface IModalHeaderProps {
    title?: string
}
export default IModal;
