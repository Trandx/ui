
export declare interface PropsType<T> {
  options: OptionsType[] | T[];
  optionFormat?: optionFormatType;
  placeholder?: string;
  selectedOptions?: OptionsType | K | (OptionsType | K)[];
  multipleSelect?: boolean;
  searchable?: boolean;
  autoclose?: boolean;
  deletableBtn?: boolean;
  //disabled?: boolean;
}

export declare interface EmitsType {
  //change: [OptionsType | OptionsType[] | string | number];
  (event: "change", elt?: any): void;
  
  (event: "update:modelValue", elt: unknown);
  (event: "error", elt: any): void;
  (event: "blur", elt?: any): void;
  (event: "focus", elt?: any): void;
  (event: "keyup.enter", elt?: any): void;
  //(event: 'remove'): void
}

export type InputErrorType = {
  type?:"EMAIL_ERROR"|"NUMBER_ERROR"|"MAX_NUMBER_ERROR"|"MIN_NUMBER_ERROR"|"MIN_LENGTH_ERROR"|"MAX_LENGTH_ERROR"|"PATTERN_ERROR"|""
  error?: boolean,
  message?: string
}


export declare interface IInput{
  type: "number" | "password" | "text"|"email"
  maxlength?: number
  minlength?: number
  max?: number
  min?: number
  value?: string | number
  pattern?: string
  required?: boolean
  label?: string
  placeholder?: string
  errorMsg?: string
  disabled?: boolean
}

type valType = any;

type optionFormatType = { name: string; value: valType };

type Obj = {
  [P in valType]: valType;
};

type OptionsType = string | number | Obj;
