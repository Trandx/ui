<template>
    <div :class="`${!rowAlign?'flex':''} space-y-2 `">
        <nav class="isolate shadow w-max">
            <ul :class="`${rowAlign?'flex flex-wrap':'block'} mx-auto gap-x-2`">
                <li 
                v-for="tabDatail in tabDetails" 
                :key="tabDatail.title"
                class=" cursor-pointer "
                :class="`${defaultClass || 'hover:bg-gray-500 px-4'} ${ (tabDatail.title == selectedTitle)  ? (activeClass || 'bg-primary-400 text-white font-bold border-b-4 border-secondary-400') : ''}`"
                @click="selectedTitle = tabDatail.title"
                >
                <div class="flex justify-center items-center text-center py-1 px-1 space-x-2" >
                    <i v-if="tabDatail.icon" :class="tabDatail.icon"></i>
                    <span>{{ tabDatail.title }}</span>
                </div>
                </li>
            </ul>
        </nav>
        <slot ></slot>
    </div>
</template>

<script lang="ts" setup>
import { ref, provide, useSlots, onMounted } from 'vue';
type PropsType = {
    activeClass?: string
    defaultClass?: string
    rowAlign?: boolean
}
defineProps<PropsType>()


const slots = useSlots()

const tabDetails = ref<any[]>()
const selectedTitle = ref()

const getSlotsdata = ()=>{
    let slot_data:any[] = []
    if(slots.default){
        slots.default().forEach(({props, children, type} ) =>{
            if(!props && type.toString().includes("Symbol(v-fgt)")){

                if(children instanceof Array){
                    const data = children.map((chlid: any)=> ({title: chlid?.props?.title, icon: chlid?.props?.icon}))
                    slot_data = [...slot_data, ...data] 
                    //console.log(children, slot_data);
                }
            }
            if(props ){
                const data =  {title: props?.title, icon: props?.icon}
                slot_data =  [...slot_data, data]
            }
        })

        tabDetails.value = slot_data
    }

    selectedTitle.value = tabDetails.value && tabDetails?.value[0].title
}

provide("selectedTitle", selectedTitle)

onMounted(()=>{
    getSlotsdata()
})

</script>