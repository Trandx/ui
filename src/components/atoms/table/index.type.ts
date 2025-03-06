export interface TheadEmitsType {
  //change: [OptionsType | OptionsType[] | string | number];
  (event: 'selectAll', elt?: any): void
  (event: 'sort', elt: SortDataEmit): void
}

export type SortDataEmit = {
  type: 'asc' | 'desc' | null
  item: string | null
}

export interface TheadPropsType {
  data: string[]
  hasCheckbox?: boolean
  checked?: boolean
  sortable?: boolean
  sortField?: any
}

export interface TbodyEmitsType {
  //change: [OptionsType | OptionsType[] | string | number];
  (event: 'select', elt?: any): void
  (event: 'sort', elt: SortDataEmit): void
}

export interface RowType {
  id: number | string;
  [key: string]: any;
}

export interface NtrOPtions {
  hasCheckbox?: boolean;
  checked?: boolean
  row: RowType;
}

export interface TbodyPropsType {
  rows: RowType[]
  selectedRows?: Set<string | number>;
  hasCheckbox?: boolean;
}



export interface TFooterEmitsType {
  //change: [OptionsType | OptionsType[] | string | number];
  (event: 'change-pagination', elt?: any): void
}

export interface TFooterPropsType {
  currentPage?: number
  itemsPerPage?: number
  itemsPerPageList?: number
  totalItems?: number
  pageNumberLimit?: number
}

export interface TablePropsType {
  header: string[]
  body: RowType[]
  selectedRows?: (number | string)[];
  /*dataFormat ?: {
        name: string
        value: string
    }*/
  hasCheckbox?: boolean
  pagination?: boolean
  sortable?: boolean
  sortField?: string[]
}

export interface CommonPropsOptions {
  header: {
    handleSort: (data: SortDataEmit) => void;
    toggleSelectAll: (state: boolean) => void
  } & TheadPropsType;
  body: TbodyPropsType ;
  tr:{
    handleSelect: (row: RowType) => void;
  }
  footer: TFooterPropsType ;
}
