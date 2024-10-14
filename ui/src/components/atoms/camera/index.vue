<template>
    <div class="border-2 border-primary-400 rounded-lg  grid grid-cols-1 content-between">
        <div class="bg-primary-400 h-full flex justify-between items-center py-0.5 space-x-2 px-1">
            <div class="text-white text-lg flex items-center bg-primary-400 ">
                <i class="fa-regular fa-camera-web"></i>
            </div>
            <NSelect 
            class="w-full ring-1 ring-white rounded-lg"
            :options="cameras"
            placeholder="select Camera"
            :multiple-select="false"
            :autoclose="true"
            :searchable="true"
            :selected-options="cameras[0]|| null"
            :deletable-btn="false"
            @change="changeCamera"
            title="select camera"
            />
            <div class="text-white text-lg ">
                <button @click.prevent="refreshCamera" class="px-2 py-1 bg-secondary-400 hover:bg-gray-700 focus:bg-gray-600 rounded-lg" title="refresh stream">
                    <i class="fa-regular fa-refresh"></i>
                </button>
            </div>
            <div class="text-white text-lg" v-if="showStream">
                <button @click.prevent="toggle" class="px-2 py-1 bg-red-500 hover:bg-red-400 focus:bg-red-400 rounded-lg" title="stop stream">
                    <i class="fa-solid fa-camera-slash"></i>
                    <!-- <i class="fa-solid fa-camera-slash"></i> -->
                </button>
            </div>
            <div class="text-white text-lg border-2 border-white rounded-lg" v-else >
                <button @click.prevent="toggle" class="px-2 py-0.5 bg-primary-400 hover:bg-primary-300 focus:bg-primary-300 rounded-lg" title="play stream">
                    <i class="fa-solid fa-play"></i>
                    <!-- <i class="fa-solid fa-camera-slash"></i> -->
                </button>
            </div>
        </div>
        <div class="w-full flex justify-center items-center">
            <div v-if="isLoading">
                <NSpinnerGrow class="w-12 h-12 bg-primary-400" />
            </div>
            <div v-else-if="error" class=" text-3xl py-4 text-gray-600 flex items-center justify-center flex-col">
                <div>

                </div>
                <i class="fa-solid fa-link-simple-slash fa-2x"></i>
                <span>{{  error }}</span>
            </div>
            <div class="relative" v-else>
                <div v-if="showStream">
                    <video  :srcObject="streamData" ref="video"  :autoplay="showStream"></video>
                    <canvas ref="canvas" class="hidden"></canvas>
                </div>

                <NCropImage
                ref="cropper"
                v-else
                class=" w-full"
                :src="cropImageSrc"
                :cropBoxResizable
                :aspectRatio
                :cropBoxWidth
                :cropBoxHeight
                @ready=""
                @preview=""
                @cropmove=""
                @cropstart=""
                @cropend="cropend"
                />
            </div>
            
        </div>
        <div class=" bg-secondary-400 h-[40px] rounded-b-lg  px-2">
            <div v-if="showStream" class="flex justify-center items-center h-full">
                <button class="bg-primary-400 hover:bg-gray-600 hover:text-white flex items-center p-2.5 rounded-full" @click.prevent="snapShot">
                    <i class="fa-regular fa-camera-web"></i>
                </button>
            </div>
            <div v-if="isPhotoTaken" class="flex flex-wrap justify-between items-center h-full">
                <div class="flex justify-between w-auto space-x-4">
                    <button title="back to cameras" class="bg-gray-400 hover:bg-primary-400 hover:text-white  flex items-center p-1 rounded-full" @click.prevent="cancel">
                        <i class="fa-solid fa-backward"></i>
                    </button>
                </div>
            
                <div class="flex justify-end space-x-6 px-3">

                    <div class="flex justify-center space-x-2 ">
                        <button  class="bg-gray-400 hover:bg-primary-400 hover:text-white  flex items-center p-1 rounded-full" @click.prevent.prevent="flipY">
                            <i class="fa-sharp fa-solid fa-reflect-vertical"></i>
                        </button>
                        <button  class="bg-gray-400 hover:bg-primary-400 hover:text-white  flex items-center p-1 rounded-full" @click.prevent.prevent="flipX">
                            <i class="fa-sharp fa-solid fa-reflect-horizontal"></i>
                        </button>
                    </div>
                    <div class="flex justify-center space-x-2">
                        <button  class="bg-gray-400 hover:bg-primary-400 hover:text-white  flex items-center p-1 rounded-full" @click.prevent="zoom(0.2)">
                            <i class="fa-regular fa-circle-plus"></i>
                        </button>

                        <button  class="bg-gray-400 hover:bg-primary-400 hover:text-white  flex items-center p-1 rounded-full" @click.prevent="zoom(-0.2)">
                            <i class="fa-regular fa-circle-minus "></i>
                        </button>
                    </div>

                    <div class="flex justify-center space-x-2">
                        <button  class="bg-gray-400 hover:bg-primary-400 hover:text-white  flex items-center p-1 rounded-full" @click.prevent="move(-10, 0)">
                            <i class="fa-duotone fa-solid fa-left-from-line"></i>
                        </button>

                        <button  class="bg-gray-400 hover:bg-primary-400 hover:text-white  flex items-center p-1 rounded-full" @click.prevent="move(10, 0)">
                            <i class="fa-duotone fa-solid fa-right-from-line"></i>
                        </button>

                        <button  class="bg-gray-400 hover:bg-primary-400 hover:text-white  flex items-center px-1.5  rounded-full" @click.prevent="move(0,-10)">
                            <i class="fa-duotone fa-solid fa-up-from-line"></i>
                        </button>

                        <button  class="bg-gray-400 hover:bg-primary-400 hover:text-white  flex items-center px-1.5 rounded-full" @click.prevent="move(0, 10)">
                            <i class="fa-duotone fa-solid fa-down-from-line"></i>
                        </button>
                    </div>
                    <div class="flex justify-center space-x-2">
                        <button class="bg-gray-400 hover:bg-primary-400 hover:text-white  flex items-center px-1 rounded-full" @click.prevent="reset">
                            <i class="fa-solid fa-arrow-rotate-left"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {ref, onMounted} from "vue"
