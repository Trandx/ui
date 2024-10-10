export declare interface PropsType {
  options: OptionsType[] ;
  optionFormat?: optionFormatType;
  placeholder?: string;
  selectedOptions?: OptionsType | OptionsType[];
  multipleSelect?: boolean;
  searchable?: boolean;
  autoclose?: boolean;
  deletableBtn?: boolean;
  hasError?: boolean;
  disabled?: boolean;
  activeClass?: string;
}

export type EmitsType = {
  'change': [elt?: any];
  'update:modelValue': [elt: any];
  'error': [elt: any];
  'blur': [elt?: any];
  'focus': [elt?: any];
  'keyup.enter': [elt?: any];
};

export type InputErrorType = {
  type?:"URL_ERROR"|"EMAIL_ERROR"|"NUMBER_ERROR"|"MAX_NUMBER_ERROR"|"MIN_NUMBER_ERROR"|"MIN_LENGTH_ERROR"|"MAX_LENGTH_ERROR"|"PATTERN_ERROR"|""
  error?: boolean,
  message?: string
}


export declare interface IInput{
  type: "number" | "password" | "text"|"email" | 'url'
  maxlength?: number
  minlength?: number
  max?: number
  min?: number
  modelValue?: string | number
  pattern?: string
  required?: boolean
  label?: string
  placeholder?: string
  errorMsg?: string
  disabled?: boolean
  error?: boolean
}

type valType = any;

type optionFormatType = { name: string; value: valType };

type Obj = {
  [P in valType]: valType;
};

type OptionsType = string | number | Obj;
