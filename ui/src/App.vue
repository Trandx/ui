<template>
  <div class="m-4 grid sup-sm:grid-cols-3  h-screen items-center space-x-2 space-y-3">
    <div>
      <div>
        <NTeleport to="toastTeleport">
          <NToast v-model="toastOpen" :autoclose="toastAutoclose" :time="toastTime" :animation="{ open: slideInDown}"  />
        </NTeleport>
        {{ toastOpen}}
      </div>
      <div>
        <button @click="openModal = true" class="bg-secondary-400 p-1 rounded-lg px-2 text-white">Open modal</button>
      </div>
      <NModal class=" !w-auto inset-0 z-10 !fixed " :open="openModal" >
        <NModalBg class=" inset-0 justify-center intems-center">
            <NModalContent id="modalContent" class=" bg-white w-[500px]  border-2 border-primary-400 rounded-lg">
                <NModalHeader id="modalHeader" title="waiting list" @close="openModal = false" >

                </NModalHeader>
                <NModalBody >
                  <div class="h-[300px]">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum, doloribus. In maxime reiciendis quidem eum dolorum cumque reprehenderit totam rerum at adipisci, porro quisquam debitis! Omnis sed modi quia totam?
                  </div>
                    
                </NModalBody>
                <NModalFooter>

                </NModalFooter>
            </NModalContent>
        </NModalBg>
      </NModal>
    </div>
    <div>
      <NCamera />
    </div>
    <div>
      <NCardSummary class=" border-2 border-b-primary-400 border-b-4 border-gray-200" :data="{icon:'fa fa-user', title: 'test', description:'hello'}" />
    </div>
    <div>
      <NTabWrapper active-class="hover:hover:bg-gray-500 bg-primary-400 border-b-4 border-secondary-400" default-class="" :row-align="true" >
        <NTab title="Tab 2"> Hello from Tab 2</NTab>
        <NTab title="Tab 3"> Hello from Tab 3</NTab>
      </NTabWrapper>
    </div>
    <div class="">
      <n-pagination
        :current-page="40"
        :items-per-page="20"
        :total-items="200"
        :page-number-limit="4"
      />
    </div>

    <div class=" space-y-3">
      <NBtn class="!py-1" :isLoading="true" />
      <NOtpInput @input="defautOTP" value="tedts" />
      <NInputFile :multiple="true"  accept=".xlx, .webp, .jpg, .png, .jpeg, .pdf, .zip, .rar" />
      <NInput placeholder="••••••••" type="password" label="Your password" :error="true" />
      <NInput type="text" :maxlength="6" :minlength="3" :max="500" placeholder="Hello" :required="true" label="text input" @error="(data) =>test=data" v-model="inputVal" error-msg=""  >
       <template #label>

       </template>
        <template #input="{type, pattern, required, min, max, minlength, maxlength, placeholder, error, input, blur, value, keyupEnter, focus}">
         <input 
            :type="type"
            :pattern="pattern"
            :required="required || false"
            :min="min"
            :max="max"
            :maxlength="maxlength"
            :minlength="minlength"
            :placeholder="placeholder"
            :value="value"
            @input="input"
            @blur="blur"
            @keyup.enter="keyupEnter"
            @focus="focus"

            :class="error?`${'focus:ring-red-500 border-red-500 border focus:border-none invalid:border-red-500'}`: `${'valid:border-primary-400 focus:border-primary-400 focus:ring-primary-400  ring-primary-400 in-range:border-primary-400 '}`"
            class=" bg-secondary-400 placeholder-gray-400 text-white
            block w-full py-[6px] pr-4 pl-2 h-full disabled:bg-gray-500 disabled:cursor-not-allowed border focus:ring-1 focus:outline-none rounded-lg placeholder:italic placeholder:font-light autofill:bg-gray-700 out-of-range:border-red-500 " />
        </template>
        <template #star>
          <i class="fa-solid fa-star-of-life text-[10px] text-red-400"></i>
          
         </template>
        <template #errorMsg="{message, defaultMsg}">
          <div class="text-red-500">
              {{ message || defaultMsg }}
          </div>
        </template>
      </NInput>
      {{ inputVal }}
    </div>

    <div>
      <NList
      class="bg-secondary-400 divide-y-2  divide-gray-800 overflow-y-auto max-h-[150px] scrollbar-w-[5px] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-primary-400 scrollbar-track-slate-700"
        :optionFormat="optionFormat" 
        :options="selectOptions"
        :multipleSelect="true"
        :selectedOptions="[selectOptions[2]]"
        v-slot="{item}"
        @change=""
      >
      <div class=" py-0.5 px-4" >
          {{ item.name.a }}
        </div>
      </NList>
    </div>

    <div>
      <NListSearch class="bg-secondary-400 divide-y-2 relative divide-gray-800 "
      
      :options="selectOptions"
      :multipleSelect="true"
      :optionFormat="optionFormat"
      :selectedOptions="[{name: {a: 'test 2'}, value: 'test 2'}]"
      @change=""
      >
      <template #search="{isloading, change, placeholder}">
        <NSearch :isloading="isloading" :placeholder="placeholder" @change="change" />
      </template>
       <template #list="{optionFormat, options}" >
        <NList class=""
            :optionFormat="optionFormat" 
            :options="options"
            :multipleSelect="true"
            :selectedOptions="[{name: {a: 'test 2'}, value: 'test 2'}]"
            @change=""
             />
       </template>
      </NListSearch>
    </div>

    <div class=" space-y-4">
      <n-select
        v-model="test"
        :options="selectOptions"
        :optionFormat="optionFormat"
        placeholder="select element"
        :multiple-select="true"
        :autoclose="false"
        :searchable="true"
        :deletable-btn="true"
      />

      <NCountry :multiple-select="true" :deletable-btn="true" v-model="test" />

      <NPhone 
        :autoclose="true" 
        :max="10" 
        :min="2" 
        pattern="" 
        :has-error="false"
        v-model="test" 
      />
    </div>

    <div class="flex flex-col items-center space-y-4">
      <NProgressBar :pourcentage="20" class="w-full" />

      <NSpinnerGrow class="w-12 h-12 animate-[show-up-clock_1s_infinite]" />

      <NLoaderDot dot-height="h-6" dot-width="w-6" />
    </div>

    <div>
      <NSearch v-model="searchWord" :use-microphone="false" :isloading="true" >
        <template #default>
          {{ searchWord }}
        </template>

        <template #loader>
          <div class="text-center text-white">
            loading...
            <NInfiniteProgressBar />
          </div>
        </template>
      </NSearch>
    </div>

    <div>
      <NDropDown title="test" :close-after-click="false" >
        <template #btn>
          <button  type="button" class=" py-1 px-2 inline-flex items-center gap-x-1 text-sm font-medium rounded-sm border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-secondary-400 border-gray-700 text-white hover:bg-secondary-400 focus:outline-none focus:ring-1 focus:ring-gray-600">
              
              <i class="fa-solid fa-bars"></i>
          </button>
        </template>
        <template #items>
          <div class=" bg-white rounded-lg shadow w-60 dark:bg-gray-700">
            <div class="p-3">
              <label for="input-group-search" class="sr-only">Search</label>
              <div class="relative">
                <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
                <input type="text" id="input-group-search" class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search user">
              </div>
            </div>
            <ul class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
              <li>
                <div class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input id="checkbox-item-11" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                  <label for="checkbox-item-11" class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Bonnie Green</label>
                </div>
              </li>
              <li>
                <div class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input checked id="checkbox-item-12" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="checkbox-item-12" class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Jese Leos</label>
                  </div>
              </li>
              <li>
                <div class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input id="checkbox-item-13" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                  <label for="checkbox-item-13" class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Michael Gough</label>
                </div>
              </li>
              <li>
                <div class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input id="checkbox-item-14" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                  <label for="checkbox-item-14" class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Robert Wall</label>
                </div>
              </li>
              <li>
                <div class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input id="checkbox-item-15" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                  <label for="checkbox-item-15" class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Joseph Mcfall</label>
                </div>
              </li>
              <li>
                <div class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input id="checkbox-item-16" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                  <label for="checkbox-item-16" class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Leslie Livingston</label>
                </div>
              </li>
                    <li>
                <div class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input id="checkbox-item-17" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                  <label for="checkbox-item-17" class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Roberta Casas</label>
                </div>
              </li>
            </ul>
            <a href="#" class="flex items-center p-3 text-sm font-medium text-red-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline">
              <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2Z"/>
              </svg>
              Delete user
          </a>
        </div>
        </template>
      </NDropDown>
    </div>

    <div class=" px-2 ">
      <n-export-btn :data="dataSample" :file-details="{ ...file }" />
    </div>

    <div>
      <NCropImage :src="src" type="circle" :crop-size="{height: 256, width: 256}" @crop="imageCropped"/>
    </div>

    <div class="col-span-2 ">
      <div>
        <div class="pb-4 bg-white ">
            <label for="table-search" class="sr-only">Search</label>
            <div class="relative ">
                <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <i class="fa-solid fa-search text-white "></i>
                </div>
                <input type="text" id="table-search" class="ps-8 py-0.5 text-gray-200 border border-gray-300 rounded-lg w-80 bg-secondary-400 focus:ring-primary-400 focus:border-primary-400 " placeholder="Search for items">
            </div>
        </div>
      </div>
      <div class="relative overflow-x-auto shadow-sm bg-gray-600 rounded-lg">
        <NTable :header="tableData.header" :body="tableData.body" @sort="" @check="" has-checkbox>
          <!-- <template #tfooter>
            <td :colspan="tableData.header.length+1">
              <div class="flex justify-end space-x-4 py-2 px-2 w-full">
                <NSelect
                class="w-[5.5rem]"
                :options="selectOptions"
                :optionFormat="optionFormat"
                :selected-options="selectOptions[0]"
                placeholder="select element"
                :multiple-select="false"
                :autoclose="false"
                :searchable="false"
                :deletable-btn="false"
                @change=""
                />
                <NPagination
                :current-page="40"
                :items-per-page="20"
                :total-items="200"
                :page-number-limit="4"
                />
              </div>
            </td>
          </template> -->
        </NTable>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { NPagination, NSelect, NPhone, NCountry, NInput, NExportBtn, NSpinnerGrow, NList, NListSearch, NCardSummary, NTab, NTabWrapper, NCamera, NCropImage, NModal, NModalContent, NModalFooter, NModalBody, NModalHeader, NSearch, NInfiniteProgressBar, NDropDown, ICropImage, NTable, NBtn, NToast, NTeleport, NOtpInput, NModalBg, NInputFile, NProgressBar } from "./components";
