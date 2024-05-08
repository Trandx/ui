<template>
  <div class="relative flex flex-col justify-center items-center "
    :class="putItemsListToTop ? 'flex-col-reverse' : 'flex-col'"
    v-click-outside="closeToggle">
    <div class="flex justify-center items-center font-medium bg-gray-800 "
    :class="[
        !open
            ? 'rounded-lg'
            : putItemsListToTop
            ? 'rounded-b-lg'
            : 'rounded-t-lg',
        hasError && 'border-4 border-red-500',
        ]"
    ref="selectElement">
      <div class="max-w-[120px] w-auto flex py-1 h-full justify-center items-center cursor-pointer bg-primary-400 hover:bg-gray-600 px-2 rounded-l-md"
          
        @click="showOrHideSelectItemsList"
        @blur="closeToggle">
            <slot
            name="optionSelected"
            :selectedItems="selectedItems"
            >
                <div class="w-[70%] min-w-[10px]">
                  <div
                    class=" text-white flex justify-start w-auto max-w-[100%] space-x-0.5 "
                  >
                    <span>
                      {{ selectedItems.value?.flag }}
                    </span>
                    <span>
                      {{ selectedItems.value?.dial_code}}
                    </span>
                  </div>
                </div>
                <div class="w-[30%] pl-1">
                    <span class=" text-white flex justify-center items-center">
                        <i :class="` ${open && 'rotate-180'} fa-solid fa-chevron-down transition ease-in-out`"></i>
                    </span>
                </div>
            </slot>
        </div>
        
        <div class=" w-full ">
            <input type="text" @click="open = false" @input="getPhoneNumberInGoodFormat" v-model="phoneNumber" :maxlength="max" :minlength="min"
            placeholder="phone  number"
            class=" text-sm focus:ring-primary-400 border-none
            block w-full rounded-r-lg py-1.5 focus:py-1 focus:ring-2 pl-2  focus:bg-gray-700 text-gray-50 hover:bg-gray-700 bg-gray-800 placeholder:italic placeholder:font-light">
        </div>
    </div>
    <div class="z-50 bg-gray-700 shadow w-full absolute flex"
      :class="[
      !open && 'hidden',
      putItemsListToTop
        ? 'flex-col-reverse rounded-t-lg bottom-[100%]'
        : 'flex-col rounded-b-lg top-[100%]',
    ]"

    ref="itemsList"

    @click="open = !autoclose"
    >
    <div class="relative m-2"
    v-if="searchable  || true"
    @click.stop="open = true"
    >
        <input
          type="search"
          class="block appearance-none py-0.5 px-1 w-full z-20 text-gray-900 bg-gray-50 rounded-lg border-l-2 border  focus:ring-primary-400  ring-primary-400  focus:ring-1 focus:outline-none placeholder:italic placeholder:font-light"
          placeholder="Search"
          @keyup="() => search"
          v-model="searchInput"
          tabindex="0"
        />
        <span
          class="absolute top-0 right-0 p-0.5 font-medium text-white bg-primary-400 rounded-r-lg border border-primary-400 hover:bg-primary-400 focus:ring-4 focus:outline-none focus:ring-primary-400"
        >
          <i class="fa-solid fa-magnifying-glass mx-1"></i>
        </span>
      </div>

    <slot
        name="listOption"
        :options="data"
        @change="handleSelection"
        :isSelectedItem="isSelectedItem"
        :optionFormat="optionFormat"
      >
        <NList
        :options="data"
        :optionFormat="optionFormat"
        :selected-options="selectedItems"
        @change="handleSelection" 
        v-slot="{item}"
        class="my-0"
        >
          <div class=" py-0.5 px-4" >
            {{ item[optionFormat.name ] }}
          </div>
        </NList>
        <!-- <ul
        class="space-y-0.5 text-white overflow-y-auto max-h-[150px] scrollbar-w-[5px] scrollbar-thin scrollbar-thumb-primary-400 scrollbar-track-slate-700 my-1.5"
        >
            <li
                v-for="(option, i) of data"
                :key="i"
                @click="makeSelection(option)"
                @keyup.enter="makeSelection(option)"
                class="block px-4 py-0.5 focus:bg-primary-400 hover:bg-primary-300 focus:ring-0 focus:text-gray-700 hover:text-gray-700 cursor-pointer truncate"
                :class="{ 'text-gray-700 bg-primary-400': isSelectedItem(option) }"
                tabindex="0"
            >
              {{ optionName(option) }}
            </li>
        </ul> -->
      </slot>

    </div>
  </div>
