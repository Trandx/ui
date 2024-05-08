<template>
    <ul class="space-y-2 font-medium">
         <li v-for="(tab, key) in  items" :key="key">
            <router-link
            :to="{ name:  tab.name }"
            custom
            v-slot="{isExactActive, href, navigate}"
            >
            <!-- v-slot="{isActive, isExactActive, href, navigate}" -->
            
                    <a :href="href" @click="navigate" :class="`${
                        (isExactActive) &&  active_class.for_item
                        } ${ items_class}`">
                        <span class="text-primary">
                            <i
                            :class="`${tab?.icon?.name} 
                            ${tab?.icon?.class || null} 
                            ${(isExactActive) &&  active_class.for_icon}`"
                            ></i>
                        </span>
                        <span :class=" `ml-3 ${!props. open && 'hidden'}`"> {{ tab.name }}</span>
                    </a>
                
            </router-link>
        </li>
    </ul>
  </template>
  <script setup lang="ts">
  import { NavigationType } from "./";
  
  const props = defineProps<NavigationType>();

  </script>
  