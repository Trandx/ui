import type { PropsType, EmitsType } from '../index.type'

export interface IEmitsSelect extends Pick<EmitsType, 'change' | 'update:modelValue'> {
  //(event: "change", elt: unknown ): void;
}

export interface IPropsSelect extends PropsType {}

namespace ISelect {
  export type props = IPropsSelect
  export type emits = IEmitsSelect
}

export type { ISelect }
