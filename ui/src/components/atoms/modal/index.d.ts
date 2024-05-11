export declare interface IModalEmits {
    (event: "close", elt?: any): void;
}

export declare interface IModalProps {
    open?: boolean
    cssAnimation?: {
        in:  string
        out: string
    },
    class?: string
}

declare interface IModal {
  props: IModalProps;
  emits: IModalEmits;
}
export declare interface IModalHeaderProps {
    title?: string
}
export default IModal;
