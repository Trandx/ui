import type { PropsType, EmitsType } from '../index.type'

export interface IEmitsList extends EmitsType {
  //(event: "change", elt: unknown ): void;
}

export interface IPropsList extends Omit<PropsType, 'autoclose' | 'placeholder'> {}

namespace IList {
  export type props = IPropsList
  export type emits = IEmitsList
}

export type { IList }
