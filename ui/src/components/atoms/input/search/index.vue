<template>
    <div class=" bg-secondary-400 pt-1 px-1 rounded-lg ">
        <div class="relative flex justify-between focus:border-2 focus:border-primary-400 ">
            <div class="absolute top-0 left-0 h-full" v-if="useMicrophone" >
				<slot name="microphoneBtn" :toggleMic="ToggleMic">
					<button class="bg-primary-400 px-2 h-full text-white" title="run microphone" @click="ToggleMic">
						<i class="fa-solid fa-microphone"></i>
					</button>
				</slot>
                
            </div>
            <div class="w-full ">
				<slot name="inputSearch" :value="searchWord" :placeholder="placeholder" @input="handleChange" :useMicrophone = "useMicrophone">
					<input 
					type="search"
					:value="searchWord"
					:placeholder="placeholder || 'Search'"
					@input="handleChange"
					class="block w-full py-0 z-20 text-gray-900 bg-gray-50 border ring-primary-400 focus:outline-none placeholder:italic rounded-lg border-primary-400 focus:ring-1 focus:ring-primary-400"
					:class="useMicrophone?'px-8':'pl-1 pr-8'"
					/>
				</slot>
            </div>
            <div  class="absolute top-0 right-0 h-full">
				<slot name="searchBtn">
					<button class="bg-primary-400 px-2 rounded-r-lg h-full text-white">
						<i class="fa-solid fa-search"></i>
					</button>
				</slot>
                
            </div>
        </div>
        
        <div v-if="!isloading">
			<slot >
				<NList :options="[]" />
			</slot>
        </div>
		<div class="py-2" v-else>
			<slot name="loader" >
				<NInfiniteProgressBar />
				<!-- <div class="flex justify-around items-center">
					<div class="w-[80%] h-4 animate-pulse bg-gray-500">

					</div>
					<div class=" h-4 w-[10%] animate-pulse bg-gray-500">
					</div>
				</div> -->
			</slot>
        </div>

    </div>
</template>
<style></style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {IPropsSearch, IEmitsSearch} from "./index.d"
import { NList } from '..';
import { NInfiniteProgressBar } from '../..';

const props = defineProps<IPropsSearch>()
const emit = defineEmits<IEmitsSearch>()
const searchWord = defineModel()
const isRecording = ref(false)

const handleChange = (e: any) => {

	searchWord.value = e.target.value
	
	emit("change", searchWord.value)
}


const Recognition = (<any>window).SpeechRecognition ||
	(<any>window).webkitSpeechRecognition
					
//// the microphone feature will be updated
const sr = (props.useMicrophone && Recognition) && new Recognition()

onMounted(() => {

	if (sr) {
		
		sr.continuous = true
		sr.interimResults = true

		sr.onstart = () => {
			console.log('SR Started')
			isRecording.value = true
		}

		sr.onend = () => {
			console.log('SR Stopped')
			isRecording.value = false
		}

		sr.onerror = (err: any) => console.log(err);

		sr.onresult = (evt: any) => {
			for (let i = 0; i < evt.results.length; i++) {
				const result = evt.results[i] as any

				if (result.isFinal) CheckForCommand(result)
			}

			const t = Array.from(evt.results)
				.map((result: any) => result[0])
				.map(result => result.transcript)
				.join('')
			searchWord.value = t
		}
	}
	
})

const CheckForCommand = (result: any) => {
	const t = result[0].transcript;
	if (t.includes('stop recording')) {
		sr.stop()
	} else if (
		t.includes('what is the time') ||
		t.includes('what\'s the time')
	) {
		sr.stop()
		alert(new Date().toLocaleTimeString())
		setTimeout(() => sr.start(), 100)
	}
}

const ToggleMic = () => {
	if(!sr) throw "source doesn't exist on this broswer"
	if (isRecording.value) {
		sr.stop()
	} else {
		sr.start()
	}
}
</script>