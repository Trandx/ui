<template>
    <div class="flex items-center justify-between gap-2 mb-6" @paste="handlePaste">
        <div class="flex justify-arround" v-for="(value, key) in otp">
            <!-- <div v-if="key === Math.round(otp.length/2)" :key class="w-auto h-full flex justify-center items-center text-3xl text-center">
            <i class="fa-solid fa-minus"></i>
            </div> -->
            <input :key :value @input="e => handleInput(e, key)" placeholder="0" ref="otpImput" v-model="otp[key]" class="w-11 h-11 text-center border rounded-md shadow-sm focus:border-primary-400 focus:ring-primary-400" type="text" maxlength="1" autocomplete="one-time-code" required>
        </div>
    </div>
</template>
<script setup lang="ts">
import { watch } from "vue";
import { computed, onMounted, ref } from "vue";

const props = defineProps({
    length:{
        type: Number,
        default: 6,
    },
    value:{
        type: String,
        default: '',
    },
})

const emit = defineEmits();

const codeLength = computed(()=> props.length)

const otp = ref(Array(props.length).fill(''));

const otpImput = ref<HTMLInputElement[]>([]);

const handlePaste = (event: ClipboardEvent ) => {

    const pasteData = event.clipboardData?.getData('text').replaceAll('-','');

    autoFill(pasteData)
    event.preventDefault();
}

const autoFill = (data:string | undefined) => {
    if (data?.length === codeLength.value) {
        for (let i = 0; i < codeLength.value; i++) {
        otp.value[i] = data[i];
        }

        emitData(otp.value)
    }
}

const handleInput = (event: Event, index: number) => {
    const elt = event.target as HTMLInputElement;
    const value = elt.value

    if (value.length === 1) {
        if (index < codeLength.value-1) {
        otpImput.value[index+1].focus()
        }
        //console.log('input', otp.value);

        emitData(otp.value)
    }
}

const emitData = (data: string[]) => {
    const otp_code = data.toString().replaceAll(',','')
    //console.log(otp_code);
    
    emit('update:modelValue', otp_code)
}

watch(props, ({length}) => {
otp.value = Array(length).fill('')
})

onMounted(() => {
    otpImput.value[0].focus();
    autoFill(props.value)
});
</script>
    