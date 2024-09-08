import { PropsType, EmitsType } from "../index.d";

type EmitsPhoneType = Pick<EmitsType, 'update:modelValue'>;

// interface IEmitsPhone extends EmitsType {
//   (event: "update:modelValue", elt: unknown);
// }

interface IPropsPhone<M> extends PropsType<M> {
  max?: number;
  min?: number;
  //   name: string;
  //   value: {
  //       name: string;
  //       flag: string;
  //       code: string;
  //       dial_code: string;
  //   };
}

declare interface IPhone<T> {
  props: IPropsPhone<T>;
  emits: EmitsPhoneType;
}

export default IPhone;
