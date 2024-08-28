<template>
    <div class="flex items-center justify-between gap-2 mb-6" @paste="handlePaste" >
        <div class="flex justify-arround" v-for="(value, key) in otp">
            <!-- <div v-if="key === Math.round(otp.length/2)" :key class="w-auto h-full flex justify-center items-center text-3xl text-center">
            <i class="fa-solid fa-minus"></i>
            </div> -->
            <input :key @keydown.right="e => goRight(e, key)" @keydown.left="e => goLeft(e, key)" @keydown.delete="e => deleteCode(e, key)" @keydown="e => handleBeforeUpdate(e)" @input ="e => handleInput(e, key)" placeholder="0" ref="otpImput" :value="otp[key]" class="w-11 h-11 text-center border rounded-md shadow-sm focus:border-primary-400 focus:ring-primary-400" type="text" maxlength="1" autocomplete="one-time-code" required>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onBeforeMount, watch } from "vue";
import { computed, onMounted, ref } from "vue";

const props = defineProps({
    length:{
        type: Number,
        default: 6,
    },
    modelValue: String,
})

const emit = defineEmits();

const codeLength = computed(()=> props.length)

const otp = ref();

const otp_code = ref();

const otpImput = ref<HTMLInputElement[]>([]);

const handlePaste = (event: ClipboardEvent ) => {

    const pasteData = event.clipboardData?.getData('text').replaceAll('-','');

    autoFill(pasteData)
    emitData(otp.value)
    event.preventDefault();
}

const deleteCode = (event: KeyboardEvent, key: number) => {
    event.preventDefault();

    otp.value[key] = ''
    if (key > 0 ) {
        otpImput.value[key-1].focus()
    }
    
    emitData(otp.value)
}

const goRight = (event: KeyboardEvent, key: number) => {
    event.preventDefault();

    if (key < codeLength.value-1) {
        otpImput.value[key+1].focus()
    }
}

const goLeft = (event: KeyboardEvent, key: number) => {
    event.preventDefault();

    if (key > 0) {
        otpImput.value[key-1].focus()
    }
}

const autoFill = (data:string | undefined) => {

    otp.value = Array(codeLength.value).fill('')

    if (data && data.length !== 0) {
        for (let i = 0; i < codeLength.value; i++) {
            
            otp.value[i] = data[i] || '';
        }
    }
}

const handleBeforeUpdate = (event: KeyboardEvent) => {
    const elt = event.target as HTMLInputElement;

    //console.log('input', event.key, otp.value);

    if (event.key !== 'Enter') {
        // The Enter key was pressed
       elt.value = ''
    }

}

const handleInput = (event: Event, index: number) => {
    const elt = event.target as HTMLInputElement;
    const value = elt.value

    //console.log('input', otp.value, value);

    if (value.length === 1) {
        if (index < codeLength.value-1) {
            otpImput.value[index+1].focus()
        }

        otp.value[index] = value

        emitData(otp.value)
    }
}

const emitData = (data: string[]) => {
    otp_code.value = data.toString().replaceAll(',','')
    //console.log('otp', otp_code);
    
    emit('update:modelValue', otp_code.value)
}

watch(() => props.modelValue, (newVal) => {
    //console.log(newVal, otp_code.value);

    if (newVal !== otp_code.value) {
        /// will be fill only when the external value has updated
        autoFill(newVal)
    }
})

onMounted(() => {
    otpImput.value[0]?.focus();
    autoFill(props.modelValue)
});

</script>