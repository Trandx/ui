<!-- <template>
    <div class="px-4 w-full space-y-1" >
        <div class="flex space-x-1 w-full">
            <NInput type="url" :placeholder v-model="inputUrl" />
            <NBtn class="" @click="handleFecthImage" :isLoading>
                <i class="fa-solid fa-right-left"></i>
            </NBtn>
        </div>
        <p class="py-4  text-sm text-gray-500 w-full text-center">
            I want to to upload or
            <a class="underline font-bold italic cursor-pointer" @click="handleChangeTypeOfUpload">Drag and Drop</a>
        </p>
    </div>
</template> 

<script setup lang="ts">
import { ref } from 'vue';

const placeholder = 'http://example.com'

const inputUrl = ref<string>()

const isLoading = ref<boolean>(false)

const handleFecthImage = async () => {
    inputUrl.value && await fetchImage(inputUrl.value)
}

const fetchImage = async (url: string) => {
    try {
        isLoading.value = true
        const response = await fetch(url);

        if (!response.ok) {
            // Handle HTTP errors like 404, 500, etc.
            console.log(response);
            
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const contentLength = response.headers.get('Content-Length');
        const total = contentLength ? parseInt(contentLength, 10) : 0;

        console.log(response.body);
        

        if (!response.body) throw new Error('ReadableStream not yet supported in this browser.');

        const reader = response.body.getReader();
        const chunks = [];
        let receivedLength = 0;

        while (true) {
            const { done, value } = await reader.read();

            if (done) break;

            if (value) {
                chunks.push(value);
                receivedLength += value.length;
                progress.value = total ? Math.round((receivedLength / total) * 100) : 100;

                //console.log(progress.value);
            }
        }

        const blob = new Blob(chunks);
        imageSrc.value = URL.createObjectURL(blob);

        console.log(imageSrc.value);
        
    } catch (error) {
        console.error('Error fetching the image:', error.message);
    } finally {
        isLoading.value = false;
    }
};

</script> -->