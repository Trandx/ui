<template>
    <div class=" w-full  h-64 border-2 border-dashed rounded-lg cursor-pointer  bg-gray-300 border-gray-600 hover:border-gray-500">
        <label for="dropzone-file" class="h-full w-full block ">
            <input id="dropzone-file" class="hidden" type="file" :multiple :accept @change="handleChange" ref="fileInput" >
            <div 
                class="drop-zone h-full"
                @dragover.prevent ="handleDrageOver"
                @dragenter.prevent ="handleDrageEnter"
                @drop.prevent="handleDrop"
            >
                <slot
                :selectedFiles
                >
                
                    <div v-if="selectedFiles.length == 0" class="flex flex-col items-center justify-center pt-5 pb-6">
                        <i class="fa-solid fa-cloud-arrow-up fa-bounce w-8 h-8 mb-4 text-gray-500" style="--fa-animation-duration: 2s;"></i>
                        
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <div v-else>
                        <div v-for="(file, key) in selectedFiles" :key class="flex items-center space-x-2 p-2">
                            <div>
                                <img v-if="file.url"
                                class="h-[25px]"  :src="file.url" />

                                <i v-else
                                :class="`fa-solid fa-file-${file.ext} w-full text-[25px] text-gray-500`"
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
import { ref, watch } from 'vue';
interface IInputFile {
    accept?: string,
    multiple?: boolean,
}
type FileExtensionExceptionType = {
    msg: string
    file: SelectedFileType
}
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
    url?: string | null
}
const props = defineProps<IInputFile>()

const emit = defineEmits<EmitsType>()

const progress = ref(20)

const progressVisible = ref(true)

const selectedFiles = ref<SelectedFileType[]>([]);

const imageExtensions = ['jpeg', 'jpg', 'png', 'gif', 'svg', 'webp', 'bmp', 'tiff', 'tif', 'ico', 'avif'];

const FileExtensionException = ref<FileExtensionExceptionType[]>([])

const isAcceptableExtension = (file: SelectedFileType) =>{
    const extList = props.accept?.toLocaleLowerCase().replaceAll(/\.| /g, '').split(',')

    const {ext} = file

    if(!ext){
        FileExtensionException.value?.push({
            msg: 'file extension is not defined',
            file,
        })
        return false
    }

    if ( !extList?.includes(ext)) {
        FileExtensionException.value?.push({
            msg: `the .${ext} is not acceptable. extension list: ${extList}`,
            file,
        })

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
    if (files && files.length > 0) {
        
        const filesArray = Array.from(files);

        const filePromises: Promise<SelectedFileType | null>[] = filesArray.map((async(file) => {
    
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
                return null
            }
            
            fileInfo.url = (ext && imageExtensions.includes(ext)) ? await generateImagePreview(file) : null;

            return fileInfo;
        }));

        const resolvedFiles = await Promise.all(filePromises);

        selectedFiles.value = resolvedFiles.filter(file => file !== null) as SelectedFileType[];

        console.log(FileExtensionException.value, selectedFiles.value);

    }
}

watch(selectedFiles, (newSelectedFiles) => {
    //console.log(newSelectedFiles);
    if(newSelectedFiles){
        emit('change', newSelectedFiles)
    }
    if (FileExtensionException.value.length != 0) {
        console.log(FileExtensionException.value);
        
        emit('error', FileExtensionException.value)
    }
})
</script>
  