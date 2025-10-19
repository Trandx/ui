<template>
  <div 
    v-if="shouldShowPagination" 
    aria-label="Pagination" 
    class="py-1 bg-secondary-500 rounded-lg w-fit mx-auto"
  >
    <ul class="inline-flex -space-x-px min-w-min">
      <!-- Go to First Button -->
      <li>
        <a
          :class="getButtonClass(isFirstPage, true)"
          @click="handlePageChange(1)"
          @keydown.enter.prevent="handlePageChange(1)"
          @keydown.space.prevent="handlePageChange(1)"
          :aria-disabled="isFirstPage"
          :tabindex="isFirstPage ? -1 : 0"
          role="button"
          title="Go to first page"
        >
          <span class="sr-only">First</span>
          <i class="fa-solid">&lsaquo;&lsaquo;</i>
        </a>
      </li>

      <!-- Previous Button -->
      <li>
        <a
          :class="getButtonClass(isFirstPage)"
          @click="handlePageChange(currentPageInternal - 1)"
          @keydown.enter.prevent="handlePageChange(currentPageInternal - 1)"
          @keydown.space.prevent="handlePageChange(currentPageInternal - 1)"
          :aria-disabled="isFirstPage"
          :tabindex="isFirstPage ? -1 : 0"
          role="button"
          title="Go to previous page"
        >
          <span class="sr-only">Previous</span>
          <i class="fa-solid fa-angle-left"></i>
        </a>
      </li>

      <!-- First Page (if not in visible range) -->
      <li v-if="showFirstPage">
        <a
          :class="getPageButtonClass(1)"
          @click="handlePageChange(1)"
          @keydown.enter.prevent="handlePageChange(1)"
          @keydown.space.prevent="handlePageChange(1)"
          :aria-current="1 === currentPageInternal ? 'page' : undefined"
          :tabindex="0"
          role="button"
          title="Go to page 1"
        >
          1
        </a>
      </li>

      <!-- First Ellipsis -->
      <li v-if="showFirstEllipsis">
        <span class="px-3 py-1.5 leading-tight text-gray-400 select-none" aria-hidden="true">...</span>
      </li>

      <!-- Visible Page Numbers -->
      <li v-for="page in visiblePageNumbers" :key="page">
        <a
          :class="getPageButtonClass(page)"
          @click="handlePageChange(page)"
          @keydown.enter.prevent="handlePageChange(page)"
          @keydown.space.prevent="handlePageChange(page)"
          :aria-current="page === currentPageInternal ? 'page' : undefined"
          :tabindex="0"
          role="button"
          :title="`Go to page ${page}`"
        >
          {{ page }}
        </a>
      </li>

      <!-- Last Ellipsis -->
      <li v-if="showLastEllipsis">
        <span class="px-3 py-1.5 leading-tight text-gray-400 select-none" aria-hidden="true">...</span>
      </li>

      <!-- Last Page (if not in visible range) -->
      <li v-if="showLastPage">
        <a
          :class="getPageButtonClass(totalPagesComputed)"
          @click="handlePageChange(totalPagesComputed)"
          @keydown.enter.prevent="handlePageChange(totalPagesComputed)"
          @keydown.space.prevent="handlePageChange(totalPagesComputed)"
          :aria-current="totalPagesComputed === currentPageInternal ? 'page' : undefined"
          :tabindex="0"
          role="button"
          :title="`Go to page ${totalPagesComputed}`"
        >
          {{ totalPagesComputed }}
        </a>
      </li>

      <!-- Next Button -->
      <li>
        <a
          :class="getButtonClass(isLastPage)"
          @click="handlePageChange(currentPageInternal + 1)"
          @keydown.enter.prevent="handlePageChange(currentPageInternal + 1)"
          @keydown.space.prevent="handlePageChange(currentPageInternal + 1)"
          :aria-disabled="isLastPage"
          :tabindex="isLastPage ? -1 : 0"
          role="button"
          title="Go to next page"
        >
          <span class="sr-only">Next</span>
          <i class="fa-solid fa-angle-right"></i>
        </a>
      </li>

      <!-- Go to Last Button -->
      <li>
        <a
          :class="getButtonClass(isLastPage, false, true)"
          @click="handlePageChange(totalPagesComputed)"
          @keydown.enter.prevent="handlePageChange(totalPagesComputed)"
          @keydown.space.prevent="handlePageChange(totalPagesComputed)"
          :aria-disabled="isLastPage"
          :tabindex="isLastPage ? -1 : 0"
          role="button"
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
    default: 0,
    validator: (value: number) => value >= 0,
  },
  itemsPerPage: {
    type: Number,
    default: 10,
    validator: (value: number) => value > 0,
  },
  currentPage: {
    type: Number,
    default: 1,
    validator: (value: number) => value >= 1,
  },
  maxVisiblePages: {
    type: Number,
    default: 5,
    validator: (value: number) => value >= 3,
  },
  hideOnSinglePage: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'change', page: number): void
}>()

/**
 * Normalise une valeur numérique pour éviter les cas problématiques
 */
