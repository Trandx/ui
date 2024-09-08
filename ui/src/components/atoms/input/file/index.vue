<template>
    <div :class="`h-56 w-full border-2 border-dashed rounded-lg flex justify-center items-center bg-gray-300  hover:border-gray-500 overflow-y-auto scrollbar-w-[5px] scrollbar scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-primary-400 scrollbar-track-slate-700 ${hasError ? 'border-red-500':'border-gray-600'}`">

        <NLoaderDot v-if="isLoaded" class="mx-2" />

        <label v-else for="dropzone-file" class="h-full w-full cursor-pointer">
            <input id="dropzone-file" class="hidden" type="file" :multiple :accept @change="handleChange" ref="fileInput" >
            <div 
                class="space-y-2 h-full w-full"
                @dragover.prevent ="handleDrageOver"
                @dragenter.prevent ="handleDrageEnter"
                @drop.prevent="handleDrop"
            >
                <slot 
                :selectedFiles
                >
                    <div v-if="selectedFiles.length == 0" class="grid content-center h-full">
                        <div class="flex flex-col items-center justify-center space-y-2">
                            <i class="fa-solid fa-cloud-arrow-up fa-bounce fa-2x mb-4 text-gray-500" style="--fa-animation-duration: 2s;"></i>
                        
                            <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p class="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            <p class="py-4  text-sm text-gray-500">
                                I have 
                                <a class="underline font-bold italic cursor-pointer" >URL</a>
                            </p>
                        </div>
                        <div class="px-2 " v-show="FileExtensionException?.length !== 0">
                            <p class="text-red-500">
                                {{  FileExtensionException }}
                            </p>
                        </div>
                    </div>
                    <div class="" v-else>
                        <ul class="inline-block" >
                            <li v-for="(file, key) in selectedFiles" :key class="float-left m-2 relative">
                                <div v-if="file.imagePreview" class="w-[100px] h-[100px] bg-cover bg-center rounded-lg border border-gray-400" :style="`background-image: url(${file.imagePreview})`"></div>
                                <span v-else>
                                    <div class="w-[100px] h-[100px] rounded-lg border border-gray-400 grid content-center text-center">
                                        <span>
                                            <span class="absolute uppercase px-[2px] py-[1px] bottom-[60px] text-[11px] font-bold right-[30px] bg-gray-300 text-secondary-400 rounded-l-md">{{ file.ext }}</span>
                                            <i
                                        :class="`fa-solid fa-file text-gray-500 fa-2x`"></i>
                                        </span>
                                        
                                    </div>
                                </span>
                                <span class="w-[100px] inline-block overflow-ellipsis overflow-hidden whitespace-nowrap" :title="file.name">{{ file.name }}</span>
                                <span class="absolute pl-[5px] pr-[2px]  py-[1px] bottom-9 text-[11px] font-bold right-0 bg-gray-500 text-white rounded-l-lg">{{ fileSizeCovertion(file.size) }}</span>
                            </li>
                        </ul>
                    </div>
                </slot>
            </div>
        </label>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { NLoaderDot } from '../../loader';
import { fileSizeCovertion } from '@/libs';
interface IInputFile {
    accept?: string,
    multiple?: boolean,
    reset?: boolean
    error?: boolean
    errorMsg?: string
}
type FileExtensionExceptionType = string

type EmitsType = {
    (event: "change", elt?: SelectedFileType[]): void;
    (event: "error", elt: any): void;
}
type SelectedFileType = {
    name: string;
    type: string;
    size: number;
    lastModified: number;
    ext?: string ;
    imagePreview?: string | null
}


const props = defineProps<IInputFile>()

const emit = defineEmits<EmitsType>()

const selectedFiles = ref<SelectedFileType[]>([]);

const imageExtensions = ['jpeg', 'jpg', 'png', 'gif', 'svg', 'webp', 'bmp', 'tiff', 'tif', 'ico', 'avif'];


const FileExtensionException = ref<FileExtensionExceptionType>()

const hasError = ref<boolean>()

const isLoaded = ref<boolean>()

const isAcceptableExtension = (file: SelectedFileType) =>{
    const extList = props.accept?.toLocaleLowerCase().replaceAll(/\.| /g, '').split(',')

    const {ext} = file

    if(!ext){
        FileExtensionException.value = 'file extension is undefined'
        return false
    }

    if ( !extList?.includes(ext)) {
        
        FileExtensionException.value = `Invalid file extension: ${ext}. Only: ${props.accept} is accepted`

        hasError.value = true

        return false
    }

    return true
}


const handleChange = async (event: Event) => {
    try {
        const input = event.target as HTMLInputElement;
        const files = input.files;
        await processFile(files)
    } catch (error) {
        console.error(error);
    }
}

const handleDrageOver = (e: Event) => { 
    //console.log(e);
    
}

const handleDrageEnter = (e: Event) => { 
    //console.log(e);
    hasError.value = false
}

const handleDrop = async(event: DragEvent) => {
    const files = event.dataTransfer?.files;
    //console.log(files);
    await processFile(files)
};

const generateImagePreview = (file: File): Promise<string> => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("Error reading file."));
        reader.readAsDataURL(file);
    });

};

const processFile = async (files: FileList | null | undefined) => {
    try {
        FileExtensionException.value = ''
        hasError.value = false

        if (files && files.length > 0) {
            isLoaded.value = true
            const filesArray = Array.from(files);

            selectedFiles.value = []

            for (const file of filesArray) {

                const { name, type, size, lastModified } = file;
                const ext = name.split('.').pop()?.toLowerCase();

                let fileInfo: SelectedFileType = {
                    name,
                    type,
                    size,
                    lastModified,
                    ext
                }

                if(!isAcceptableExtension(fileInfo)){
                    isLoaded.value = false
                    throw FileExtensionException.value;
                }

                fileInfo.imagePreview = (ext && imageExtensions.includes(ext)) ? await generateImagePreview(file) : null;

                selectedFiles.value.push(fileInfo);

            };

            // selectedFiles.value = await Promise.all(filePromises);

            isLoaded.value = false

            console.log(FileExtensionException.value, selectedFiles.value);

        }
    } catch (error: any) {
        throw new Error(error.message);
    }
}

watch(selectedFiles, (newSelectedFiles) => {
    //console.log(newSelectedFiles);
    if(newSelectedFiles){
        emit('change', newSelectedFiles)
    }
    if (FileExtensionException.value?.length != 0) {
        console.log(FileExtensionException.value);

        emit('error', FileExtensionException.value)
    }
})
</script>
  