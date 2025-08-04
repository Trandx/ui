export interface ToastProps {
  id: number | string;
  icon: string
  title: string
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