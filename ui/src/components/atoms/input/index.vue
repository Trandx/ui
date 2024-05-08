<template>
    <div class=" w-full space-y-1 focus:ring-4 focus:outline-none focus:ring-gray-300 ">
        <slot name="label">
            <label class="text-secondary-400  mb-2  font-medium">
                {{ label }}
            </label>
    
        </slot>  
        <div class=" w-full relative">
            <slot name="input"
            :type="type"
            :pattern="pattern"
            :required="required|| false"
            :min="min"
            :max="max"
            :maxlength="maxlength"
            :minlength="minlength"
            :placeholder="placeholder"
            :value="inputValue"
            :error="inputError.error"
            :input="handleInput"
            :blur="handleBlur"
            :keyupEnter="handleEnter"
            :focus="handleFocus"
            >
                <input 
                :type="type"
                :pattern="pattern"
                :required="required|| false"
                :min="min"
                :max="max"
                :maxlength="maxlength"
                :minlength="minlength"
                :placeholder="placeholder"
                :value="inputValue"
                @input="handleInput"
                @blur="handleBlur"
                @keyup.enter="handleEnter"
                @focus="handleFocus"
                :class="inputError.error&&`${'focus:ring-red-500 border-red-500 border-2 focus:border-none'}`"
                class=" bg-secondary-400 placeholder-gray-400 text-white
                block w-full py-[6px] pr-4 pl-2 h-full focus:ring-primary-400  ring-primary-400 focus:ring-2 focus:outline-none rounded-lg placeholder:italic placeholder:font-light autofill:bg-gray-700 out-of-range:border-red-500 in-range:border-primary-400 valid:border-primary-400  " />
                

            </slot>
            <span class="absolute top-0 right-1" v-if="required">
                <slot name="star">
                    <i class="fa-solid fa-star-of-life text-[10px] text-primary-400"></i>
                </slot>
            </span>
            <div v-if=" inputError.error">
                <slot name="errorMsg" :message="errorMsg" :defaultMsg="inputError.message">
                    <div class="text-red-500">
                        {{ errorMsg || inputError.message }}
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import {IInput, InputErrorType, EmitsType} from './index.d'
import { InputRules } from './utils';
const props = defineProps<IInput>()
const emit = defineEmits<EmitsType>()

const EMAIL_ERROR_FORMAT = "incorrect email format"
const PATTERN_ERROR = "pattern error"
const MIN_LENGTH_ERROR = `minimun ${props.minlength} character is required`
const MAX_LENGTH_ERROR = `maximun ${props.maxlength} characters is required`
const MAX_NUMBER_ERROR = `${props.max}  must be the maximun`
const MIN_NUMBER_ERROR = `${props.min} must be the minimun `

const inputError = reactive<InputErrorType>({})

const inputValue = ref()

const emitError = ({type, message, error: success}:InputErrorType)=>{
    //emit("update:modelValue", inputValue.value); // emit on v-model
    inputError.error = success

    if(success){
        inputError.type= type
        inputError.message = message

        emit("error", inputError)
        //console.log(inputError);
        
        return 
    }

    inputError.type= ""
    inputError.message = ""
    
    emit("error", inputError)
    
}

const handleBlur = () =>emit("blur")

const handleEnter = () =>emit("keyup.enter")

const handleFocus = () =>emit("focus")

const handleInput = (event: any)=>{
    inputValue.value = event.target.value

    //parse to valid number 
    if(props.type == "number"){
        inputValue.value = InputRules.parseToNumber({value: inputValue.value, pattern: props.pattern})
        
        //check min
        if(props.min){
            const check =  InputRules.isUpThanTheMinimum({minVal: props.min, value: inputValue.value})
            emitError({type: "MIN_NUMBER_ERROR" , message: MIN_NUMBER_ERROR, error: !check })

            if(!check){ // return if error
                return 
            }
        }

        //check max
        if(props.max){

            //check maxLength
            if(props.maxlength){
                inputValue.value =  InputRules.limit({length: props.maxlength, value: inputValue.value})
            }

            const check =  InputRules.isDownTheMaximum({maxVal: props.max, value: inputValue.value})
            //console.log(check, props.max, inputValue.value);
            
            emitError({type: "MAX_NUMBER_ERROR" , message: MAX_NUMBER_ERROR, error: !check })

            if(!check){ // return if error
                return 
            }
        }

        
    }

     //check validy with the pattern
     if(props.pattern){

        const check = InputRules.check({pattern: props.pattern, value: inputValue.value})
        emitError({type: "PATTERN_ERROR" , message: PATTERN_ERROR, error: !check })
        
        if(!check){
            return 
        }
    }

    //check minLength
    if(props.minlength){

        const check =  InputRules.isMinLength({length: props.minlength, value: inputValue.value})

        emitError({type: "MIN_LENGTH_ERROR" , message: MIN_LENGTH_ERROR, error: !check })
        
        if(!check){
            return 
        }
    }

    //check maxLength
    if(props.maxlength){
        const check =  InputRules.isMaxLength({length: props.maxlength, value: inputValue.value})
        //console.log(check);
        emitError({type: "MAX_LENGTH_ERROR" , message: MAX_LENGTH_ERROR, error: !check })

        if(!check){
            return 
        }
    }

    //check if is valid email
    if(props.type == "email"){
        const check = InputRules.isGoodEmailFormat({value: inputValue.value, pattern: props.pattern})
        //console.log(check);
        emitError({type: "EMAIL_ERROR" , message: EMAIL_ERROR_FORMAT, error: !check })

        if(!check){
            return 
        }
    }

    emit("update:modelValue", inputValue.value); // emit on v-model
    
}



</script>