</template>

<script lang="ts" setup>
import countryDialInfo  from "../data/country_dial_info.json"
import { computed, ref } from 'vue';
import IPhone  from ".";
import { ChooseCorrectWayForItemsList } from "@/mixins";
import { NList } from "../..";
import { InputRules } from "../utils";

const selectOptions = computed(()=>{
  return countryDialInfo.map(element => {
      return {
          name: `${element.flag} ${element.dial_code} (${element.name})` ,
          value: element ,
      }
  })
});

type CountryDialInfoType = typeof selectOptions.value[0]
type PropsType = Omit< IPhone<CountryDialInfoType>["props"], "multipleSelect" | "placeholder" >;
type EmitsType = IPhone<CountryDialInfoType>["emits"];
type OptionsType = PropsType["options"];

type ItemOptionsType = OptionsType[0];

const emit = defineEmits<EmitsType>();

type MakeSearchType = {
keyword: string;
//searchableData: OptionsType;
searchableData: OptionsType;
reverse?: boolean;
strict?: boolean;
};

const selectElement = ref();

const props = defineProps< Partial< PropsType & {pattern: string, hasError: boolean} > >();

const open = ref(false);

const searchInput = ref<string>();

const putItemsListToTop = ref(false);

const autoclose = computed(() => props.autoclose || false);

const phoneNumber = ref<string>()

const completePhone = ref()

const optionFormat = computed(
() => props.optionFormat || { name: "name", value: "value" }
);

const data = ref(props.options || selectOptions.value);

const PropsOptions = ref(data.value)

const selectedItems = ref<any>(data.value && data.value[0]);
//const data = ref(PropsOptions.value);


const showOrHideSelectItemsList = () => {
  const position = ChooseCorrectWayForItemsList(selectElement.value)
  console.log(position);
  
  putItemsListToTop.value = position.top
  open.value = !open.value;
};

const isSelectedItem = (option: any): boolean => {

  const item:any = selectedItems.value


  if (option instanceof Object && item instanceof Object) {
    const name = optionFormat.value.name
    return (
      item[name] === option[name] 
      /*&&
      item.value === option.value*/
    );
  } else {
    return item === option;
  }
};

const optionName = (option: any): string => {
  if (option instanceof Object) {
    const name = optionFormat.value.name
    if (option[name] ) {
      return option[name].toString();
    } else {
      alert(`${name} doesn't existe in option`);
      throw console.error(
        `${name} doesn't existe in option`
      );
    }
  } else {
    return option.toString();
  }
};


const makeSearch = ({
keyword,
searchableData,
reverse = false,
strict = false,
}: MakeSearchType): { has_result: boolean; data: OptionsType } => {
  let has_result: boolean = false;

  keyword = keyword.toLowerCase();

  const _data = searchableData.filter((option) => {
    let test: boolean = false;
    let name: string;

    name = optionName(option).toLowerCase();

    if (strict) {
      test = name === keyword;
    } else {
      test = name.includes(keyword);
    }

    if (!has_result && test && reverse) {
      has_result = true;
    }
    if (!has_result && test && !reverse) {
      has_result = true;
    }

    return reverse ? !test : test;
  });

  const result = {
    has_result: has_result,
    data: _data,
  };

  return result;
};


const search = computed((): void => {

  const keyword: string | undefined = searchInput.value?.trim();
  if (keyword) {
    const result = makeSearch({
      keyword: keyword,
      searchableData: PropsOptions.value,
    });
    data.value = result.data;
    
  } else {
    data.value = PropsOptions.value;
  }
});

const closeToggle = ()=>{
  open.value = false
  resetSearch()
}

const resetSearch = ()=>{
  searchInput.value = ""
  data.value = PropsOptions.value;
}

const emitPhone = () =>{

  if(selectedItems.value ){

    const { value:phoneData } = selectedItems.value
    completePhone.value = `${phoneData.dial_code} ${phoneNumber.value||""}`

    //console.log(completePhone.value);

    emit("update:modelValue", completePhone.value);
  }
  
}

const getPhoneNumberInGoodFormat = ()=>{

  const data = phoneNumber.value && InputRules.parseToNumber ({value: phoneNumber.value, pattern: props.pattern})

  phoneNumber.value = data

  emitPhone()

}

const handleSelection = (data: ItemOptionsType)=>{
  
  //open.value = !autoclose.value;

  selectedItems.value = data

  //console.log(phoneNumber.value)

  /** emit when phone number is writen */
  emitPhone()

}

</script>