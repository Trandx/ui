export interface ICropImage {
    run({ crop_elt, img_src, corner_class }: CropImageType) : CropImage
    oncrop(fn: EventListenerOrEventListenerObject | null): void
    download(): void
    getImageCropped(): string
  }

export type ImageCropper = {
    src: string;
    type?: 'circle' | 'rectangle';
    "cropSize"?: {
        height?: number
        width: number
    }, 
    style?: {
        dot?:{
            default: string
            hover: string
        },
        border?: string
        opacity?: number
    }
}