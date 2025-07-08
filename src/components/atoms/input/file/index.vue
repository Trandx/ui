<template>
  <div
    :class="[
      'h-72 w-full border-2 border-dashed rounded-lg bg-gray-300 hover:border-gray-500 overflow-y-auto relative',
      hasError ? 'border-red-500' : 'border-gray-600'
    ]"
  >
    <label
      for="dropzone-file"
      class="flex flex-col h-full w-full cursor-pointer"
      @dragover.prevent
      @drop.prevent="onDrop"
    >
      <input
        id="dropzone-file"
        class="hidden"
        type="file"
        :multiple="multiple"
        :accept="accept"
        @change="onFileChange"
        ref="fileInput"
      />

      <div v-if="selectedFiles.length === 0" class="flex flex-col items-center justify-center h-full">
        <i class="fa-solid fa-cloud-arrow-up fa-2x mb-4 text-gray-500"></i>
        <p class="mb-2 text-sm text-gray-500">
          <span class="font-semibold">Cliquez pour uploader</span> ou glissez-déposez
        </p>
        <p class="text-xs text-gray-500">SVG, PNG, JPG, GIF, PDF, TXT, etc.</p>
        <div class=" mt-2 ">
          <form class="flex items-start space-x-1" @submit.prevent="onFetchUrl">
            <NInput placeholder="Coller une URL de fichier" type="url" label="" v-model="inputUrl" />
            <!-- <input
              v-model="inputUrl"
              type="url"
              placeholder="Coller une URL de fichier"
              class="border rounded px-2 py-1 mr-2"
            /> -->
            <NBtn type="submit"
              class="px-3 py-1 rounded bg-primary-500 text-white hover:bg-primary-600 transition"
              :disabled="!inputUrl || isFetching"
              
            >
            <i class="fa-solid fa-arrow-down"></i>
            </NBtn>
          </form>
        </div>
        <!-- Progress bar -->
        <div v-if="isFetching" class="w-full mt-2">
          <NProgressBar :pourcentage="fetchProgress" />
          <!-- <div class="w-full bg-gray-200 rounded h-2">
            <div
              class="bg-primary-500 h-2 rounded transition-all"
              :style="{ width: fetchProgress + '%' }"
            ></div>
          </div>
          <div class="text-xs text-gray-500 mt-1 text-center">{{ fetchProgress }}%</div> -->
        </div>
        <p v-if="errorMsg" class="text-red-500 mt-2">{{ errorMsg }}</p>
      </div>

      <div v-else class="h-full overflow-y-auto">
        <div class="grid grid-auto-fill gap-2 p-2">
          <div
            v-for="(file, idx) in selectedFiles"
            :key="file.id"
            class="relative group border border-gray-400 rounded-lg p-2 bg-white shadow hover:scale-105 transition"
            @click.prevent="openPreview(file)"
          >
            <div v-if="file.imagePreview" class=" aspect-square w-full bg-center bg-cover rounded"
              :style="`background-image:url(${file.imagePreview})`"></div>
            <div v-else class="aspect-square flex items-center justify-center bg-gray-100 rounded">
                <i 
                :class="[
                  `fa-solid text-3xl text-gray-400`,
                  !['pdf','word','excel','powerpoint','image','video','audio','archive','code','csv','txt','zip','ppt','xls','doc','json','xml'].includes(file.ext)
                  ? 'fa-file' : 'fa-file-' + file.ext,
                ]"
                ></i>
            </div>
            <div class="mt-2 text-xs truncate" :title="file.name">{{ file.name }}</div>
            <div class="text-xs text-gray-500">{{ fileSizeConversion(file.size) }}</div>
            <button
              class="absolute top-1 right-1 text-gray-400 hover:text-red-500"
              @click.stop="removeFile(idx)"
              title="Supprimer"
            >
              <i class="fa-solid fa-circle-xmark"></i>
            </button>
          </div>
        </div>
        <NBtn 
          class="absolute bottom-3 right-3 z-10 bg-gray-500 rounded-full shadow-lg hover:bg-gray-200 opacity-20 hover:opacity-100 transition"
          @click="selectedFiles = []"
          title="Réinitialiser la sélection"
          :disabled="selectedFiles.length === 0"
          :class="{'cursor-not-allowed opacity-50': selectedFiles.length === 0}"
        >
          <i class="fa-solid fa-refresh text-white text-2xl hover:animate-spin" ></i>
        </NBtn>
      </div>
    </label>

    <!-- Modal de preview -->
    <NModal class="!w-auto inset-0 z-1000 !fixed" :open="previewFile !== null">
        <NModalBg class="inset-0 justify-center intems-center">
          <NModalContent
            id="modalContent"
            class="bg-white w- border-2 border-primary-500 rounded-lg"
          >
            <NModalHeader id="modalHeaders" title="waiting list" @close="closePreview" @expand="expand" @minimalize="minimizeOrRestore">
              <div class="flex items-center justify-between">
                <span class="text-lg font-semibold">{{ previewFile?.name }}</span>
                <button
                  class="text-gray-500 hover:text-red-500"
                  @click="closePreview"
                  title="Fermer la prévisualisation"
                >
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            </NModalHeader>
            <NModalBody>
              <div class="h-full w-full"v-if="previewFile">
                <div v-if="previewFile?.imagePreview">
                  <img :src="previewFile.imagePreview" class="max-h-full w-full object-cover rounded" />
                </div>
                <div v-else-if="isTextFile(previewFile)">
                  <pre class="bg-gray-100 p-2 rounded max-h-full overflow-auto text-xs">{{ previewFile.textContent }}</pre>
                </div>
                <div v-else-if="isPdfFile(previewFile)">
                  <embed
                    :src="previewFile.pdfUrl"
                    type="application/pdf"
                    class="w-full h-full"
                  />
                </div>
                <div v-else class="text-center text-gray-500">
                  <i class="fa-solid fa-file text-5xl mb-2"></i>
                  Impossible d'afficher un aperçu pour ce type de fichier.
                </div>
              </div>
            </NModalBody>
          </NModalContent>
        </NModalBg>
      </NModal>
    
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { NInput } from '..'
import { NBtn } from '../../bouton'
import { NProgressBar } from '../../loader'
import { random, fileSizeConversion } from '@package/native'
import { NModal, NModalBg, NModalBody, NModalContent, NModalHeader } from '../../modal'
import { Draggable } from '@/libs'

