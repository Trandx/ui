export interface IToast {
  time?: number;
  autoclose?: boolean;
  progressColor ?: string;
  message?: string;
  animation?: AnimationType
};

type AnimationType = {
  open?:(elt: HTMLElement, time?: number) => void
  close?: (elt: HTMLElement, time?: number) => void
}