export interface IButton {
    type?: "button" | "submit" | "reset" | undefined;
    disabled?: boolean;
    label?: string;
}