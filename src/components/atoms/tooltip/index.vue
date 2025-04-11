<template>
  <Teleport to="body">
    <div 
      ref="tooltipRef" 
      v-show="isVisible"
      :style="tooltipStyle"
      :class
      class="fixed bg-gray-700 border text-white text-xs px-2 py-1 rounded shadow-lg transition-opacity z-1000">
      {{ tooltipText }}
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

defineProps<{class: string }>()

// Refs
const tooltipRef = ref<HTMLDivElement | null>(null);
const tooltipText = ref('');
const isVisible = ref(false);
const position = ref({ x: 0, y: 0 });
const currentTarget = ref<HTMLElement | null>(null);
const originalTitle = ref('');

// Compute tooltip position style
const tooltipStyle = computed(() => ({
  left: `${position.value.x}px`,
  top: `${position.value.y}px`
}));

// Calculate tooltip position, avoiding screen edges
const calculatePosition = (event: MouseEvent): { x: number, y: number } => {
  if (!tooltipRef.value) return { x: 0, y: 0 };
  
  const tooltipWidth = tooltipRef.value.offsetWidth;
  const tooltipHeight = tooltipRef.value.offsetHeight;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  
  let x = event.clientX + 10;
  let y = event.clientY + 20;
  
  // Prevent overflow
  if (x + tooltipWidth > screenWidth) {
    x = event.clientX - tooltipWidth - 10;
  }
  
  if (y + tooltipHeight > screenHeight) {
    y = event.clientY - tooltipHeight - 10;
  }
  
  return { x, y };
};

// Event handlers
const handleMouseEnter = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  
  if (!target.hasAttribute('title')) return;
  
  // Store original title and remove it
  originalTitle.value = target.getAttribute('title') || '';
  target.removeAttribute('title');
  
  // Setup tooltip
  tooltipText.value = originalTitle.value;
  currentTarget.value = target;
  isVisible.value = true;
  
  // Position tooltip (initial position)
  position.value = calculatePosition(event);
};

const handleMouseMove = (event: MouseEvent) => {
  if (isVisible.value) {
    position.value = calculatePosition(event);
  }
};

const handleMouseLeave = () => {
  // Restore original title attribute
  if (currentTarget.value) {
    currentTarget.value.setAttribute('title', originalTitle.value);
    currentTarget.value = null;
  }
  
  isVisible.value = false;
};

// Event delegation with type check
const handleEvent = (event: Event) => {
  if (!(event instanceof MouseEvent)) return;
  
  switch (event.type) {
    case 'mouseenter':
      handleMouseEnter(event);
      break;
    case 'mousemove':
      handleMouseMove(event);
      break;
    case 'mouseleave':
      handleMouseLeave();
      break;
  }
};

// Lifecycle hooks
onMounted(() => {
  document.body.addEventListener('mouseenter', handleEvent, true);
  document.body.addEventListener('mousemove', handleEvent, true);
  document.body.addEventListener('mouseleave', handleEvent, true);
});

onUnmounted(() => {
  document.body.removeEventListener('mouseenter', handleEvent, true);
  document.body.removeEventListener('mousemove', handleEvent, true);
  document.body.removeEventListener('mouseleave', handleEvent, true);
});
</script>