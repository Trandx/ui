<template>
  <div class="h-[512px] border relative" @click="zoomIn">
    <canvas class="bg-gray-800 w-full h-full opacity-7" alt=""></canvas>
    <div
      ref="cropElt"
      :class="`${
        style?.border || 'border-primary-400'
      } absolute top-5 h-[128px] w-[128px]  border-2`"
      draggable="true"
    >
      <canvas
        :class="`${
          type == 'circle' ? 'rounded-full' : ''
        } border-2 h-full w-full ${style?.border || 'border-primary-400'}`"
      ></canvas>
      <!-- <div class="dot rotate" id="rotate"></div>
            <div class="rotate-link bg-[#1E88E5] hover:bg-[#0D47A1]"></div> -->
      <div
        :class="`${style?.dot?.default || 'bg-[#1E88E5]'} ${
          style?.dot?.hover || ' hover:bg-[#0D47A1]'
        } resizer top-left`"
      ></div>
      <div
        :class="`${style?.dot?.default || 'bg-[#1E88E5]'} ${
          style?.dot?.hover || ' hover:bg-[#0D47A1]'
        } resizer bottom-left`"
      ></div>
      <div
        :class="`${style?.dot?.default || 'bg-[#1E88E5]'} ${
          style?.dot?.hover || ' hover:bg-[#0D47A1]'
        } resizer  mid-top`"
      ></div>
      <div
        :class="`${style?.dot?.default || 'bg-[#1E88E5]'} ${
          style?.dot?.hover || ' hover:bg-[#0D47A1]'
        } resizer mid-bottom`"
      ></div>
      <div
        :class="`${style?.dot?.default || 'bg-[#1E88E5]'} ${
          style?.dot?.hover || ' hover:bg-[#0D47A1]'
        } resizer mid-left`"
      ></div>
      <div
        :class="`${style?.dot?.default || 'bg-[#1E88E5]'} ${
          style?.dot?.hover || ' hover:bg-[#0D47A1]'
        } resizer mid-right`"
      ></div>
      <div
        :class="`${style?.dot?.default || 'bg-[#1E88E5]'} ${
          style?.dot?.hover || ' hover:bg-[#0D47A1]'
        } resizer bottom-right`"
      ></div>
      <div
        :class="`${style?.dot?.default || 'bg-[#1E88E5]'} ${
          style?.dot?.hover || ' hover:bg-[#0D47A1]'
        } resizer top-right`"
      ></div>

      <div
        :class="`${
          style?.border || 'border-primary-400'
        } w-full border-2 border-dotted   absolute top-[50%] -z-1`"
      ></div>
      <div
        :class="`${
          style?.border || 'border-primary-400'
        } h-full border-2 border-dotted absolute  top-[0%] left-[calc(50%-2px)] -z-1`"
      ></div>
    </div>
  </div>
</template>

<style src="./style.css" scoped></style>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { ICropImage, ImageCropper } from "./index.d";
import CropImage from "./utils/crop-image.class";

const cropImage = new CropImage();

const emit = defineEmits<{
  crop: [ICropImage];
}>();

const props = defineProps<ImageCropper>();

const cropElt = ref<HTMLElement>();
// const imageCropped = ref()

const zoomIn = ()=>{
  cropImage.zoomIn(1.5)
}

const build = () => {
  if (cropElt.value && props.src) {
    const corner_class = {
      resizer_top_left: "top-left",
      resizer_mid_top: "mid-top",
      resizer_top_right: "top-right",
      resizer_mid_left: "mid-left",
      resizer_mid_right: "mid-right",
      resizer_bottom_left: "bottom-left",
      resizer_mid_bottom: "mid-bottom",
      resizer_bottom_right: "bottom-right",
    };

    cropImage
      .run({
        crop_elt: cropElt.value,
        img_src: props.src,
        crop_size: props.cropSize,
        corner_class,
      })
      ?.oncrop((/*e : Event*/) => {
        /**
         * to get data, you can use the const cropImage or event e
         *
         * eg 1 :
         *
         * // const crop = e.currentTarget as CropImage
         * // console.log(crop.getImageCropped());
         *
         * eg 2:
         *
         * //cropImage.download();
         * //imageCropped.value.src = cropImage.getImageCropped()
         *
         */

        emit("crop", cropImage);
      });
  }
};

watch(
  props,
  () => {
    build();
  },
  { deep: true }
);

onMounted(() => {
  build();
});
</script>
