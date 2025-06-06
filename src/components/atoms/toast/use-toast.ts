import { reactive, readonly } from "vue";
import type { ToastProps } from "./index.type";

const state = reactive<{ toasts: ToastProps[] }>({ toasts: [] });

const open = (toast: Omit<ToastProps, "id">) => {
  const newToast = { ...toast, id: Date.now() };
  state.toasts.push(newToast);
  return newToast.id;
};

const close = (id: number | string) => {
  const index = state.toasts.findIndex((toast) => toast.id === id);
  if (index !== -1) {
    state.toasts.splice(index, 1);
  }
};

export function useToast() {
  return {
    toasts: readonly(state.toasts),
    open,
    close,
  };
}
