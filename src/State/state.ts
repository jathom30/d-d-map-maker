import { atom } from 'recoil'
import { ImageType, UnsplashPhotoType, UploadedImageType } from 'Types'

export const backgroundPhotoAtom = atom<ImageType | UploadedImageType | null>({
  key: 'backgroundPhoto',
  default: null,
})

export const unsplashPhotosAtom = atom<UnsplashPhotoType[]>({
  key: 'unsplashPhotos',
  default: [],
})

export const recentColorsAtom = atom<string[]>({
  key: 'recentColors',
  default: [],
})

export const gridSizeAtom = atom({
  key: 'gridSize',
  default: 40,
})
