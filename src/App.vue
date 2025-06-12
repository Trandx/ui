<template>
  <div class="m-4 sup-sm:grid sup-sm:grid-auto-fit-[30%] sm:flex-wrap sm:h-screen items-center space-x-2 space-y-3">
    <div>
      <div>
        <teleport to="body">
          <NToast position="top-left" />
        </teleport>
      </div>
      <div>
          <NBtn
            class="bg-secondary-500 p-1 rounded-lg px-2 text-white"
            label="Show toast"
            @click="showToast"
          />
        </div>
      <div class="flex justify-between">
        
        <div>
          <NBtn class="" :isLoading="true" />
        </div>
        <div>
          <n-export-btn :data="dataSample" :file-details="{ ...file }" />
        </div>
        <div>
          <NDropDown title="test" :close-after-click="false">
          <template #btn>
            <button
              type="button"
              class="py-1 px-2 inline-flex items-center gap-x-1 text-sm font-medium rounded-sm border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-secondary-500 border-gray-700 text-white hover:bg-secondary-500 focus:outline-none focus:ring-1 focus:ring-gray-600"
            >
              <i class="fa-solid fa-bars"></i>
            </button>
          </template>
          <template #items>
            <div class="bg-white rounded-lg shadow w-60 dark:bg-gray-700">
              <div class="p-3">
                <label for="input-group-search" class="sr-only">Search</label>
                <div class="relative">
                  <div
                    class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
                  >
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="input-group-search"
                    class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search user"
                  />
                </div>
              </div>
              <ul
                class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownSearchButton"
              >
                <li>
                  <div
                    class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <input
                      id="checkbox-item-11"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="checkbox-item-11"
                      class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >Bonnie Green</label
                    >
                  </div>
                </li>
                <li>
                  <div
                    class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <input
                      checked
                      id="checkbox-item-12"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="checkbox-item-12"
                      class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >Jese Leos</label
                    >
                  </div>
                </li>
                <li>
                  <div
                    class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <input
                      id="checkbox-item-13"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="checkbox-item-13"
                      class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >Michael Gough</label
                    >
                  </div>
                </li>
                <li>
                  <div
                    class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <input
                      id="checkbox-item-14"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="checkbox-item-14"
                      class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >Robert Wall</label
                    >
                  </div>
                </li>
                <li>
                  <div
                    class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <input
                      id="checkbox-item-15"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="checkbox-item-15"
                      class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >Joseph Mcfall</label
                    >
                  </div>
                </li>
                <li>
                  <div
                    class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <input
                      id="checkbox-item-16"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="checkbox-item-16"
                      class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >Leslie Livingston</label
                    >
                  </div>
                </li>
                <li>
                  <div
                    class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <input
                      id="checkbox-item-17"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="checkbox-item-17"
                      class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >Roberta Casas</label
                    >
                  </div>
                </li>
              </ul>
              <a
                href="#"
                class="flex items-center p-3 text-sm font-medium text-red-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline"
              >
                <svg
                  class="w-4 h-4 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path
                    d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2Z"
                  />
                </svg>
                Delete user
              </a>
            </div>
          </template>
          </NDropDown>
        </div>
        <div>
          <NBtn
          @click="openModal = true"
          class="bg-secondary-500 p-1 rounded-lg px-2 text-white"
          label="Open modal"
          />
        </div>
        
      </div>
      <NModal class="!w-auto inset-0 z-10 !fixed" :open="openModal">
        <NModalBg class="inset-0 justify-center intems-center">
          <NModalContent
            id="modalContent"
            class="bg-white w-[500px] border-2 border-primary-500 rounded-lg"
          >
            <NModalHeader id="modalHeader" title="waiting list" @close="openModal = false">
            </NModalHeader>
            <NModalBody>
              <div class="h-[300px]">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum, doloribus. In
                maxime reiciendis quidem eum dolorum cumque reprehenderit totam rerum at adipisci,
                porro quisquam debitis! Omnis sed modi quia totam?
              </div>
            </NModalBody>
            <NModalFooter> </NModalFooter>
          </NModalContent>
        </NModalBg>
      </NModal>
    </div>
    <div>
      <NCamera :autoplay="false" />
    </div>
    <div class="space-y-2">
      <NCropImage :src="src" @preview="imageCropped" @cropend="" />
      <img width="100" :src="preview" alt="" />
    </div>
    <div>
      <NCardSummary
        class="border-2 border-b-primary-500 border-b-4 border-gray-200"
        :data="{ icon: 'fa fa-user', title: 'test', description: 'hello' }"
      />
    </div>
    <div>
      <NTabWrapper
        active-class="hover:hover:bg-gray-500 bg-primary-500 border-b-4 border-secondary-400"
        default-class=""
        :row-align="true"
      >
        <NTab title="Tab 2"> Hello from Tab 2</NTab>
        <NTab title="Tab 3"> Hello from Tab 3</NTab>
      </NTabWrapper>
    </div>
    <div class="">
      <n-pagination
        :current-page="8"
        :items-per-page="20"
        :total-items="200"
        :max-visible-pages="5"
      />
    </div>

    <div class="space-y-3">
      <NRadio unchecked-class="border-primary-500 bg-gray-500" label="input radio2" v-model="radioCheck" value="radio 2" disabled />
      <NRadio checked-class="border-primary-500 bg-primary-500" label="input radio" v-model="radioCheck" value="radio 1" />
      <NRadio unchecked-class="border-primary-500 bg-gray-500" label="input radio2" v-model="radioCheck" value="radio 2" />

      {{ radioCheck }}

      <hr>

      <NCheckbox
      v-for="(option) in checkedOptions"
      :key="option.id"
      :label="option.label"
      :value="option.value"
      v-model="checkedValues"
      unchecked-class=""
      checked-class=""
      />

      <NCheckbox
      key="option.id"
      label="option.label"
      value="option.value"
      v-model="checkedValues"
      disabled
      unchecked-class=""  />

      {{ checkedValues }}

    </div>

    <div class="space-y-3">
      <NOtpInput @input="defautOTP" v-model="otp" />

      <NInput placeholder="••••••••" type="password" label="Your password" :error="false" />

      <NInput
        type="text"
        :maxlength="6"
        :minlength="3"
        :max="500"
        placeholder="Hello"
        :required="true"
        label="text input"
        @error="(data: any) => (test = data)"
        v-model="inputVal"
        error-msg=""
      >
        <template #label> </template>
        <template
          #input="{
            type,
            pattern,
            required,
            min,
            max,
            minlength,
            maxlength,
            placeholder,
            error,
            input,
            blur,
            value,
            keyupEnter,
            focus,
          }"
        >
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
            :class="
              error
                ? `${'focus:ring-red-500 border-red-500 border focus:border-none invalid:border-red-500'}`
                : `${'valid:border-primary-500 focus:border-primary-500 focus:ring-primary-500  ring-primary-500 in-range:border-primary-500 '}`
            "
            class="hover:bg-gray-600 focus:bg-gray-700 bg-secondary-500 placeholder-gray-400 text-white block w-full py-1 pr-4 pl-2 h-full disabled:bg-gray-500 disabled:cursor-not-allowed border focus:ring-1 focus:outline-none rounded-lg placeholder:italic placeholder:font-light autofill:bg-gray-700 out-of-range:border-red-500"
          />
        </template>
        <template #star>
          <i class="fa-solid fa-star-of-life text-[10px] text-red-400"></i>
        </template>
        <template #errorMsg="{ message, defaultMsg }">
          <div class="text-red-500">
            {{ message || defaultMsg }}
          </div>
        </template>
      </NInput>

    </div>

    <div class="space-y-3">
      <NInputFile :multiple="true" accept=".xlx, .webp, .jpg, .png, .jpeg, .pdf, .zip, .rar" />

      <NSearch v-model="searchWord" :use-microphone="false" :isloading="true">
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

    <div class="space-y-3">

      <n-select
        @change=""
        :options="selectOptions"
        :optionFormat="optionFormat"
        placeholder="select element"
        :multiple-select="false"
        :autoclose="false"
        :searchable="true"
        :deletable-btn="true"
        :disabled="false"
        :has-error="true"
      />

      <NCountry
        :multiple-select="true"
        :deletable-btn="true"
        @change=""
        v-model="country"
        :disabled="false"
      />

      <NPhone
        :autoclose="true"
        :max="10"
        :min="2"
        pattern=""
        :has-error="true"
        @change=""
        v-model="phone"
        :disabled="false"
      />
    </div>

    <div class="space-y-2">
      <NList
        class="bg-secondary-500 divide-y-2 divide-gray-800 overflow-y-auto max-h-[150px] scrollbar-w-[5px] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-slate-700"
        :optionFormat="optionFormat"
        :options="selectOptions"
        :multipleSelect="false"
        :selectedOptions="[selectOptions[2]]"
        v-slot="{ item }"
        @change=""
      >
        <div class="py-0.5 px-4">
          {{ item.name.a }}
        </div>
      </NList>
      <!-- <NListSearch class="bg-secondary-500 divide-y-2 relative divide-gray-800 "
      
      :options="selectOptions"
      :multipleSelect="true"
      :optionFormat="optionFormat"
      :selectedOptions="[selectOptions[1]]"
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
              :selectedOptions="[selectOptions[3]]"
              @change=""
              />
        </template>
      </NListSearch> -->
    </div>

    <div class="flex flex-col items-center space-y-4">
      <NProgressBar :pourcentage="20" class="w-full" />

      <NSpinnerGrow class="w-12 h-12 animate-[show-up-clock_1s_infinite]" />

      <NLoaderDot dot-height="h-6" dot-width="w-6" />
    </div>

    <div class="col-span-2">
      <div>
        <div class="pb-4 bg-white">
          <label for="table-search" class="sr-only">Search</label>
          <div class="relative">
            <div
              class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
            >
              <i class="fa-solid fa-search text-white"></i>
            </div>
            <input
              type="text"
              id="table-search"
              class="ps-8 py-0.5 text-gray-200 border border-gray-300 rounded-lg w-80 bg-secondary-500 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Search for items"
            />
          </div>
        </div>
      </div>
      <div class="relative overflow-x-auto shadow-sm bg-gray-600 rounded-lg">
        <NTable :sortField="['FirstName']" sortable :header="tableData.header" :body="tableData.body" :selected-rows="tableData.selectedRows.value" @sort="" @select="handleSelect" has-checkbox>
          <NThead />
          <NTbody >
            <NTr :row has-checkbox :checked="tableData.selectedRows.value.includes(row.id)"
              v-for="(row, key) in tableData.body "
              :key
            >
            <td class="py-1 px-2" >{{ row.firstName }}</td>
            <td class="py-1 px-2" >{{ row.lastName }}</td>
            <td class="py-1 px-2" >{{ row.email }}</td>
            <td class="py-1 px-2" >
              <NBtn />
            </td>
            </NTr>
          </NTbody>
          <NTfoot :total-items="tableData.body.length" />
        </NTable>
      </div>
    </div>
    <NTooltip class="" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRef } from 'vue'
