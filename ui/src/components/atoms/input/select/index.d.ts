import { PropsType, EmitsType } from "../index.d";

export type EmitsSelectType = Pick<EmitsType, 'change' | 'update:modelValue'>;

export declare interface IPropsSelect<M> extends PropsType<M> {}

declare interface ISeclect<T> {
  props: IPropsSelect<T>;
  emits: EmitsSelectType;
}

export default ISeclect;
