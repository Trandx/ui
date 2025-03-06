// components.d.ts
import { DefineComponent } from 'vue'

export type CameraType = {
  name: string
  value: string
}

export type PropsType = {
  cropBoxResizable?: boolean
  aspectRatio?: number
  cropBoxWidth?: number
  cropBoxHeight?: number
  autoplay?: boolean
}
