import { reactive, readonly } from "vue";
import type { ToastProps } from "./index.type";
import { uid } from "@/libs";

// Use correct type annotation for reactive array
const state = reactive<ToastProps[]>([]);

const open = (toast: Omit<ToastProps, "id">) => {
  const newToast: ToastProps = {
    ...toast,
    id: uid(), // You might want to use a UUID instead
  };

  state.push(newToast);
  return newToast.id;
};

const close = (id: number | string) => {
  const index = state.findIndex((toast) => toast.id === id);
  if (index !== -1) {
    state.splice(index, 1);
  }
};

// Explicit return type improves dev experience
export function useToast(): {
  toasts: ReadonlyArray<ToastProps>;
  open: (toast: Omit<ToastProps, "id">) => number | string;
  close: (id: number | string) => void;
} {
  return {
    toasts: readonly(state) as ReadonlyArray<ToastProps>,
    open,
    close,
  };
}