const normalizeNumber = (value: number | undefined | null, defaultValue: number, min = 0): number => {
  if (value === undefined || value === null || isNaN(value)) return defaultValue
  return Math.max(min, Math.floor(value))
}

/**
 * Calcul sécurisé du nombre total de pages
 */
const totalPagesComputed = computed(() => {
  const items = normalizeNumber(props.totalItems, 0, 0)
  const perPage = normalizeNumber(props.itemsPerPage, 10, 1)
  
  // Si totalItems n'est pas défini ou est 0, on retourne 0 (pas de pagination)
  if (items === 0) return 0
  return Math.max(1, Math.ceil(items / perPage))
})

/**
 * Page courante interne (normalisée)
 */
const currentPageInternal = ref(1)

// Initialisation et synchronisation de la page courante
watch(
  [() => props.currentPage, totalPagesComputed],
  ([newPage, totalPages]) => {
    const normalized = normalizeNumber(newPage, 1, 1)
    currentPageInternal.value = Math.min(normalized, totalPages)
  },
  { immediate: true }
)

/**
 * États utilitaires
 */
const isFirstPage = computed(() => currentPageInternal.value <= 1)
const isLastPage = computed(() => currentPageInternal.value >= totalPagesComputed.value)

/**
 * Détermine si la pagination doit être affichée
 */
const shouldShowPagination = computed(() => {
  const total = totalPagesComputed.value
  const items = normalizeNumber(props.totalItems, 0, 0)
  
  // Ne pas afficher si pas d'items ou si une seule page et hideOnSinglePage activé
  if (items === 0 || total === 0) return false
  if (props.hideOnSinglePage && total <= 1) return false
  
  return true
})

/**
 * Calcule les numéros de pages visibles
 */
const visiblePageNumbers = computed(() => {
  const total = totalPagesComputed.value
  const current = currentPageInternal.value
  const maxVisible = Math.max(3, normalizeNumber(props.maxVisiblePages, 5, 3))
  
  // Si pas de pages ou une seule page
  if (total <= 1) return total === 1 ? [1] : []
  
  // Si toutes les pages peuvent être affichées
  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  
  // Calcul des pages visibles avec la logique d'ellipse
  const pages: number[] = []
  const sidePages = Math.floor((maxVisible - 3) / 2) // Pages de chaque côté (exclut première et dernière)
  
  let start = Math.max(2, current - sidePages)
  let end = Math.min(total - 1, current + sidePages)
  
  // Ajustement si on est proche du début ou de la fin
  if (current <= sidePages + 2) {
    end = Math.min(total - 1, maxVisible - 1)
  } else if (current >= total - sidePages - 1) {
    start = Math.max(2, total - maxVisible + 2)
  }
  
  // Génère la liste des pages (exclut 1 et total qui sont gérés séparément)
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

/**
 * Détermine si la première page doit être affichée séparément
 */
const showFirstPage = computed(() => {
  const visible = visiblePageNumbers.value
  return visible.length > 0 && visible[0] > 1
})

/**
 * Détermine si la première ellipse doit être affichée
 */
const showFirstEllipsis = computed(() => {
  const visible = visiblePageNumbers.value
  return visible.length > 0 && visible[0] > 2
})

/**
 * Détermine si la dernière page doit être affichée séparément
 */
const showLastPage = computed(() => {
  const visible = visiblePageNumbers.value
  const total = totalPagesComputed.value
  return visible.length > 0 && visible[visible.length - 1] < total
})

/**
 * Détermine si la dernière ellipse doit être affichée
 */
const showLastEllipsis = computed(() => {
  const visible = visiblePageNumbers.value
  const total = totalPagesComputed.value
  return visible.length > 0 && visible[visible.length - 1] < total - 1
})

/**
 * Gère le changement de page de manière sécurisée
 */
const handlePageChange = (page: number) => {
  const total = totalPagesComputed.value

  console.log(total);
  
  
  // Ne rien faire si pas de pagination active
  if (total === 0) return
  
  const safePage = Math.max(1, Math.min(page, total))
  
  if (safePage !== currentPageInternal.value) {
    currentPageInternal.value = safePage
    emit('change', safePage)
  }
}

/**
 * Génère les classes CSS pour les boutons de navigation
 */
const getButtonClass = (disabled: boolean, isFirst = false, isLast = false): string => {
  const base = 'px-3 py-1.5 ml-0 leading-tight'
  const rounded = isFirst ? 'rounded-l-lg' : isLast ? 'rounded-r-lg' : ''
  const style = disabled ? props.btnStyle.disabled : props.btnStyle.default
  
  return `${style} ${base} ${rounded}`
}

/**
 * Génère les classes CSS pour les boutons de page
 */
const getPageButtonClass = (page: number): string => {
  const base = 'px-3 py-1.5 leading-tight'
  const isActive = page === currentPageInternal.value
  
  return `${props.btnStyle.default} ${isActive ? props.btnStyle.active : ''} ${base}`
}
</script>

<style scoped>
/* Amélioration de l'accessibilité au clavier */
a[role="button"]:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

a[role="button"][aria-disabled="true"] {
  pointer-events: none;
}
</style>