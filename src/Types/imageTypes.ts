import { DimensionsType } from './basicTypes'
import { UnsplashPhotoType } from './unsplashTypes'

export type UploadedImageType = {
  path: string
  preview: string
} & DimensionsType

export type ImageType = UnsplashPhotoType | UploadedImageType
