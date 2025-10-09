<template>
  <!-- Backdrop (uniquement si pas minimisée) -->
  <div v-if="visible && !minimized" class="fixed inset-0 z-10 bg-black/40 h-full" @click="handleBgClick"></div>

  <!-- Fenêtre -->
  <div v-if="visible" ref="windowRef" class=" shadow-xl rounded-lg overflow-hidden fixed " :style="windowStyle"
    @mousedown="bringToFront">
    <!-- Header -->
    <section 
    :class="minimized && 'border border-white rounded-t-lg'"
    class="flex items-center justify-between bg-secondary-500 text-white px-3 py-2 cursor-move select-none"
      @mousedown="startDrag">
        <div class="flex items-center space-x-2 w-4/5">
          <slot name="icon"></slot>
          <span class="font-semibold truncate">{{ title }}</span>
        </div>
        <div class="flex items-center space-x-1">
          <button v-if="minimisable" class="p-0.5 px-1.5 hover:bg-secondary-300 rounded" @click="toggleMinimize">🗕</button>
          <button v-if="maximisable" class="p-0.5 px-1.5  hover:bg-secondary-300 rounded" @click="toggleMaximize">
            {{ maximized ? "🗗" : "🗖" }}
          </button>
          <button class="p-0.5 px-1.5 hover:bg-red-500 hover:text-white rounded" @click="close">✖</button>
        </div>
    </section>

    <!-- Corps de la fenêtre (masqué si minimisée) -->
    <section v-show="!minimized" :style="{ height: `${state.height - 70}px` }" class="p-4  overflow-auto bg-white">
      <slot></slot>
    </section>

    <!-- Pied de page (masqué si minimisée) -->
    <section v-if="!minimized" class="bg-gray-100 px-4 py-2 h-full">
      <slot name="footer"></slot>
    </section>

    <!-- Poignées de redimensionnement (désactivées si minimisée) -->
    <div v-if="!minimized">
      <div v-for="dir in resizeDirs" :key="dir" class="absolute bg-transparent z-12" :class="resizeClass(dir)"
        @mousedown.prevent="startResize($event, dir)"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StyleValue } from "vue";
import { ref, reactive, computed } from "vue";

const props = defineProps<{
  //modelValue: boolean;
  open: boolean
  title?: string;
  closeAfterBgClick?: boolean
  resizable?: boolean
  minimisable?: boolean
  maximisable?: boolean
}>();

const emit = defineEmits(["close"]);

// const emit = defineEmits<{
//   (e: "update:modelValue", value: boolean): void;
// }>();

const visible = computed(() => props.open);
const maximized = ref(false);
const minimized = ref(false);
const zIndex = ref(100);

const state = reactive({
  x: (window.innerWidth - 500) / 2,
  y: (window.innerHeight - 320) / 2,
  width: 500,
  height: 320,
});

const minHeaderHeight = 48;
const minWidth = 200;
const minHeight = minHeaderHeight + 50;

const windowRef = ref<HTMLElement | null>(null);
let dragStart: any = null;
let resizeStart: any = null;
let currentDir: string | null = null;

const resizeDirs = [
  "top",
  "right",
  "bottom",
  "left",
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];

const windowStyle = computed<StyleValue>(() => {
  if (minimized.value) {
    return {
      top: state.y + "px",
      left: state.x + "px",
      width: "250px",
      height: minHeaderHeight + "px",
      //position: "absolute",
      zIndex: zIndex.value,
    };
  }
  return {
    top: state.y + "px",
    left: state.x + "px",
    width: state.width + "px",
    height: state.height + "px",
    //position: "absolute",
    zIndex: zIndex.value,
  };
});

function bringToFront() {
  zIndex.value = Date.now();
}

// --- Drag
function startDrag(e: MouseEvent) {
  if (maximized.value) return;
  dragStart = {
    x: e.clientX,
    y: e.clientY,
    offsetX: e.clientX - state.x,
    offsetY: e.clientY - state.y,
  };
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
}

function onDrag(e: MouseEvent) {
  if (!dragStart) return;
  let newX = e.clientX - dragStart.offsetX;
  let newY = e.clientY - dragStart.offsetY;
  state.x = Math.min(Math.max(newX, -state.width + 50), window.innerWidth - 50);
  state.y = Math.min(Math.max(newY, -minHeaderHeight + 10), window.innerHeight - minHeaderHeight);
}

