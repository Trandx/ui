import { reactive, readonly } from "vue";
import type { ToastProps } from "./index.type";


const state = reactive<{ toasts: ToastProps[] }>({ toasts: [] });

const open = (toast: Omit<ToastProps, "id">) => {
  const newToast = { ...toast, id: Date.now() };
  
  state.toasts.push(newToast);

//   if (toast.autoclose !== false) {
//     setTimeout(() => close(newToast.id!), toast.time ?? 5000);
//   }
};

const close = (id: number | string) => {
  state.toasts = state.toasts.filter((toast) => toast.id !== id);
};

export function useToast() {
  return {
    toasts: readonly(state.toasts),
    open,
    close,
  };
}
