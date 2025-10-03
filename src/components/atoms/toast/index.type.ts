export interface ToastProps {
  id: number | string;
  icon: string
  title: string
  message?: string
  details?: string | string[];
  time?: number;
  autoclose?: boolean;
  progressColor?: string;
  animation?: {
    open?: string;
    close?: string;
  };
 cssClass?: string
}