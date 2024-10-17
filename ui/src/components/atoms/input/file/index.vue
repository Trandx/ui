<template>
    <div :class="`h-72 w-full border-2 border-dashed rounded-lg bg-gray-300  hover:border-gray-500 overflow-y-auto scrollbar-w-[5px] scrollbar scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-primary-400 scrollbar-track-slate-700 ${hasError ? 'border-red-500':'border-gray-600'} relative` ">
        <div class="h-full grid content-centers">
            <div class="h-auto"> <!-- don't add h-full here-->
                    <NLoaderDot v-if="isLoaded" class="mx-2" />
                    <label v-else for="dropzone-file" class=" w-full cursor-pointer">
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
                                <div class="h-full pb-4 grid content-center">
                                    <div v-if="showInput.url" class="space-y-2">
                                        <div class=" px-2 space-y-2">
                                            <div class="flex space-x-1 w-full">
                                                <NInput
                                                :placeholder
                                                type="url"
                                                v-model="inputUrl"
                                                :error
                                                @error="handleInputError"
                                                />
                                                <NBtn :disabled="inputError || inputUrl?.length == 0" class="" @click.prevent="handleFecthFile" :isLoading >
                                                    <i class="fa-solid fa-right-left"></i>
                                                </NBtn>
                                            </div>
                                            <NProgressBar v-if="showProgress" class="bg-secondary-400" :pourcentage="progress" />
                                        </div>
                                        <div>
                                            <p class="py-4  text-sm text-gray-500 w-full text-center">
                                                I want to to upload or
                                                <a class="underline font-bold italic cursor-pointer" @click.prevent="handleShowInputSelectFile">Drag and Drop</a>
                                            </p>
                                        </div>

                                        <div class="px-2 " v-if="FileExtensionException?.length != 0">
                                            <p class="text-red-500">
                                                {{  FileExtensionException }}
                                            </p>
                                        </div>
                                    </div>
                                    <div v-if="showInput.selectFile" >
                                        <div class="h-full grid content-center ">
                                            <div class="flex flex-col items-center justify-center space-y-2">
                                                <i class="fa-solid fa-cloud-arrow-up fa-bounce fa-2x mb-4 text-gray-500" style="--fa-animation-duration: 2s;"></i>
                                            
                                                <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p class="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                <p class="py-4  text-sm text-gray-500">
                                                    I have 
                                                    <a @click.prevent="handleShowInputUrl" class="underline font-bold italic cursor-pointer hover:text-primary-400 hover:text-lg" >URL</a>
                                                </p>
                                            </div>
                                            <div class="px-2 " v-if="FileExtensionException?.length != 0">
                                                <p class="text-red-500 text-center">
                                                    {{  FileExtensionException }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="" v-if="selectedFiles.length != 0">
                                        <div class="flex flex-wrap justify-between p-2" >
                                            <div v-for="(file, key) in selectedFiles" :key class="m-1 relative">
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </slot>
                        </div>
                    </label>

                    <div class=" sticky bottom-1" v-if="selectedFiles.length !== 0">
                        <button class="absolute right-3 bottom-0 rounded-lg bg-gray-600  hover:border-gray-500 hover:bg-primary-400" @click='handleResetInput'>
                            <i :class="` fa-solid fa-arrows-rotate ${resetAnimation &&'fa-spin-pulse'} p-1.5`"></i>
                        </button>
                    </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { NLoaderDot, NProgressBar } from '../../loader';
import { fileSizeCovertion, random } from '@trandx/native';
import { NInput, NBtn } from '@/components';
interface IInputFile {
    accept?: string,
    multiple?: boolean,
    reset?: boolean
    error?: boolean
    errorMsg?: string
    same?: boolean
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
    imagePreview?: string | null
}

const props = defineProps<IInputFile>()

const emit = defineEmits<EmitsType>()

const selectedFiles = ref<SelectedFileType[]>([]);

const imageExtensions = ['jpeg', 'jpg', 'png', 'gif', 'svg', 'webp', 'bmp', 'tiff', 'tif', 'ico', 'avif'];

const FileExtensionException = ref<string>('')

const hasError = ref<boolean>()

const isLoaded = ref<boolean>()

const resetAnimation = ref<boolean>(false)

const showInput = reactive({
    url: false,
    selectFile: true,
    lastView: '',
})

const showProgress = ref<boolean>()

const placeholder = 'http://example.com'

const inputUrl = ref<string>('')

const inputError = ref<boolean>(false)

const isLoading = ref<boolean>(false)

const progress = ref<number>(0)

const isAcceptableExtension = (file: SelectedFileType) =>{
    try {
        const extList = props.accept?.toLocaleLowerCase().replaceAll(/\.| /g, '').split(',')

        const {ext} = file

        if(!ext){
            throw new Error("file extension is undefined");
            
            // FileExtensionException.value = 'file extension is undefined'
            // return false
        }

        if ( !extList?.includes(ext)) {
            throw new Error(`Invalid file extension: ${ext}. Only: ${props.accept} is accepted`);
            
            // FileExtensionException.value = `Invalid file extension: ${ext}. Only: ${props.accept} is accepted`

            // hasError.value = true
            // progress.value = 1
            // showProgress.value = false

            // return false
        }

        return true
    } catch (error: any) {
        throw error;
    }
    
}

const resetError = () => {
    FileExtensionException.value = ''
    hasError.value = false
}
const dispatchError = (error: any) => {
    hasError.value = true
    FileExtensionException.value = error.message
    showProgress.value = false
    progress.value = 0.2

    console.error(error);

}

const showSelectedFile = () => {
    showInput.url = false
    showInput.selectFile = false
}

const handleInputError = (e: any) => {
    const  {error} = e;
    
    if(error){
        inputError.value = true
        return
    }
    inputError.value = false
}

const handleResetInput = ()=> {
    resetAnimation.value = true
    setTimeout(() => {
        
        selectedFiles.value = []
        resetAnimation.value = false

        if(showInput.lastView == 'url'){
            showInput.url = true
            progress.value = 0
            showProgress.value = false
            inputUrl.value = ''
        }else{
            showInput.selectFile = true
            showInput.lastView = 'selectFile'
        }
    }, 500);
}

const handleShowInputUrl = () => {
    showInput.url = true
    showInput.selectFile = false
    showInput.lastView = 'url'
    resetError()
}

const handleShowInputSelectFile = () => {
    showInput.url = false
    showInput.selectFile = true
    showInput.lastView = 'selectFile'
    resetError()
}


const handleChange = async (event: Event) => {
    try {
        resetError()
        const input = event.target as HTMLInputElement;
        const files = input.files;
        await processFile(files)

        showSelectedFile()

    } catch (error: any) {
        dispatchError(error)
        //throw error;
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
    try {
        resetError()
        const files = event.dataTransfer?.files;
        //console.log(files);
        await processFile(files)

        showSelectedFile()

    } catch (error: any) {
        dispatchError(error);
        throw error;
    }
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

        if (files && files.length > 0) {
            isLoaded.value = true

            const filesArray = Array.from(files);

            if (!props.multiple) {
                selectedFiles.value = []
            }

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

                isAcceptableExtension(fileInfo);

                fileInfo.imagePreview = (ext && imageExtensions.includes(ext)) ? await generateImagePreview(file) : null;

                if ( selectedFiles.value.length == 0 ||  selectedFiles.value.every((file) => file.name !== fileInfo.name)) {
                   
                    selectedFiles.value.push(fileInfo);
                }

                //throw new Error(`${fileInfo.name} has been already selected`);

            };

        }
    } catch (error: any) {
        throw error;
    }
    finally {
        isLoaded.value = false
    }
}

