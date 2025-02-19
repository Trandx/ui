
export declare interface IEmitsSearch {
  (event: "change", elt: any ): void;
}

export declare interface ISearch {
  props: IPropsSearch;
  emits: IEmitsSearch;
}

export declare interface IPropsSearch {
	useMicrophone?: boolean
	isloading?: boolean
	placeholder?: string
}