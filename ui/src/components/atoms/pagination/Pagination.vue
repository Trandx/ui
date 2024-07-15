<template>
  <nav class="py-1">
    <ul class="inline-flex -space-x-px">
      <li>
        <a
          :class="`${_pagin.isFirstPage ? btnStyle.disabled : btnStyle.default}
                           px-3 py-1.5 ml-0 leading-tight rounded-l-lg `"
          @click="handleClickOnFirst"
        >
          <span class="sr-only">First</span>
          <i class="fa-solid">&lsaquo;&lsaquo;</i>
        </a>
      </li>
      <li>
        <a
          :class="`${_pagin.isFirstPage ? btnStyle.disabled : btnStyle.default}
                           px-3 py-1.5 ml-0 leading-tight `"
          @click="handleClickOnPrevent"
        >
          <span class="sr-only">Previous</span>
          <i class="fa-solid fa-angle-left"></i>
        </a>
      </li>
      <li v-for="(item, key) in _pagin.currentPages" :key="key">
        <a
          :class="`${btnStyle.default} ${
            item === _pagin.currentPageNumber ? btnStyle.active : null
          }`"
          class="px-3 py-1.5 leading-tight"
          @click="handleClickOnItem(item)"
        >
          {{ item }}
        </a>
      </li>

      <li>
        <a
          :class="`${_pagin.isLastPage ? btnStyle.disabled : btnStyle.default}
                           px-3 py-1.5 ml-0 leading-tight `"
          @click="handleClickOnNext"
        >
          <span class="sr-only">Next</span>
          <i class="fa-solid fa-angle-right"></i>
        </a>
      </li>
      <li>
        <a
          :class="`${
            _pagin.isLastPage ? btnStyle.disabled : btnStyle.default
          } px-3 py-1.5 ml-0 leading-tight rounded-r-lg  `"
          @click="handleClickOnLast()"
        >
          <span class="sr-only">Last</span>
          <i class="fa-solid">&rsaquo;&rsaquo;</i>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { IPagination, _paginType, _BtnStyleType } from ".";
import { range } from "@/mixins";

type PropsType = IPagination["props"];
type EmitsType = IPagination["emits"];

const props = defineProps<PropsType>();
const maxPage = computed((): number =>
  Math.ceil(props.totalItems / props.itemsPerPage)
);


const numberLimit = ref(props.pageNumberLimit || 3);

const _pagin = reactive<_paginType>({
  pageNumberLimit: numberLimit.value,
  maxPageNumberLimit: numberLimit.value,
  minPageNumberLimit: 1,
  currentPageNumber: 1,
  currentPages: [],
  previousPageNumber: 0,
  maxPage: maxPage.value,
  isLastPage: false,
  isFirstPage: false,
});

const btnDefaultStyle: _BtnStyleType = {
  active: " bg-primary-400 text-white border-primary-400 border",
  default:
    "bg-secondary-400 hover:bg-gray-600 hover:border-gray-600 hover:text-white cursor-pointer text-gray-200 ",
  disabled: "bg-gray-500 cursor-not-allowed text-gray-400",
};

const btnStyle = computed(() => props.btnStyle || btnDefaultStyle);

const emit = defineEmits<EmitsType>();

const emitItem = (emitted = true) => {
  emitted && emit("change", _pagin.currentPageNumber);
  visiblePageItems();

  _pagin.isLastPage = _pagin.currentPageNumber === _pagin.maxPage;
  _pagin.isFirstPage = _pagin.currentPageNumber === 1;
};

const handleClickOnItem = (pageNumber: number) => {
  _pagin.previousPageNumber = _pagin.currentPageNumber;
  _pagin.currentPageNumber = pageNumber;
  emitItem();
};

const handleClickOnLast = () => {
  if (_pagin.maxPage) {
    _pagin.currentPageNumber = _pagin.maxPage;
    emitItem();
  }
};

const handleClickOnFirst = () => {
  _pagin.currentPageNumber = 1;
  emitItem();
};

const handleClickOnNext = () => {
  if (_pagin.maxPage && _pagin.currentPageNumber < _pagin.maxPage) {
    _pagin.currentPageNumber++;
    //visiblePageItems();
    emitItem();
  }
};

const handleClickOnPrevent = () => {
  if (_pagin.currentPageNumber > 1) {
    _pagin.previousPageNumber = _pagin.currentPageNumber;
    _pagin.currentPageNumber--;
    //visiblePageItems();
    emitItem();
  }
};

const visiblePageItems = () => {
  const test = Math.ceil(_pagin.pageNumberLimit / 2) - 1;

  const max_val = _pagin.currentPageNumber + test;
  if (_pagin.maxPage) {
    if (max_val && max_val < _pagin.maxPage) {
      if (max_val < _pagin.pageNumberLimit) {
        _pagin.maxPageNumberLimit = _pagin.pageNumberLimit;
      } else {
        _pagin.maxPageNumberLimit = max_val;
      }
    } else {
      _pagin.maxPageNumberLimit = _pagin.maxPage;
    }
  }

  // _pagin.maxPageNumberLimit =
  //   max_val < _pagin.maxPage
  //     ? max_val < _pagin.pageNumberLimit
  //       ? _pagin.pageNumberLimit
  //       :
  //     : _pagin.maxPage;

  const min_val = _pagin.maxPageNumberLimit - _pagin.pageNumberLimit + 1;

  _pagin.minPageNumberLimit = min_val >= 1 ? min_val : 1;

  _pagin.currentPages = range({
    start: _pagin.minPageNumberLimit,
    end: _pagin.maxPageNumberLimit,
  });
};

const checkCurrentPageNumber = (currentPage: number) => {
  if (currentPage > _pagin.maxPage || currentPage < 1) {
    _pagin.currentPageNumber = 1;
  } else {
    _pagin.currentPageNumber = currentPage;
  }
};

watch(props, (newProps) => {
  _pagin.maxPage = maxPage.value;
  checkCurrentPageNumber(newProps.currentPage);

  if (newProps.pageNumberLimit) {
    _pagin.pageNumberLimit = newProps.pageNumberLimit;
    _pagin.maxPageNumberLimit = newProps.pageNumberLimit;
  }

  _pagin.maxPageNumberLimit = _pagin.currentPageNumber + 1;
  _pagin.minPageNumberLimit =
    _pagin.maxPageNumberLimit - _pagin.pageNumberLimit + 1;
  //_pagin.isFirstPage = ""
  // _pagin.isLastPage = ""

  //emitItem();
  //visiblePageItems();
});

onMounted(() => {
  _pagin.pageNumberLimit = numberLimit.value;
  checkCurrentPageNumber(props.currentPage);

  emitItem(false);  // initialize but don't emit
  //visiblePageItems();
});
</script>
