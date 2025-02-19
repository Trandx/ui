import { PropsType, EmitsType } from "../index.type";

interface IEmitsSelect extends Pick<EmitsType, 'change' | 'update:modelValue'> {
  //(event: "change", elt: unknown ): void;
}

interface IPropsSelect
  extends PropsType {}

namespace ISelect {
  export type props = IPropsSelect;
  export type emits = IEmitsSelect;
}

export default ISelect;
