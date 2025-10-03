// composables/usePagination.ts
import { computed, ref } from "vue";

export interface UsePaginationOptions {
  totalItems: number;
  pageSize?: number;
  initialPage?: number;
}

export function usePagination(options: UsePaginationOptions) {
  const pageSize = ref(options.pageSize ?? 10);
  const currentPage = ref(options.initialPage ?? 1);
  const totalItems = ref(options.totalItems);

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(totalItems.value / pageSize.value))
  );

  const hasNext = computed(() => currentPage.value < totalPages.value);
  const hasPrev = computed(() => currentPage.value > 1);

  function next() {
    if (hasNext.value) currentPage.value++;
  }

  function prev() {
    if (hasPrev.value) currentPage.value--;
  }

  function goTo(page: number) {
    if (page < 1) currentPage.value = 1;
    else if (page > totalPages.value) currentPage.value = totalPages.value;
    else currentPage.value = page;
  }

  // helper: get slice of data for current page
  function slice<T>(items: T[]) {
    const start = (currentPage.value - 1) * pageSize.value;
    return items.slice(start, start + pageSize.value);
  }

  return {
    // state
    currentPage,
    pageSize,
    totalItems,
    totalPages,

    // flags
    hasNext,
    hasPrev,

    // actions
    next,
    prev,
    goTo,
    slice,
  };
}
