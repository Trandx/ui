<template>
  <div aria-label="Pagination" class="py-1 bg-secondary-500 rounded-lg min-w-min">
    <ul class="inline-flex -space-x-px min-w-min">
      <!-- Go to First Button -->
      <li>
        <a
          :class="`${currentPage === 1 ? btnStyle.disabled : btnStyle.default} px-3 py-1.5 ml-0 leading-tight rounded-l-lg`"
          @click="goToPage(1)"
          :aria-disabled="currentPage === 1"
          tabindex="0"
          title="Go to first page"
        >
          <span class="sr-only">First</span>
          <i class="fa-solid">&lsaquo;&lsaquo;</i>
        </a>
      </li>
      <!-- Previous Button -->
      <li>
        <a
          :class="`${currentPage === 1 ? btnStyle.disabled : btnStyle.default} px-3 py-1.5 ml-0 leading-tight`"
          @click="goToPage(currentPage - 1)"
          :aria-disabled="currentPage === 1"
          tabindex="0"
          title="Go to previous page"
        >
          <span class="sr-only">Previous</span>
          <i class="fa-solid fa-angle-left"></i>
        </a>
      </li>
      <!-- Page Numbers with Limited Visibility and Ellipsis -->
      
      <li v-if="visiblePageNumbers[0] > 1">
        <a
          :class="`${btnStyle.default} ${1 === currentPage ? btnStyle.active : ''} px-3 py-1.5 leading-tight`"
          @click="goToPage(1)"
          :aria-current="1 === currentPage ? 'page' : undefined"
          tabindex="0"
          title="Go to first page"
        >
          1
        </a>
      </li>
      <li v-if="visiblePageNumbers[0] > 2" >
        <span class="px-3 py-1.5 leading-tight text-gray-400 select-none">...</span>
      </li>
      <li v-for="page in visiblePageNumbers" :key="page">
        <a
          :class="`${btnStyle.default} ${page === currentPage ? btnStyle.active : ''} px-3 py-1.5 leading-tight`"
          @click="goToPage(page)"
          :aria-current="page === currentPage ? 'page' : undefined"
          tabindex="0"
          :title="`Go to page ${page }`"
          :aria-label="`Go to page ${page}`"
        >
          {{ page }}
        </a>
      </li>
      <li v-if="visiblePageNumbers[visiblePageNumbers.length - 1] < totalPages - 1">
        <span class="px-3 py-1.5 leading-tight text-gray-400 select-none">...</span>
      </li>
      <li v-if="visiblePageNumbers[visiblePageNumbers.length - 1] < totalPages">
        <a
          :class="`${btnStyle.default} ${ totalPages === currentPage ? btnStyle.active : ''} px-3 py-1.5 leading-tight`"
          @click="goToPage(totalPages)"
          :aria-current="totalPages === currentPage ? 'page' : undefined"
          tabindex="0"
          title="Go to last page"
          :aria-label="`Go to page ${totalPages}`"
        >
          {{ totalPages }}
        </a>
      </li>
      <!-- Next Button -->
      <li>
        <a
          :class="`${currentPage === totalPages ? btnStyle.disabled : btnStyle.default} px-3 py-1.5 ml-0 leading-tight`"
          @click="goToPage(currentPage + 1)"
          :aria-disabled="currentPage === totalPages"
          tabindex="0"
          title="Go to next page"
        >
          <span class="sr-only">Next</span>
          <i class="fa-solid fa-angle-right"></i>
        </a>
      </li>
      <!-- Go to Last Button -->
      <li>
        <a
          :class="`${currentPage === totalPages ? btnStyle.disabled : btnStyle.default} px-3 py-1.5 ml-0 leading-tight rounded-r-lg`"
          @click="goToPage(totalPages)"
          :aria-disabled="currentPage === totalPages"
          tabindex="0"
          title="Go to last page"
        >
          <span class="sr-only">Last</span>
          <i class="fa-solid">&rsaquo;&rsaquo;</i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, type PropType } from 'vue'

type BtnStyleType = {
  active?: string
  disabled?: string
  default?: string
}

const props = defineProps({
  btnStyle: {
    type: Object as PropType<BtnStyleType>,
    default: () => ({
      active: 'bg-primary-500 text-white border border-primary-500',
      default: 'hover:bg-gray-600 hover:text-white cursor-pointer text-gray-200',
      disabled: 'bg-gray-500 cursor-not-allowed text-gray-400',
    }),
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
  maxVisiblePages: {
    type: Number,
    default: 5,
  },
})

const emit = defineEmits<{
  (e: 'change', page: number): void
}>()

const totalPages = computed(() => Math.max(1, Math.ceil(props.totalItems / props.itemsPerPage)))
const currentPage = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  currentPage.value = val
})

const visiblePageNumbers = computed(() => {
  const pages: number[] = []
  const total = totalPages.value
  const max = props.maxVisiblePages-2
  let start = Math.max(2, currentPage.value - Math.floor(max / 2))
  let end = Math.min(total-1, start + max - 1)

  if (end - start + 1 < max) {
    start = Math.max(2, end - max + 1)
  }

  // Adjust if near the end
  if (end > total) {
    end = total
    start = Math.max(2, end - max + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (pages.length === 0 && total > 0) {
    pages.push(1)
  }
  
  console.log(start, end, pages);
  

  return pages
})

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
    currentPage.value = page
    emit('change', page)
  }
}
</script>