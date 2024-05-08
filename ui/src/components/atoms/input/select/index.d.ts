import { PropsType, EmitsType } from "../index.d";

export declare  interface IEmitsSelect extends EmitsType {
  (event: "change", elt: unknown ): void;
  (event: "update:modelValue", elt: unknown);
}

export declare interface IPropsSelect<M> extends PropsType<M> {}

declare interface ISeclect<T> {
  props: IPropsSelect<T>;
  emits: IEmitsSelect;
}

export default ISeclect;