function stopDrag() {
  dragStart = null;
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
}

// --- Resize
function resizeClass(dir: string) {
  if (!props.resizable) return;
  const base = "absolute bg-transparent";
  switch (dir) {
    case "top": return base + " top-0 left-1/2 -translate-x-1/2 cursor-row-resize h-2 w-full";
    case "bottom": return base + " bottom-0 left-1/2 -translate-x-1/2 cursor-row-resize h-2 w-full";
    case "left": return base + " top-1/2 -translate-y-1/2 left-0 cursor-col-resize w-2 h-full";
    case "right": return base + " top-1/2 -translate-y-1/2 right-0 cursor-col-resize w-2 h-full";
    case "top-left": return base + " top-0 left-0 w-4 h-4 cursor-nwse-resize";
    case "top-right": return base + " top-0 right-0 w-4 h-4 cursor-nesw-resize";
    case "bottom-left": return base + " bottom-0 left-0 w-4 h-4 cursor-nesw-resize";
    case "bottom-right": return base + " bottom-0 right-0 w-4 h-4 cursor-nwse-resize";
  }
  return base;
}

function startResize(e: MouseEvent, dir: string) {
  if (maximized.value) return;

  if (!props.resizable) return;
  resizeStart = {
    mouseX: e.clientX,
    mouseY: e.clientY,
    x: state.x,
    y: state.y,
    width: state.width,
    height: state.height,
  };
  currentDir = dir;
  document.addEventListener("mousemove", onResize);
  document.addEventListener("mouseup", stopResize);
}

function onResize(e: MouseEvent) {
  if (!resizeStart || !currentDir) return;
  let dx = e.clientX - resizeStart.mouseX;
  let dy = e.clientY - resizeStart.mouseY;

  switch (currentDir) {
    case "right": state.width = Math.max(minWidth, resizeStart.width + dx); break;
    case "left":
      state.width = Math.max(minWidth, resizeStart.width - dx);
      state.x = resizeStart.x + (resizeStart.width - state.width);
      break;
    case "bottom": state.height = Math.max(minHeight, resizeStart.height + dy); break;
    case "top":
      state.height = Math.max(minHeight, resizeStart.height - dy);
      state.y = resizeStart.y + (resizeStart.height - state.height);
      break;
    case "top-left":
      state.width = Math.max(minWidth, resizeStart.width - dx);
      state.height = Math.max(minHeight, resizeStart.height - dy);
      state.x = resizeStart.x + (resizeStart.width - state.width);
      state.y = resizeStart.y + (resizeStart.height - state.height);
      break;
    case "top-right":
      state.width = Math.max(minWidth, resizeStart.width + dx);
      state.height = Math.max(minHeight, resizeStart.height - dy);
      state.y = resizeStart.y + (resizeStart.height - state.height);
      break;
    case "bottom-left":
      state.width = Math.max(minWidth, resizeStart.width - dx);
      state.height = Math.max(minHeight, resizeStart.height + dy);
      state.x = resizeStart.x + (resizeStart.width - state.width);
      break;
    case "bottom-right":
      state.width = Math.max(minWidth, resizeStart.width + dx);
      state.height = Math.max(minHeight, resizeStart.height + dy);
      break;
  }
}

function stopResize() {
  resizeStart = null;
  currentDir = null;
  document.removeEventListener("mousemove", onResize);
  document.removeEventListener("mouseup", stopResize);
}

// --- Minimize/Maximize/Close
function toggleMaximize() {
  if (!maximized.value) {
    state.x = 0;
    state.y = 0;
    state.width = window.innerWidth;
    state.height = window.innerHeight;
  } else {
    state.x = (window.innerWidth - 500) / 2;
    state.y = (window.innerHeight - 300) / 2;
    state.width = 500;
    state.height = 300;
  }
  maximized.value = !maximized.value;
  minimized.value = false;
}

function toggleMinimize() {
  
  if (!minimized.value) {
    state.x = 0;
    state.y = window.innerHeight - 40;
  } else {
    state.x = (window.innerWidth - 500) / 2;
    state.y = (window.innerHeight - 300) / 2;
    state.width = 500;
    state.height = 300;
  }
  minimized.value = !minimized.value;
  maximized.value = false;
}

function close() {
  emit('close')
}

function handleBgClick() {
  if (props.closeAfterBgClick) {
    close()
  }
}

</script>
