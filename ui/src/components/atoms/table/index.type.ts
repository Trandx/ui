export interface TheadEmitsType {
    //change: [OptionsType | OptionsType[] | string | number];
    (event: "check-all", elt?: any): void;
    (event: "sort", elt: sortDataEmit): void;

}

export type sortDataEmit = {
    type: "asc" | "desc" | null
    field: string | null
}

export interface TheadPropsType {
    data: string[]
    hasCheckbox?: boolean
    isCheck ?: boolean
    sortable ?: boolean
    sortField ?: any
}

export interface TbodyEmitsType {
    //change: [OptionsType | OptionsType[] | string | number];
    (event: "check", elt?: any): void;
    (event: "sort", elt: sortDataEmit): void;

}

export interface TbodyPropsType {
    data?: object[] | [][]
    dataChecked ?: object[] | [][]
    hasCheckbox?: boolean
    checkAll ?: boolean
    options ?: string[]
}

export interface TFooterEmitsType {
    //change: [OptionsType | OptionsType[] | string | number];
    (event: "change-pagination", elt?: any): void;

}

export interface TFooterPropsType {
    currentPage?: number,
    itemsPerPage?: number,
    itemsPerPageList?: number,
    totalItems?: number,
    pageNumberLimit?: number,
}

export interface TablePropsType {
    header: string[]
    body: object[] | [][]
    /*dataFormat ?: {
        name: string
        value: string
    }*/
    hasCheckbox?: boolean
    pagination ?: boolean
    sortable ?: boolean
    sortField ?: string []
}