interface IEmitsDropdown {
    (event: "change", elt: unknown ): void;
}
export declare interface IDropDown<T> {
    props: IPropsDropdown<T>;
    emits: IEmitsDropdown;
}

interface IPropsDropdown<T> {
    closeAfterClick?: boolean
    open?: boolean
    title?: string
    options?: OptionsType[] | T[];
    optionFormat?: optionFormatType;
}

type OptionsType = string | number | Obj;

type optionFormatType = { name: string; value: valType };