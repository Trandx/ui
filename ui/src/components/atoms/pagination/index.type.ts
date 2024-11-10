type PropsType = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  maxVisiblePages?: number;
  btnStyle?: _BtnStyleType;
};
type EmitsType = {
  (event: "change", elt: number): void;
};

export type _BtnStyleType = {
  active?: string;
  disabled?: string;
  default?: string;
};

export type _paginType = {
  currentPageNumber: number;
  pageNumberLimit: number;
  maxPageNumberLimit: number;
  minPageNumberLimit: number;
  currentPages: number[];
  maxPage: number;
  isLastPage: boolean;
  isFirstPage: boolean;
  previousPageNumber: number;
};

namespace IPagination {
  export type props = PropsType;
  export type emits = EmitsType;
}

export default IPagination;