import {
  NRadio,
  NTooltip,
  NPagination,
  NSelect,
  NPhone,
  NCountry,
  NInput,
  NExportBtn,
  NSpinnerGrow,
  NList,
  NListSearch,
  NLoaderDot,
  NCardSummary,
  NTab,
  NTabWrapper,
  NCamera,
  NModal,
  NModalContent,
  NModalFooter,
  NModalBody,
  NModalHeader,
  NSearch,
  NInfiniteProgressBar,
  NDropDown,
  NTable,
  NBtn,
  NToast,
  NTeleport,
  NOtpInput,
  NModalBg,
  NInputFile,
  NProgressBar,
  NCheckbox,
  NThead,
  NTbody,
  NTr,
  NTfoot,
  useToast,
} from './components'
import { VueCropper as NCropImage } from '@package/vue-cropper'
import '@package/vue-cropper/style.css'
import { type FileDetailsType } from '.'
import { Draggable } from './libs'

const checkedValues = ref([]);

const { open } = useToast()

const showToast = () => {
  open({
    icon: 'fa-solid fa-user',
    autoclose: false,
    cssClass: 'text-red-500 bg-white',
    time: 10000,
    progressColor: '!bg-primary-600',
    message: ['test 1', 'test 2'],
    animation: {
      open: 'animate-[slide-in-up_0.7s]',
      close: 'animate-[slide-out-down_0.7s]'
    }
  })
}

