<template>
    <div class="space-y-2">
        <nav class="isolate shadow">
            <ul class="flex mx-auto max-w-full w-full justify-center rounded-lg">
                <li 
                v-for="tabDatail in tabDetails" 
                :key="tabDatail.title"
                class=" flex justify-center items-center cursor-pointer  hover:bg-gray-500 w-full "
                :class="`${ tabDatail.title == selectedTitle  && (activeClass || 'bg-primary-400 text-white font-bold border-b-4 border-secondary-400')}`"
                @click="selectedTitle = tabDatail.title"
                >
                <div class="h-full w-full text-center py-1 px-1 space-x-2" >
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