<template>
  <nav class="bg-gray-50 dark:bg-gray-700">
    <div class="max-w-screen-xl px-4 py-3 mx-auto">
        <div class="flex items-center">
          <ul class="space-y-2 font-medium">
            <li v-for="(tab, key) in aside.items" :key="key">
              <router-link
                :to="{ name: tab.to ||tab.name }"
                @click="aside.current_item = tab.name"
                :class="`${
                  aside.current_item === tab.name && aside.active_class.for_item
                } 
                ${aside.items_class}`"
              >
                <span class="text-primary">
                  <i
                    :class="`${tab?.icon?.name} 
                    ${tab?.icon?.class} 
                    ${aside.current_item === tab.name && aside.active_class.for_icon}`"
                  ></i>
                </span>

                <span class="ml-3"> {{ tab.name }}</span>
              </router-link>
            </li>
          </ul>
        </div>
    </div>
</nav>
  
</template>
<script setup lang="ts">
import { Navigation, NavigationType } from "./";

const props = defineProps<{
  datas: NavigationType;
}>();
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
const aside: NavigationType = Navigation(props.datas);
</script>