interface FilePreview {
  id: string
  name: string
  type: string
  size: number
  ext: string
  imagePreview?: string
  textContent?: string
  pdfUrl?: string
  file: File
}

const props = defineProps({
  accept: {
    type: String,
    default: '',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  maxSize: {
    type: Number,
    default: 10 * 1024 * 1024, // Default to 10MB
  }
})

const options = {
  resize: true,
  resizeElt: ".resizer"
}
const draggable = ref<Draggable | null>()

const expand = () => draggable.value?.expandOrRestore()
const minimizeOrRestore = () => draggable.value?.minimizeOrRestore()

onMounted(()=>{
  draggable.value = Draggable.bind("#modalHeaders", {options})
})

onBeforeUnmount(()=>{
  draggable.value?.destroy()
  draggable.value = null
})

const accept = props.accept || ''
const multiple = props.multiple ?? false

const selectedFiles = ref<FilePreview[]>([])
const errorMsg = ref('')
const inputUrl = ref('')
const previewFile = ref<FilePreview | null>(null)
const hasError = ref(false)

// Progress bar state
const isFetching = ref(false)
const fetchProgress = ref(0)

function isImage(ext: string) {
  return ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp', 'tiff', 'ico', 'avif'].includes(ext)
}
function isTextFile(file: FilePreview) {
  return /^text\/|\/json$|\/xml$|\/csv$/.test(file.type)
}

function resetError() {
  errorMsg.value = ''
  hasError.value = false
}

async function onFileChange(e: Event) {
  resetError()
  const files = (e.target as HTMLInputElement).files
  if (!files) return
  await processFiles(files)
}

async function onDrop(e: DragEvent) {
  resetError()
  const files = e.dataTransfer?.files
  if (!files) return
  await processFiles(files)
}
async function processFiles(files: FileList) {
  const acceptExtensions = accept.split(',').map(s => s.replace('.', '').trim().toLocaleLowerCase())
  const isValidExtension = (ext: string) => acceptExtensions.length === 0 || acceptExtensions.includes(ext)
  const isValidFileType = (file: File) => {
    if (!file.type) return false // Type unknown, assume valid
    const ext = file.name.split('.').pop()?.toLowerCase() || ''
    
    return isValidExtension(ext)
  }
  const isValidFileSize = (file: File) => file.size <= props.maxSize
  const isValidFile = (file: File) => {
    return isValidFileType(file) && isValidFileSize(file)
  }
  for (const file of Array.from(files)) {
     
    if (!isValidFile(file)) {
      hasError.value = true
      errorMsg.value = `Fichier invalide: ${file.name}`
      
      break; // Stop processing further files if one is invalid
    }
    
    const ext = file.name.split('.').pop()?.toLowerCase() || ''
    const preview: FilePreview = {
      id: Math.random().toString(36).slice(2),
      name: file.name,
      type: file.type,
      size: file.size,
      ext,
      file,
    }
    if (isImage(ext)) {
      preview.imagePreview = await readAsDataURL(file)
    } else if (isTextFile(preview)) {
      preview.textContent = await readAsText(file)
    } else if (isPdfFile(preview)) {
      preview.pdfUrl = URL.createObjectURL(file)
    }
    if (!multiple) selectedFiles.value = []
    selectedFiles.value.push(preview)
  }
}

function removeFile(idx: number) {
  selectedFiles.value.splice(idx, 1)
}

function openPreview(file: FilePreview) {
  previewFile.value = file
  if (isTextFile(file) && !file.textContent) {
    readAsText(file.file).then((txt: string) => (file.textContent = txt))
  }
  if (isPdfFile(file) && !file.pdfUrl) {
    file.pdfUrl = URL.createObjectURL(file.file)
  }
}

function closePreview() {
  previewFile.value = null
}

async function onFetchUrl() {
  resetError()
  isFetching.value = true
  fetchProgress.value = 0
  try {
    // Use XMLHttpRequest to track progress
    await new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', inputUrl.value, true)
      xhr.responseType = 'blob'
      xhr.onprogress = (event) => {
        if (event.lengthComputable) {
          fetchProgress.value = Math.round((event.loaded / event.total) * 100)
        }
      }
      xhr.onload = async () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          fetchProgress.value = 100
          const blob = xhr.response
          const ext = blob.type.split('/').pop() || 'file'
          
          const url = new URL(inputUrl.value)
          const pathname = url.pathname
          const fileName = pathname.split('/').pop() || `file-${random(10)}.${ext}`
          console.log(fileName, ext, blob.type);
          
          const file = new File([blob], fileName, { type: blob.type })
          await processFiles({
            0: file,
            length: 1,
            item: (i: number) => (i === 0 ? file : null),
          } as unknown as FileList)
          inputUrl.value = ''
          resolve()
        } else {
          reject(new Error('Erreur lors du téléchargement'))
        }
      }
      xhr.onerror = () => {
        reject(new Error('Erreur lors du téléchargement'))
      }
      xhr.send()
    })
  } catch (e: any) {
    errorMsg.value = e.message || 'Erreur lors de l\'import'
    hasError.value = true
  } finally {
    isFetching.value = false
    fetchProgress.value = 0
  }
}

function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function readAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsText(file)
  })
}

function isPdfFile(file: FilePreview | null): boolean {
  if (!file) return false
  return file.type === 'application/pdf' || file.ext === 'pdf'
}
</script>