import { FileDetailsType, NLoaderDot, slideInDown } from ".";
import { Draggable } from "./libs";

const toastAutoclose = ref(false)
const toastTime = ref(6000)
const toastOpen = ref(false)
setTimeout(() => {
  toastAutoclose.value = true;
  toastTime.value = 5000;
  toastOpen.value = true
  console.log(toastOpen.value);
}, 10000);

const src = /*"man-8293794_1280.webp" //"/beagle400.jpg";*/ "https://s3-us-west-2.amazonaws.com/s.cdpn.io/222579/beagle400.jpg"
const test =ref()
const inputVal =ref()

const defautOTP = ref('')

const openModal = ref(false)

const searchWord = ref()

const option = {
  resize: true,
  resizeElt: ".resizer"
}

//const checkAllRows = ref()

const tableData = {
  header: ["FirstName", "LastName", "email"],
  body: [
    {
      firstName: "Trandx",
      lastName: "Code",
      email: "Trandxcode@gmail.com"
    },
    {
      firstName: "Trandx 2",
      lastName: "Code",
      email: "Trandxcode@gmail.com"
    },
  ]
}

//const seletedTableData = []





onMounted(()=>{
  Draggable.bind("#modalHeader", {  dragContentEltId: "#modalContent" })
})

const imageCropped = (data: ICropImage)=>{
  console.log(data.getImageCropped());
  
}


