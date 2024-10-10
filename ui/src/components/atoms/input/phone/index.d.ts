import { PropsType, EmitsType } from "../index.d";

type EmitsPhoneType = Pick<EmitsType, 'update:modelValue'>;

// interface IEmitsPhone extends EmitsType {
//   (event: "update:modelValue", elt: unknown);
// }

interface IPropsPhone extends PropsType<T> {
  max?: number;
  min?: number;
  options: T[]
  //   name: string;
  //   value: {
  //       name: string;
  //       flag: string;
  //       code: string;
  //       dial_code: string;
  //   };
}


declare namespace IPhone {
  export type props<T> = IPropsPhone<T>;
  export type emits = EmitsPhoneType;
}

export default IPhone;
