<template>
    <div aria-label="Pagination" class="py-1 bg-secondary-400 rounded-lg min-w">
      <ul class="inline-flex -space-x-px min-w-min">
        <!-- Go to First Button -->
        <li>
          <a
            :class="`${currentPage === 1 ? btnStyle.disabled : btnStyle.default}
                            px-3 py-1.5 ml-0 leading-tight rounded-l-lg `"
            @click="goToPage(1)"
          >
            <span class="sr-only">First</span>
            <i class="fa-solid">&lsaquo;&lsaquo;</i>
          </a>
        </li>
  
        <!-- Previous Button -->
        <li>
          <a
            :class="`${currentPage === 1 ? btnStyle.disabled : btnStyle.default}
                            px-3 py-1.5 ml-0 leading-tight `"
            @click="goToPage(currentPage - 1)"
          >
            <span class="sr-only">Previous</span>
            <i class="fa-solid fa-angle-left"></i>
          </a>
        </li>
  
        <!-- Page Numbers with Limited Visibility -->
        <li
          v-for="page in visiblePageNumbers"
          :key="page"
        >
          <a
          :class="`${btnStyle.default} ${
            page === currentPage ? btnStyle.active : null
          }`"
          class="px-3 py-1.5 leading-tight"
          @click="goToPage(page)"
          >
            {{ page }}
          </a>
        </li>
  
        <!-- Next Button -->
        <li >
          <a
            :class="`${currentPage === totalPages ? btnStyle.disabled : btnStyle.default}
                            px-3 py-1.5 ml-0 leading-tight `"
            @click="goToPage(currentPage + 1)"
          >
            <span class="sr-only">Next</span>
            <i class="fa-solid fa-angle-right"></i>
          </a>
        </li>
  
        <!-- Go to Last Button -->
        <li >
          <a
            :class="`${ currentPage === totalPages ? btnStyle.disabled : btnStyle.default
            } px-3 py-1.5 ml-0 leading-tight rounded-r-lg  `"
            @click="goToPage(totalPages)"
          >
            <span class="sr-only">Last</span>
            <i class="fa-solid">&rsaquo;&rsaquo;</i>
          </a>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, ref, watch } from 'vue';
import { PropType } from 'vue';

  type BtnStyleType = {
    active?: string;
    disabled?: string;
    default?: string;
  };

  type EmitsType = {
    (event: "change", elt: number): void;
  };

  
  const props = defineProps({
    btnStyle: {
      type: Object as PropType<BtnStyleType>,
      default: {
        active: "bg-primary-500 text-white border-primary-500 border",
        default:
          " hover:bg-gray-600 hover:text-white cursor-pointer text-gray-200 ",
        disabled: "bg-gray-500 cursor-not-allowed text-gray-400",
      }
    },
    totalItems: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      default: 10,
    },
    modelValue: {
      type: Number,
      default: 1,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    maxVisiblePages: {
      type: Number,
      default: 5, // Set the maximum visible page numbers
    },
  });
  
  //const emit = defineEmits(['update:modelValue']);
  const emit = defineEmits<EmitsType>();
  
  // Calculate the total number of pages
  const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));
  const currentPage = ref(props.currentPage)
  
  // Calculate visible page numbers based on the current page
  const visiblePageNumbers = computed(() => {
    const pages = [];
    const half = Math.floor(props.maxVisiblePages / 2);
    let start = Math.max(1, currentPage.value - half);
    let end = Math.min(totalPages.value, currentPage.value + half);
  
    if (end - start + 1 < props.maxVisiblePages) {
      if (currentPage.value <= half) {
        end = Math.min(totalPages.value, start + props.maxVisiblePages - 1);
      } else if (currentPage.value + half >= totalPages.value) {
        start = Math.max(1, end - props.maxVisiblePages + 1);
      }
    }
  
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  
    return pages;
  });

  watch(props, ({currentPage : page}) => {
    currentPage.value = page
  })
  
  // Method to update the page
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      //emit('update:modelValue', page);
      currentPage.value = page
      emit('change', page);
    }
  };
  </script>