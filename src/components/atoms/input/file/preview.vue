<template>
    <div class="h-full w-full">
        <img v-if="imagePreview" :src="imagePreview" class=" w-full object-cover rounded" />

        <pre v-else-if="textContent"
            class="bg-gray-100 p-2 rounded max-h-full overflow-auto text-xs">{{ textContent }}</pre>

        <embed v-else-if="pdfUrl" :src="pdfUrl" type="application/pdf" class="w-full h-full" />

        <div v-else class="text-center text-gray-500">
            <i class="fa-solid fa-file text-5xl mb-2"></i>
            Impossible to show a preview for this file.
        </div>
    </div>
</template>

<script setup lang="ts">
interface FilePreview {
    id: string
    name: string
    type: string
    size: number
    ext: string
    imagePreview?: string
    textContent?: string
    pdfUrl?: string
    file: File
}

defineProps<FilePreview>();

</script>