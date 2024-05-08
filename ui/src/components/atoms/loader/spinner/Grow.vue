<template>
  <div
    class="bg-primary-400 inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full align-[-0.125em] text-secondary-500 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
    role="status"
  >
    <span
      class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Loading...</span
    >
  </div>

  <!-- <span class="relative flex h-3 w-3">
    <span
      class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
    ></span>
    <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
  </span> -->
</template>
