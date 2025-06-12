<template>
  <div class="grid gap-2 w-full max-w-sm mx-auto"
  :style="`grid-template-columns: repeat(${otp.length}, minmax(0, 1fr));`" @paste="handlePaste">
    <div class="" v-for="(_, key) in otp" :key>
      <input
        @keydown.right="(e) => goRight(e, key)"
        @keydown.left="(e) => goLeft(e, key)"
        @keydown.delete="(e) => deleteCode(e, key)"
        @keydown="(e) => handleBeforeUpdate(e)"
        @input="(e) => handleInput(e, key)"
        @focus="otpImput[key].select()"
        @blur="otpImput[key].value = otpImput[key].value.trim()"
        @paste="handlePaste"
        @change="(e) => handleInput(e, key)"
        ref="otpImput"
        :value="otp[key]"
        class="w-full max-w-11 aspect-square text-center border border-secondary-500 rounded-md shadow-sm focus:border-primary-500 focus:border-2 focus:ring-primary-500 cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        type="text"
        maxlength="1"
        autocomplete="one-time-code"
        :required
        :disabled
        :placeholder
        :aria-required="props.required"
        :aria-invalid="props.required && otp[key] === ''"
        :aria-label="`OTP input ${key + 1}`"

        :aria-describedby="`otp-input-${key + 1}`"
        :aria-labelledby="`otp-input-${key + 1}`"
        :aria-autocomplete="'none'"
        :aria-activedescendant="`otp-input-${key + 1}`"
        :aria-controls="`otp-input-${key + 1}`"
        :aria-haspopup="false"
        :aria-multiline="false"
        :aria-readonly="false"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { watch } from 'vue'
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  length: {
    type: Number,
    default: 6,
  },
  modelValue: String,
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '0',
  },
})

const emit = defineEmits()

const codeLength = computed(() => props.length)

const otp = ref<string[]>(Array(props.length).fill(''))

const otp_code = ref()

const otpImput = ref<HTMLInputElement[]>([])

const handlePaste = (event: ClipboardEvent) => {
  const pasteData = event.clipboardData?.getData('text').replaceAll('-', '')

  autoFill(pasteData)
  emitData(otp.value!)
  event.preventDefault()
}

const deleteCode = (event: KeyboardEvent, key: number) => {
  event.preventDefault()

  otp.value![key] = ''
  if (key > 0) {
    otpImput.value[key - 1].focus()
  }

  emitData(otp.value!)
}

const goRight = (event: KeyboardEvent, key: number) => {
  event.preventDefault()

  if (key < codeLength.value - 1) {
    otpImput.value[key + 1].focus()
  }
}

const goLeft = (event: KeyboardEvent, key: number) => {
  event.preventDefault()

  if (key > 0) {
    otpImput.value[key - 1].focus()
  }
}

const autoFill = (data: string | undefined) => {
  otp.value = Array(codeLength.value).fill('')

  if (data && data.length !== 0) {
    for (let i = 0; i < codeLength.value; i++) {
      otp.value[i] = data[i] || ''
    }
  }
}

const handleBeforeUpdate = (event: KeyboardEvent) => {
  const elt = event.target as HTMLInputElement

  //console.log('input', event.key, otp.value);

  if (event.key !== 'Enter') {
    // The Enter key was pressed
    elt.value = ''
  }
}

const handleInput = (event: Event, index: number) => {
  const elt = event.target as HTMLInputElement
  const value = elt.value

  //console.log('input', otp.value, value);

  if (value.length === 1) {
    if (index < codeLength.value - 1) {
      otpImput.value[index + 1].focus()
    }

    otp.value![index] = value

    emitData(otp.value!)
  }
}

const emitData = (data: string[]) => {
  otp_code.value = data.toString().replaceAll(',', '')
  //console.log('otp', otp_code);

  emit('update:modelValue', otp_code.value)
}

watch(
  () => props.modelValue,
  (newVal) => {
    //console.log(newVal, otp_code.value);

    if (newVal !== otp_code.value) {
      /// will be fill only when the external value has updated
      autoFill(newVal)
    }
  },
)

onMounted(() => {
  otpImput.value[0]?.focus()
  autoFill(props.modelValue)
})
</script>
