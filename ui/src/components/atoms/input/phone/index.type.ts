import { PropsType, EmitsType } from "../index.type";

type EmitsPhoneType = Pick<EmitsType, 'update:modelValue'>;

// interface IEmitsPhone extends EmitsType {
//   (event: "update:modelValue", elt: unknown);
// }

interface IPropsPhone extends PropsType {
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


declare namespace IPhone {
  export type props = IPropsPhone;
  export type emits = EmitsPhoneType;
}

export default IPhone;