const selectOptions = ref([
  {
    name: {a: "test"},
    value: "test",
  },
  {
    name:{a: "test 1"},
    value: "test 1",
  },
  {
    name: {a: "testsdsds df 2"},
    value: "test 2",
  },
  {
    name: {a: "test 3"},
    value: "test 3",
  },
  {
    name: {a: "test 4"},
    value: "test 4",
  },
  {
    name: {a: "test 5"},
    value: "test 5",
  },
]);
const dataSample = [
  {
    symbol:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem fuga modi asperiores officia eius quibusdam maxime vitae et incidunt corrupti commodi, dicta eaque eligendi odit recusandae. Quibusdam aliquam facere nostrum?",
    date: "Aug 2004",
    price: 78.17,
  },
  {
    symbol: "IBM",
    date: "Sep 2004",
    price: 79.13,
  },
  {
    symbol: "IBM",
    date: "Oct 2004",
    price: 82.84,
  },
  {
    symbol: "IBM",
    date: "Nov 2004",
    price: 87.15,
  },
  {
    symbol: "IBM",
    date: "Dec 2004",
    price: 91.16,
  },
  {
    symbol: "IBM",
    date: "Jan 2005",
    price: 86.39,
  },
  {
    symbol: "IBM",
    date: "Feb 2005",
    price: 85.78,
  },
  {
    symbol: "IBM",
    date: "Mar 2005",
    price: 84.66,
  },
  {
    symbol: "IBM",
    date: "Apr 2005",
    price: 70.77,
  },
  {
    symbol: "IBM",
    date: "May 2005",
    price: 70.18,
  },
  {
    symbol: "IBM",
    date: "Jun 2005",
    price: 68.93,
  },
  {
    symbol: "IBM",
    date: "Jul 2005",
    price: 77.53,
  },
  {
    symbol: "IBM",
    date: "Aug 2005",
    price: 75.07,
  },
  {
    symbol: "IBM",
    date: "Sep 2005",
    price: 74.7,
  },
  {
    symbol: "IBM",
    date: "Oct 2005",
    price: 76.25,
  },
];

const file = ref<FileDetailsType>({ name: "texts", type: "csv" });
const optionFormat = ref({ name: "name.a", value: "value" });
setTimeout(() => {
  //optionFormat.value = { name: "names", value: "value" };
  //selectOptions.value.push({ name: "name", value: "value" });
  file.value = { name: "textsutt", type: "xlsx" };
}, 2000);
</script>