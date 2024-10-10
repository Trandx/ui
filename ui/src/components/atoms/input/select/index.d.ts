import { PropsType, EmitsType } from "../index.d";

interface IEmitsSelect extends Pick<EmitsType, 'change' | 'update:modelValue'> {
  //(event: "change", elt: unknown ): void;
}

interface IPropsSelect
  extends PropsType {}

declare namespace ISelect {
  export type props = IPropsSelect;
  export type emits = IEmitsSelect;
}

export default ISelect;
