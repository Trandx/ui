export interface IButton {
    type?: "button" | "submit" | "reset" | undefined;
    disabled?: boolean;
    label?: string;
    isLoading?: boolean
    loadingMsg?: string
}