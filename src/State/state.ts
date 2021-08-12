import { atom } from 'recoil'

export const recentColorsAtom = atom<string[]>({
  key: 'recentColors',
  default: [],
})

export const gridSizeAtom = atom({
  key: 'gridSize',
  default: 40,
})

export const selectedToolAtom = atom({
  key: 'selectedTool',
  default: '',
})

export const canDragCanvasAtom = atom({
  key: 'canDragCanvas',
  default: false,
})