setTimeout(() => {
  showToast()
  showToast()
}, 5000);

const checkedOptions = [
  { label: 'Option 1', value: 'option1', id: 'checkbox-1' },
  { label: 'Option 2', value: 'option2', id: 'checkbox-2' },
  { label: 'Option 3', value: 'option3', id: 'checkbox-3' },
];

const radioCheck = ref()
const otp = ref('tedtss')

const src = 'man-8293794_1280.webp' //"/beagle400.jpg";*/ "https://s3-us-west-2.amazonaws.com/s.cdpn.io/222579/beagle400.jpg"
const test = ref()
const phone = ref()
const country = ref()
const inputVal = ref()

const defautOTP = ref('')

const openModal = ref(false)

const searchWord = ref()

const option = {
  resize: true,
  resizeElt: '.resizer',
}

const tableData = {
  header: ['FirstName', 'LastName', 'email', 'Actions'],
  body: [
    {
      id: 'testdsdsd',
      firstName: 'Trandx',
      lastName: 'Code',
      email: 'Trandxcode@gmail.com',
    },
    {
      id: 'testdsds554',
      firstName: 'Trandx 2',
      lastName: 'Code',
      email: 'Trandxcode@gmail.com',
    },
  ],
  selectedRows: toRef<(string | number)[]>([ 'testdsds554'])
}

