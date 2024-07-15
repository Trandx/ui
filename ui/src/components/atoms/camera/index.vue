<template>
    <div class="border-2 border-primary-400 rounded-lg  grid grid-cols-1 content-between">
        <div class="bg-primary-400 h-full flex justify-between items-center py-0.5 space-x-2 px-1">
            <div class="text-white text-lg flex items-center bg-primary-400 ">
                <i class="fa-regular fa-camera-web"></i>
            </div>
            <NSelect 
            class="w-full ring-1 ring-white rounded-lg"
            v-model="test"
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
                <button @click="refreshCamera" class="px-2 py-1 bg-secondary-400 hover:bg-gray-700 focus:bg-gray-600 rounded-lg" title="refresh stream">
                    <i class="fa-regular fa-refresh"></i>
                </button>
            </div>
            <div class="text-white text-lg" v-if="showStream">
                <button @click="toggle" class="px-2 py-1 bg-red-500 hover:bg-red-400 focus:bg-red-400 rounded-lg" title="stop stream">
                    <i class="fa-solid fa-camera-slash"></i>
                    <!-- <i class="fa-solid fa-camera-slash"></i> -->
                </button>
            </div>
            <div class="text-white text-lg border-2 border-white rounded-lg" v-else >
                <button @click="toggle" class="px-2 py-0.5 bg-primary-400 hover:bg-primary-300 focus:bg-primary-300 rounded-lg" title="stop stream">
                    <i class="fa-solid fa-play"></i>
                    <!-- <i class="fa-solid fa-camera-slash"></i> -->
                </button>
            </div>
        </div>
        <div class="w-full flex justify-center items-center">
            <div v-if="isLoading">
                <NSpinnerGrow class="w-12 h-12 bg-primary-400" />
            </div>
            <div v-else-if="error">
                {{  error }}
            </div>
            <div class="relative" v-else>
                <video v-if="!isPhotoTaken" :srcObject="streamData" ref="video"  autoplay></video>

                <canvas v-show="true" ref="canvas" class="w-full h-[326px]" ></canvas>

                <NCropImage v-if="isPhotoTaken" class="h-[405px!important] w-full" ref="cropImage" :src="cropImageSrc" type="circle" :crop-size="{height: 256, width: 256}" @crop="imageCropped"/>
            </div>
            
        </div>
        <div class=" bg-secondary-400 h-[30px] rounded-b-lg flex flex-wrap justify-between py-0.5">
           
            <div class="flex justify-center w-1/2">
                <button class="bg-primary-400 hover:bg-gray-600 hover:text-white flex items-center px-1.5 rounded-full" @click="snapShot">
                    <i class="fa-regular fa-camera-web"></i>
                </button>
            </div>
           
            <div class="flex justify-end space-x-6 px-3 w-1/2">
                <div class="flex  justify-center">
                    <button class="bg-gray-400 hover:bg-primary-400 hover:text-white  flex items-center px-1.5 rounded-full" @click="cancel">
                        <i class="fa-solid fa-arrow-rotate-left"></i>
                    </button>
                </div>
                <div class="flex justify-center space-x-2">
                    <button  class="bg-gray-400 hover:bg-primary-400 hover:text-white  flex items-center px-1.5 rounded-full" @click="verticalFlip">
                        <i class="fa-sharp fa-solid fa-reflect-vertical"></i>
                    </button>
                    <button  class="bg-gray-400 hover:bg-primary-400 hover:text-white  flex items-center px-1.5 rounded-full" @click="horizontalFlip">
                        <i class="fa-sharp fa-solid fa-reflect-horizontal"></i>
                    </button>
                </div>
                <div class="flex justify-center space-x-2">
                    <button  class="bg-gray-400 hover:bg-primary-400 hover:text-white  flex items-center px-1.5 rounded-full" @click="zoomIn">
                        <i class="fa-regular fa-circle-plus"></i>
                    </button>

                    <button  class="bg-gray-400 hover:bg-primary-400 hover:text-white  flex items-center px-1.5 rounded-full" @click="zoomOut">
                        <i class="fa-regular fa-circle-minus "></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {ref, onBeforeMount, onMounted, watch} from "vue"
import { NSelect, NSpinnerGrow } from '..';
import {CameraType, PropsType} from './index.d'
import VideoStream from './utils/stream.class'
import { NCropImage } from "@/components";
import { ICropImage } from "@/components/molecules/crop-image";

type VideoDataType = {
    name: string,
    value: string
}

const props = defineProps<PropsType>()

