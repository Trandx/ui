<template>
    <div class=" w-full  h-64 border-2 border-dashed rounded-lg cursor-pointer  hover:bg-gray-800 bg-gray-700 border-gray-600 hover:border-gray-500">
        <label for="dropzone-file" class="h-full w-full">
            <input id="dropzone-file" class="hidden" type="file" :multiple :accept @change="handleChange" ref="fileInput" >
            <div 
                class="drop-zone" 
                @dragover.prevent 
                @dragenter.prevent 
                @drop.prevent="handleDrop"
                @click="triggerFileInput"
            >
                <slot
                :selectedFiles
                >
                    <div v-if="!selectedFiles" class="flex flex-col items-center justify-center pt-5 pb-6">
                        <i class="fa-solid fa-cloud-arrow-up fa-bounce w-8 h-8 mb-4 text-gray-500" style="--fa-animation-duration: 2s;"></i>
                        
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <div v-else>
                        <div v-for="(file, key) in selectedFiles" :key class="flex items-center">
                            <div>
                                {{ file }}
                                <img v-if="file.url"  :src="file.url" />

                                <i
                                :class="`fa-solid fa-file-${file.ext} w-8 h-8 text-gray-500`"
                                style="--fa-animation-duration: 2s;"></i>
                            </div>
                            <div>
                                <p>{{ file.name }}</p>
                                <div v-if="progressVisible" class="w-full rounded-full h-2.5 bg-gray-700">
                                    <div class="bg-primary-400 h-2.5 rounded-full" :style="{ width: progress + '%' }"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </slot>
            </div>
        </label>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
interface IInputFile {
    accept?: string,
    multiple?: boolean,
}
type SelectedFileType = {
    name: string;
    type: string;
    size: number;
    lastModified: number;
    ext: string | undefined;
    url: string | null
}
const props = defineProps<IInputFile>()

const imageUrl = ref<string | null>(null);

const progress = ref()

const progressVisible = ref(true)

const selectedFiles = ref<SelectedFileType[]>();

const fileInfos = ref<string[]>()

const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'tiff', 'ico'];


const handleChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (files && files.length > 0) {
        const filesArray = Array.from(files);

        selectedFiles.value = filesArray.map((file) =>{
            const {name, type, size, lastModified } = file
            const ext = name.split('.').pop()

            const url = (ext && imageExtensions.includes(ext)) ? generateImagePreview(file) : null;

            return {
                name,
                type,
                size,
                lastModified,
                url,
                ext
            }
        });

        console.log(selectedFiles.value);

    }
}

const triggerFileInput = () => {
    
}

const handleDrop = () => {
    
}

const generateImagePreview = (file: File) => {
    const reader = new FileReader();

    let url = ''
    
    reader.onload = (e) => {

        url = e.target?.result as string;

        console.log(url);

    };

    reader.onloadend = () => {
        
        reader.readAsDataURL(file);

        return url
    }

    
};
</script>
  