const handleSelect = (selectRows: (string | number)[]) => {
  
  tableData.selectedRows.value = selectRows
}

//const seletedTableData = []

onMounted(() => {
  Draggable.bind('#modalHeader', { dragContentEltId: '#modalContent' })
})

const preview = ref<string>()

const imageCropped = (data: string) => {
  preview.value = data
  //console.log(data);
}

const selectOptions = ref([
  {
    name: { a: 'test' },
    value: 'test',
  },
  {
    name: { a: 'test 1' },
    value: 'test 1',
  },
  {
    name: { a: 'testsdsds df 2 Trandx' },
    value: 'test 2',
  },
  {
    name: { a: 'test 3' },
    value: 'test 3',
  },
  {
    name: { a: 'test 4' },
    value: 'test 4',
  },
  {
    name: { a: 'test 5' },
    value: 'test 5',
  },
])
const dataSample = [
  {
    symbol:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem fuga modi asperiores officia eius quibusdam maxime vitae et incidunt corrupti commodi, dicta eaque eligendi odit recusandae. Quibusdam aliquam facere nostrum?',
    date: 'Aug 2004',
    price: 78.17,
  },
  {
    symbol: 'IBM',
    date: 'Sep 2004',
    price: 79.13,
  },
  {
    symbol: 'IBM',
    date: 'Oct 2004',
    price: 82.84,
  },
  {
    symbol: 'IBM',
    date: 'Nov 2004',
    price: 87.15,
  },
  {
    symbol: 'IBM',
    date: 'Dec 2004',
    price: 91.16,
  },
  {
    symbol: 'IBM',
    date: 'Jan 2005',
    price: 86.39,
  },
  {
    symbol: 'IBM',
    date: 'Feb 2005',
    price: 85.78,
  },
  {
    symbol: 'IBM',
    date: 'Mar 2005',
    price: 84.66,
  },
  {
    symbol: 'IBM',
    date: 'Apr 2005',
    price: 70.77,
  },
  {
    symbol: 'IBM',
    date: 'May 2005',
    price: 70.18,
  },
  {
    symbol: 'IBM',
    date: 'Jun 2005',
    price: 68.93,
  },
  {
    symbol: 'IBM',
    date: 'Jul 2005',
    price: 77.53,
  },
  {
    symbol: 'IBM',
    date: 'Aug 2005',
    price: 75.07,
  },
  {
    symbol: 'IBM',
    date: 'Sep 2005',
    price: 74.7,
  },
  {
    symbol: 'IBM',
    date: 'Oct 2005',
    price: 76.25,
  },
]

const file = ref<FileDetailsType>({ name: 'texts', type: 'csv' })
const optionFormat = ref({ name: 'name.a', value: 'value' })
setTimeout(() => {
  //optionFormat.value = { name: "names", value: "value" };
  //selectOptions.value.push({ name: "name", value: "value" });
  file.value = { name: 'textsutt', type: 'xlsx' }
}, 2000)
</script>