const handleFecthFile = async () => {
    try {
        //console.log(inputUrl.value);
        resetError()

        showProgress.value = true

        inputUrl.value && await fetchFile(inputUrl.value)
    } catch (error) {
        dispatchError(error);
        //throw error
    }
}

const fetchFile = async (url: string) => {
    try {
        isLoading.value = true
        progress.value = 0.2

        const response = await fetch(url);

        if (!response.ok) {
            // Handle HTTP errors like 404, 500, etc.
            //console.log(response);
            
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const contentLength = response.headers.get('Content-Length');
        const total = contentLength ? parseInt(contentLength, 10) : 0;

        //console.log(response.body);

        if (!response.body) throw new Error('ReadableStream not yet supported in this browser.');

        const reader = response.body.getReader();
        const chunks = [];
        let receivedLength = 0;

        while (true) {
            const { done, value } = await reader.read();

            if (done) break;

            if (value) {
                chunks.push(value);
                receivedLength += value.length;
                progress.value = total ? Math.round((receivedLength / total) * 100) : 100;

                //console.log(progress.value);
            }
        }

        const contentType = response.headers.get('Content-Type');

        const blob = new Blob(chunks, { type: contentType || undefined});

        const ext = contentType?.split('/')[1];
        
        //fileSrc.value = URL.createObjectURL(blob);

        //console.log(fileSrc.value);

        // Convert the Blob to a File
        const file = new File([blob], `${random(8)}.${ext}`);

        // Create a DataTransfer object
        const dataTransfer = new DataTransfer();

        // Append the File to the DataTransfer object
        dataTransfer.items.add(file);

        // Access the files (as in an input element)
        const fileList = dataTransfer.files;

        await processFile(fileList)

        showSelectedFile()

    } catch (error: any) {
        //console.error('Error fetching the image:', error.message);
        throw error;
    } finally {
        isLoading.value = false;
    }
};

watch(()=> props, ({reset, error, errorMsg}) => {
    //console.log(reset);
    if (reset) {
        handleResetInput()
    }

    if (error) {
        handleResetInput()
        hasError.value = true
        FileExtensionException.value = errorMsg || 'something was wrong !!!'
    }

    if (errorMsg) {
        FileExtensionException.value = errorMsg
    }
})

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
  