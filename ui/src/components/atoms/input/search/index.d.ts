
export declare interface IEmitsSearch {
  (event: "change", elt: any ): void;
}

export declare interface ISearch {
  props: IPropsSearch;
  emits: IEmitsList;
}

export declare interface IPropsSearch {
	useMicrophone?: boolean
	isloading?: boolean
	placeholder?: string
}