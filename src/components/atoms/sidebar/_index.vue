<template>
  <ul class="space-y-2 font-medium">
    <li v-for="(tab, key) in datas.items" :key="key">
      <router-link
        :to="{ name:  tab.name }"
        @click="datas.current_item = tab.name.toLowerCase()"
        :class="`${
          datas.current_item == tab.name.toLowerCase() && datas.active_class.for_item
        } 
        ${datas.items_class}`"
      >
        <span class="text-primary">
          <i
            :class="`${tab?.icon?.name} 
            ${tab?.icon?.class || null} 
            ${datas.current_item === tab.name.toLowerCase() && datas.active_class.for_icon}`"
          ></i>
        </span>

        <span :class=" `ml-3 ${!props.datas.open && 'hidden'}`"> {{ tab.name }}</span>
      </router-link>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { NavigationType } from "./";
import { onMounted, reactive, watch } from "vue";

const props = defineProps<{
  datas: NavigationType;
}>();

const {datas} = reactive({...props}) 

const router = useRouter();

const patchmacth = ()=> {

  const matchedPatch = router.currentRoute.value

  return matchedPatch.matched.some((matchedRoute)=>{
    const result =  datas.items.find((item)=>item.name.toLowerCase() === matchedRoute.name?.toString().toLowerCase())

    //console.log("test ",result);
    
    if(result){
      datas.current_item = result.name.toLowerCase()
    }

  })
  
}

const defaultPath = ()=>{
  datas.current_item = (!datas.current_item)?datas.items[0].name?.toString().toLowerCase():""
}

watch(
    () => router.currentRoute.value.path,
    async () => {
      patchmacth();
    }
  );
onMounted(() => {
  defaultPath()
  patchmacth()
});

// const menus: NavigationType = {
//   current_item: "",
//   items: [
//     {
//       name: "Profile",
//       icon: {
//         name: "fa-solid fa-user",
//       },
//     },
//     {
//       name: "Session",
//       icon: {
//         name: "fa-solid fa-layer-group",
//       },
//     },
//   ],
//   items_class: "",
//   active_class: {
//     for_item: "bg-primary",
//     for_icon: "fa-beat text-gray-900",
//   },
// };

//const aside: NavigationType = Navigation(props.datas);
</script>
