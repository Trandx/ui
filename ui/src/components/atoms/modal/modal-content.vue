<template>
    <div>
        <div class="resizer r_mid_right cursor-col-resize h-full absolute right-0 top-0 w-2 z-[11]"></div>
        <div class="resizer r_mid_left cursor-col-resize h-full absolute left-0 top-0 w-2 z-[11]"></div>
        <div class="resizer r_mid_top cursor-row-resize w-full absolute top-0 h-2 z-[11]"></div>
        <div class="resizer r_mid_bottom cursor-row-resize w-full absolute bottom-0 h-2 z-[11]"></div>
        <!-- cornaries positions-->
        <div class="resizer r_bottom_right cursor-nwse-resize w-2 absolute bottom-0 right-0 h-2 z-[11]"></div>
        <div class="resizer r_bottom_left cursor-nesw-resize w-2 absolute bottom-0 left-0 h-2 z-[11]"></div>
        <div class="resizer r_top_left cursor-nwse-resize w-2 absolute top-0 left-0 h-2 z-[11]"></div>
        <div class="resizer r_top_right cursor-nesw-resize w-2 absolute top-0 right-0 h-2 z-[11]"></div>
        <slot>
            <ModalHeader />
            <ModalBody />
            <ModalFooter />
        </slot>
    </div>
</template>
<script setup lang="ts">
import ModalBody from './modal-body.vue';
import ModalFooter from './modal-footer.vue';
import ModalHeader from './modal-header.vue';

</script>