const test = ref()
const video = ref<HTMLVideoElement>()
const isPhotoTaken = ref(false)
const streamData = ref()
const isLoading = ref(true)
const canvas = ref<HTMLCanvasElement>()
const cropImage = ref<HTMLImageElement>()
const showCropImage = ref(false)
const cropImageSrc = ref("")

const Stream = new VideoStream()

const cameras = ref<CameraType[]>([])

const error = ref()

const showStream = ref<boolean>(true)

const verticalFlip = () =>{
    const ctx = canvas.value?.getContext("2d")
    if(canvas.value){
        //ctx?.drawImage(video.value, 0, 0,canvas.value.width,  canvas.value.height);
        flipImage({ctx, image: canvas.value, vertical: -1})
        cropImageSrc.value = canvas.value?.toDataURL("image/png", 1.0);
    }
    
}
const horizontalFlip = () =>{
    const ctx = canvas.value?.getContext("2d")
    if(canvas.value){
        //ctx?.drawImage(video.value, 0, 0,canvas.value.width,  canvas.value.height);
        flipImage({ctx, image: canvas.value, horizontal: -1})
        cropImageSrc.value = canvas.value?.toDataURL("image/png", 1.0);
    }
}


const zoomIn = () =>{
    // const ctx = canvas.value?.getContext("2d")
    // if(canvas.value){
    //     //const scale /= 0.8
    //     flipImage({ctx, image: canvas.value, horizontal: -1})
    //     cropImageSrc.value = canvas.value?.toDataURL("image/png", 1.0);
    // }
}
const zoomOut = () =>{
    //const scale *= 0.8
}



type FlipImageType = {
    ctx?: CanvasRenderingContext2D | null
    image: CanvasImageSource
    vertical?: -1|1
    horizontal?: -1|1
    translation?:{
        x: number,
        y: number
    }
}
const flipImage = ({ctx, image, vertical, horizontal, translation}:FlipImageType)=>{

    if(ctx && canvas.value){
        const _canvas = {
            height: canvas.value.height,
            width: canvas.value.width
        }

        if(!translation){
            translation = {
                x:  0,
                y: 0
            }
        }
        
        const posX = (!horizontal || horizontal==1) ? 0: _canvas.width * horizontal ; // Set x position to -100% if flip horizontal 
        const posY = (!vertical || vertical==1) ? 0: _canvas.height * vertical ; // Set y position to -100% if flip vertical

        ctx.save(); // Save the current state
        ctx.scale(horizontal||1, vertical||1); // Set scale to flip the image
        ctx.translate(translation.x, translation.y)
        ctx.drawImage(image, posX, posY, _canvas.width, _canvas.height); // draw the image
        ctx.restore(); // Restore the last saved state
        //console.log(_canvas, posX, posY, vertical, horizontal);
    }
    
}

const snapShot = ()=>{
    if(video.value &&  canvas.value){

        // const startX = (video.value.videoWidth - canvas.value.width)/2 ;
        // const startY = (video.value.videoHeight - canvas.value.height)/2;
        // console.log(startX, startY);
        
        const ctx = canvas.value?.getContext("2d")
        //ctx?.drawImage(video.value, 0, 0,canvas.value.width,  canvas.value.height);
        flipImage({ctx, image: video.value, vertical: 1, horizontal: 1})
        cropImageSrc.value = canvas.value?.toDataURL("image/png", 1.0);

        showCropImage.value = true
        isPhotoTaken.value = true
        console.log( cropImage.value?.src);
    }
    
}

const cancel = ()=>{
    isPhotoTaken.value = false
}

const toggle = () => {
    showStream.value = !showStream.value;
    if(!showStream.value){
        Stream.stopVideoStream()
        error.value = 'stream is turned down'
        //isLoading.value = false
        
    }else{
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

const imageCropped = (data: ICropImage)=>{
  console.log(data.getImageCropped());
  
}

const changeCamera = (device: VideoDataType)=>{
    isLoading.value =  true
    error.value = null
    //Stream.stopVideoStream()
    console.log(device);
    if(!device){
        error.value = 'no selected camera'
        isLoading.value =  false
        return
    }
    
    if(Stream.permission.is_granted){
        Stream.changeCamera(device.value)?.then(stream =>{
            streamData.value = stream

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

    // Stream.startVideoStream(deviceContriants).then((stream)=>{
    //     streamData.value = stream
    // })
}

watch(props, ({autoplay})=>{
    showStream.value = autoplay;
})

onMounted(()=>{
    Stream.onDiconnect( async (e)=>{
        isLoading.value =  false
        console.log("camera disconnected", e);
        await refreshCamera()
    })
})

onBeforeMount(async()=>{
  //const streamPermission = (await Stream.getPermission())

  await refreshCamera()
})

</script>