import { NSelect, NSpinnerGrow } from '..';
import {CameraType, PropsType} from './index.d'
import VideoStream from './utils/stream.class'
import { VueCropper as NCropImage } from "@trandx/vue-cropper";
import { watchEffect } from "vue";

type VideoDataType = {
    name: string,
    value: string
}

export type EmitsType = {
  'crop': [elt?: any];
};

type ScaleType =  1 | -1

type VueCropperType = InstanceType<typeof NCropImage>

const props = defineProps<PropsType>()

const video = ref<HTMLVideoElement>()
const canvas = ref<HTMLCanvasElement>()
const streamData = ref()
const isLoading = ref(true)
const cropper = ref<VueCropperType>()
const showCropImage = ref(false)
const cropImageSrc = ref()

const emit = defineEmits<EmitsType>();

const Stream = new VideoStream()

const cameras = ref<CameraType[]>([])

const error = ref()

const isPhotoTaken = ref<boolean>(false);

const showStream = ref<boolean>(true)

const flipX = () => {
    const scale = -(cropper.value?.getAttribute('data-scale-x') || 1) as ScaleType;
    
    cropper.value?.scaleX(scale)

    cropper.value?.setAttribute('data-scale-x', scale.toString());
}

const flipY = () => {
    const scale = -(cropper.value?.getAttribute('data-scale-y') || 1) as ScaleType;

    cropper.value?.scaleY(scale)

    cropper.value?.setAttribute('data-scale-y', scale.toString());
}

const move = (x: number, y: number) => cropper.value?.move(x, y)

const zoom = (percent: number) => cropper.value?.zoom(percent)

const getImage = () => {

    if ( !video?.value || !canvas.value) {
        return null
    }

    const _canvas =  canvas.value;
    const vd = video.value;
    const ctx = _canvas?.getContext('2d');

    if (!ctx) {
        return null
    }
    // Set canvas dimensions to match the video element
    _canvas.width = vd.videoWidth;
    _canvas.height = vd.videoHeight;
    
    // Draw the current video frame to the canvas
    ctx?.drawImage(video?.value, 0, 0, _canvas?.width, _canvas?.height);

    // Optionally, you can get the image data as a base64 URL
    return _canvas?.toDataURL('image/png', 1.0);
}

const snapShot = ()=>{

    cropImageSrc.value =  getImage()

    //// don't move
    Stream.stopVideoStream()

    showCropImage.value = true
    showStream.value = false
    isPhotoTaken.value = true
}

const reset = () => cropper.value?.reset()

const cancel = ()=>{
    isLoading.value = true
    isPhotoTaken.value = false
    //////// don't change
    showStream.value = false
    toggle()
}

const toggle = () => {
    showStream.value = !showStream.value;
    if(!showStream.value){
        Stream.stopVideoStream()
        error.value = 'stream is turned down'
        //isLoading.value = false
    }else{
        isLoading.value = true
        Stream.startVideoStream().then(stream =>{
            streamData.value = stream
            isLoading.value =  false
            error.value = null
        }).catch(e => {
            error.value = e
        })
        //isLoading.value = false
    }
}

const cropend = (data: string) => {

 // emit data
 emit('crop', data)
 
//console.log('crop end!');
}

const changeCamera = (device: VideoDataType)=>{
    isLoading.value =  true
    error.value = null
    //Stream.stopVideoStream()
    //console.log(device);
    if(!device){
        error.value = 'no selected camera'
        isLoading.value =  false
        return
    }
    
    if(Stream.permission.is_granted){
        Stream.changeCamera(device.value)?.then(stream =>{
            
            streamData.value = stream
            showStream.value = true

            isLoading.value =  false
        }).catch((e) =>{
            error.value = e
            isLoading.value =  false
        })
    }else{
        refreshCamera()
    }
}

const refreshCamera = async () => {
    isLoading.value = true
    Stream.stopVideoStream()
    await Stream.getPermission().then(()=>{
        error.value = null
        getDefaultCamera()
    })
    .catch(e =>{
        error.value = e
        isLoading.value =  false
        cameras.value = []
        console.log(e)
    })
}

const getDefaultCamera = ()=>{
    Stream.getCameras().then((camerasDevices)=>{
        if(camerasDevices){
            cameras.value = camerasDevices?.map(videoDevice =>({
                name: videoDevice.label,
                value: videoDevice.deviceId
            }))

            if(showStream.value) {
                Stream.changeCamera(cameras.value[0].value)?.then(stream =>{
                    streamData.value = stream

                    isLoading.value =  false
                })
            }

        }
    })

}

watchEffect( async ()=>{
    await refreshCamera()
    if (!props.autoplay) {
        isLoading.value = false
        toggle()
    }
})

onMounted(()=>{
    Stream.onDiconnect( async (e)=>{
        isLoading.value =  false
        console.log("camera disconnected", e);
        await refreshCamera()
    })
})


</script>