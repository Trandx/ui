<template>
  <div @click.prevent="() => export_Data()">
    <slot>
      <button
        class="py-1.5 px-5 mr-2 mb-2 font-medium focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
      >
        Alternative
      </button>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { XlsExport } from "@/libs";
import { computed, onMounted, ref } from "vue";
import { IExportBtn, ExportType } from ".";

type PropsType = IExportBtn["props"];
//type EmitsType = IExportBtn["emits"];

const props = defineProps<PropsType>();

const data = computed(() => props.data);
const filedetails = computed(() => props.fileDetails);

const xls = ref();
onMounted(() => {
  xls.value = new XlsExport(data.value, props.fileDetails.title);
});

const checkExtensionAndUpdate = () => {
  const file = filedetails.value;
  const index = file.name.lastIndexOf(".");
  const splitFilename = file.name.split(".");
  let ext = null;
  let filenameWithoutExt = null;

  if (splitFilename.length >= 2) {
    ext = file.name.split(".").pop();
    filenameWithoutExt = file.name.substring(0, index);
  }

  //console.log(ext, filenameWithoutExt);

  if (!ext || !(ext in ExportType) || ext !== file.type) {
    //console.log(filenameWithoutExt);
    return (
      filenameWithoutExt?.concat(".", file.type) ||
      file.name.concat(".", file.type)
    );
  }

  return file.name;
};

const export_Data = () => {
  // check file name extension
  const filename = checkExtensionAndUpdate();

  console.log(filename);

  //xls.value[ExportType[filedetails.value.type]](filename);
};
</script>
