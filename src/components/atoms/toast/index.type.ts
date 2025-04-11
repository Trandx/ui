export interface ToastProps {
  id: number | string;
  icon: string
  message?: string | string[];
  time?: number;
  autoclose?: boolean;
  progressColor?: string;
  animation?: {
    open?: string;
    close?: string;
  };
 cssClass?: string
}