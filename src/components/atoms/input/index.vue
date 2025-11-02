<template>
  <div class="w-full focus:ring-4 focus:outline-none focus:ring-gray-300">
    <slot name="label">
      <label v-if="label" class="text-secondary-400 mb-2 font-medium block">
        {{ label }}
      </label>
    </slot>
    <div class="w-full relative">
      <slot
        name="input"
        :disabled
        :type="type"
        :pattern="pattern"
        :required="required || false"
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
          ref="inputRef"
          :disabled
          :type
          :pattern
          :required
          :min
          :max
          :maxlength
          :minlength
          :placeholder
          :value="inputValue"
          @input="handleInput"
          @blur="handleBlur"
          @keyup.enter="handleEnter"
          @focus="handleFocus"
          :class="[
            'hover:bg-gray-600 focus:bg-gray-700 bg-secondary-500 placeholder-gray-400 text-white block w-full py-1 pr-4 pl-2 disabled:bg-gray-500 disabled:cursor-not-allowed border focus:ring-1 focus:outline-none rounded-lg placeholder:italic placeholder:font-light autofill:bg-gray-700 transition-colors duration-150',
            inputError.error
              ? 'focus:ring-red-500 border-2 border-red-500 focus:border-red-500 invalid:border-red-500'
              : 'valid:border-primary-500 focus:border-primary-500 focus:ring-primary-500 ring-primary-500 in-range:border-primary-500 out-of-range:border-red-500'
          ]"
        />
      </slot>
      <span class="absolute top-0 right-1" v-if="required">
        <slot name="star">
          <i class="fa-solid fa-star-of-life text-[10px] text-primary-500"></i>
        </slot>
      </span>
      <transition name="fade">
        <div v-if="inputError.error" class="mt-1">
          <slot name="errorMsg" :message="errorMsg" :defaultMsg="inputError.message">
            <div class="text-red-500 text-sm">
              {{ errorMsg || inputError.message }}
            </div>
          </slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch, nextTick } from 'vue'
import type { IInput, InputErrorType, EmitsType } from './index.type'
import { InputRules } from './utils'

const props = defineProps<IInput>()
const emit = defineEmits<EmitsType>()

const inputRef = ref<HTMLInputElement | null>(null)
const inputValue = ref('')
const inputError = reactive<InputErrorType>({
  error: false,
  type: '',
  message: ''
})

const isPlural = computed(() => props.minlength && props.minlength > 1)

const EMAIL_ERROR_FORMAT = 'incorrect email format'
const URL_ERROR_FORMAT = 'incorrect URL format'
const PATTERN_ERROR = 'pattern error'
const MIN_LENGTH_ERROR = `minimum ${props.minlength || 1} character${isPlural.value ? 's' : ''} ${isPlural.value ? 'are' : 'is'} required`
const MAX_LENGTH_ERROR = `maximum ${props.maxlength} characters is required`
const MAX_NUMBER_ERROR = `${props.max} must be the maximum`
const MIN_NUMBER_ERROR = `${props.min} must be the minimum`

const emitError = ({ type = '', message = '', error = false }: InputErrorType) => {
  const previousError = inputError.error
  
  inputError.error = error
  inputError.type = type
  inputError.message = message

  emit('error', { ...inputError })
  
  // Préserver le focus si l'état d'erreur change
  if (previousError !== error && document.activeElement === inputRef.value) {
    nextTick(() => {
      inputRef.value?.focus()
    })
  }
}

const handleBlur = () => {
  // Valider seulement au blur pour une meilleure UX
  if (inputValue.value) {
    checkValidity(inputValue.value)
  }
  emit('blur')
}

const handleEnter = () => emit('keyup.enter')

const handleFocus = () => {
  // Effacer l'erreur au focus pour une meilleure UX
  if (inputError.error) {
    emitError({ error: false })
  }
  emit('focus')
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  inputValue.value = target.value

  // Émettre le changement immédiatement
  emit('update:modelValue', inputValue.value)
  emit('change', inputValue.value)
  
  // Validation en temps réel seulement pour certains types
  if (props.type === 'number' || (inputError.error && inputValue.value)) {
    checkValidity(inputValue.value)
  }
}

const checkValidity = (value: string) => {
  // Parse to valid number
  if (props.type === 'number') {
    value = InputRules.parseToNumber({ value, pattern: props.pattern })

    // Check min
    if (props.min !== undefined) {
      const check = InputRules.isUpThanTheMinimum({ minVal: props.min, value })
      if (!check) {
        emitError({ type: 'MIN_NUMBER_ERROR', message: MIN_NUMBER_ERROR, error: true })
        return
      }
    }

    // Check max
    if (props.max !== undefined) {
      const check = InputRules.isDownTheMaximum({ maxVal: props.max, value })
      if (!check) {
        emitError({ type: 'MAX_NUMBER_ERROR', message: MAX_NUMBER_ERROR, error: true })
        return
      }
    }
  }

  // Check validity with the pattern
  if (props.pattern) {
    const check = InputRules.check({ pattern: props.pattern, value })
    if (!check) {
      emitError({ type: 'PATTERN_ERROR', message: PATTERN_ERROR, error: true })
      return
    }
  }

  // Check minLength
  if (props.minlength && value) {
    const check = InputRules.isMinLength({ length: props.minlength, value })
    if (!check) {
      emitError({ type: 'MIN_LENGTH_ERROR', message: MIN_LENGTH_ERROR, error: true })
      return
    }
  }

  // Check maxLength
  if (props.maxlength) {
    const check = InputRules.isMaxLength({ length: props.maxlength, value })
    if (!check) {
      emitError({ type: 'MAX_LENGTH_ERROR', message: MAX_LENGTH_ERROR, error: true })
      return
    }
  }

  // Check if is valid url
  if (props.type === 'url' && value) {
    const check = InputRules.isGoodUrlFormat({ value, pattern: props.pattern })
    if (!check) {
      emitError({ type: 'URL_ERROR', message: URL_ERROR_FORMAT, error: true })
      return
    }
  }

  // Check if is valid email
  if (props.type === 'email' && value) {
    const check = InputRules.isGoodEmailFormat({ value, pattern: props.pattern })
    if (!check) {
      emitError({ type: 'EMAIL_ERROR', message: EMAIL_ERROR_FORMAT, error: true })
      return
    }
  }

  // No errors found
  emitError({ error: false })
}

// Watch external modelValue changes
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== inputValue.value) {
      inputValue.value = newVal || ''
    }
  }
)

// Watch external error prop
watch(
  () => props.error,
  (newValue) => {
    if (newValue !== undefined) {
      emitError({ error: newValue })
    }
  }
)

onMounted(() => {
  if (props.modelValue) {
    inputValue.value = props.modelValue
  }
  if (props.error) {
    emitError({ error: props.error })
  }
})
</script>