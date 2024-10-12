<template>
  <div class="relative"
    :class="[
      putItemsListToTop ? 'flex-col-reverse' : 'flex-col',
      hasError ? 'outline outline-2 outline-red-500 rounded-lg' : '',
]"
    
    v-click-outside="closeToggle">
    <div class="flex justify-center items-center font-medium bg-secondary-400 "
    :class="[
        !open
            ? 'rounded-lg'
            : putItemsListToTop
            ? 'rounded-b-lg'
            : 'rounded-t-lg',
        ]"
    ref="selectElement">
      <div :class="[
        'max-w-[120px] w-auto flex py-0.5 h-full justify-center items-center cursor-pointer hover:bg-gray-600 px-2 rounded-l-md',

        disabled ? 'bg-gray-500' : activeClass,
        ]"
          
        @click="showOrHideSelectItemsList"
        @blur="closeToggle">
            <slot
            name="optionSelected"
            :selectedItems="selectedItems"
            >
                <div class="w-[70%] min-w-[10px]">
                  <div
                    v-for="(selectedItem, selectedItemKey) of selectedItems"
                    :key="selectedItemKey"
                    class=" text-white flex justify-start w-auto max-w-[100%] space-x-0.5 "
                  >
                    <span>
                      {{ selectedItem.value?.flag }}
                    </span>
                    <span>
                      {{ selectedItem.value?.dial_code}}
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
            <input type="text" @click="!disabled && (open = false)" @input="getPhoneNumberInGoodFormat" v-model="phoneNumber" :maxlength="max" :minlength="min"
            placeholder="phone  number" :disabled
            class=" focus:ring-primary-400 border-none disabled:bg-gray-400
             w-full rounded-r-lg py-0 focus:ring-2 pl-2  focus:bg-gray-700 text-gray-50 hover:bg-gray-700 bg-secondary-400 placeholder:italic placeholder:font-light">
        </div>
    </div>
    <div :class="[
      'z-50 bg-secondary-400 shadow w-full absolute flex',
      !open && 'hidden',
      putItemsListToTop
        ? 'flex-col-reverse rounded-t-lg bottom-[100%]'
        : 'flex-col rounded-b-lg top-[100%]',
    ]"

    ref="itemsList"

    @click="!disabled && (open = !autoclose)"
    >
      <div class="relative m-2"
      v-if="searchable  || true"
      @click.stop="!disabled && (open = true)"
      >
          <input
            type="search"
            class="block appearance-none py-0.5 px-1 w-full z-20 text-gray-900 bg-gray-50 rounded-lg border-l-2 border  focus:ring-primary-400  ring-primary-400  focus:ring-1 focus:outline-none placeholder:italic placeholder:font-light"
            placeholder="Search"
            @keyup="() => search"
            v-model="searchInput"
            tabindex="0"
            :disabled
          />
          <span
            :class="`${activeClass} absolute top-0 right-0 p-0.5 font-medium text-white rounded-r-lg border border-primary-400 hover:bg-primary-400 focus:ring-4 focus:outline-none focus:ring-primary-400 `"
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
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import countryDialInfo  from "../data/country_dial_info.json"
import { computed, ref, toRaw } from 'vue';
import IPhone  from ".";
import { ChooseCorrectWayForItemsList } from "@/mixins";
import { NList } from "../..";
import { InputRules, parseToArray, search as makeSearch } from "../utils";
import { watch } from "vue";

type CountryDialInfoType = typeof selectOptions.value[0]

type PropsType = Omit< IPhone.props<CountryDialInfoType>, "multipleSelect" | "placeholder" >;
type EmitsType = IPhone.emits;
type OptionsType = PropsType["options"];

type ItemOptionsType = OptionsType[0];

const emit = defineEmits<EmitsType>();
const activeClass = computed(()=> props.activeClass || 'text-gray-800 bg-primary-400')

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

const selectOptions = computed(()=>{
  return countryDialInfo.map(element => {
      return {
          name: `${element.flag} ${element.dial_code} (${element.name})` ,
          value: element ,
      }
  })
});

const data = ref(props.options || selectOptions.value);

const PropsOptions = ref(data.value)

const selectedItems = ref(parseToArray(toRaw(props.selectedOptions || data.value[0]))) ;

const showOrHideSelectItemsList = (evt: Event) => {

  if (props.disabled) {
    evt.stopPropagation()
    return
  }
  const position = ChooseCorrectWayForItemsList(selectElement.value)
  //console.log(position);

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

const search = computed((): void => {

  const keyword: string | undefined = searchInput.value?.trim();
  if (keyword) {
    makeSearch({
      keyword: keyword,
      dataFormat: optionFormat.value,
      data: PropsOptions.value,
    }).then(( result) => {
      data.value = result.data;
    });

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

  if(selectedItems.value.length !== 0 ){

    const { value: phoneData } = selectedItems.value[0]
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

  selectedItems.value = data

  /** emit when phone number is writen */
  emitPhone()

}

watch(props, (newProps)=>{
  data.value = newProps.options
  PropsOptions.value = data.value
  selectedItems.value = parseToArray(toRaw(props.selectedOptions || data.value[0]))
})

</script>