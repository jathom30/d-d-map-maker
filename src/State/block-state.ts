import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
} from 'recoil'
import { DimensionsType, PositionType } from 'Types'

export const blockIdsAtom = atom<string[]>({
  key: 'blockIds',
  default: [],
})

export const blockDimsAtom = atomFamily({
  key: 'blockDims',
  default: { width: -1, height: -1 },
})

export const blockPosAtom = atomFamily({
  key: 'blockPos',
  default: { x: -1, y: -1 },
})

export const selectedBlockPosSelector = selectorFamily({
  key: 'selectedBlockPosSelector',
  get:
    (id) =>
    ({ get }) => {
      const lassoPos = get(selectedPosSelector)
      const unselectedPos = get(blockPosAtom(id))
      return {
        x: unselectedPos.x - lassoPos.x,
        y: unselectedPos.y - lassoPos.y,
      }
    },
})

export const isCreatingShapeAtom = atom({
  key: 'isCreatingShape',
  default: false,
})

export const creationPosAtom = atom({
  key: 'creationPos',
  default: { x: 0, y: 0 },
})

export const creationDimsAtom = atom({
  key: 'creationDims',
  default: { width: -1, height: -1 },
})

export const selectedBlockIdsAtom = atom<string[]>({
  key: 'selectedBlockIds',
  default: [],
})

export const isSelectedSelector = selectorFamily({
  key: 'isSelectedSelector',
  get:
    (id) =>
    ({ get }) => {
      const selectedIds = get(selectedBlockIdsAtom)
      return selectedIds.some((selectedId) => selectedId === id)
    },
})

export const selectedPosSelector = selector<PositionType & DimensionsType>({
  key: 'selectedPosSelector',
  get: ({ get }) => {
    const selectedIds = get(selectedBlockIdsAtom)
    const blocks = selectedIds.map((id) => {
      const pos = get(blockPosAtom(id))
      const dims = get(blockDimsAtom(id))
      return { ...pos, ...dims }
    })
    const minX = Math.min(...blocks.map((block) => block.x))
    const minY = Math.min(...blocks.map((block) => block.y))
    const width = blocks.reduce((acc: number, block) => {
      const blockWidth = block.x + block.width - minX
      return blockWidth > acc ? blockWidth : acc
    }, 0)
    const height = blocks.reduce((acc, block) => {
      const blockHeight = block.y + block.height - minY
      return blockHeight > acc ? blockHeight : acc
    }, 0)
    const checkForInfinity = (n: number) => (n === Infinity ? 0 : n)
    return {
      x: checkForInfinity(minX),
      y: checkForInfinity(minY),
      width,
      height,
    }
  },
  set: ({ get, set }, newValue) => {
    const selectedIds = get(selectedBlockIdsAtom)

    selectedIds.forEach((id) => {
      const pos = get(selectedBlockPosSelector(id))
      const x = newValue instanceof DefaultValue ? pos.x : newValue.x + pos.x
      const y = newValue instanceof DefaultValue ? pos.y : newValue.y + pos.y
      set(blockPosAtom(id), { x, y })
    })
  },
})

export const insideLassoSelector = selector({
  key: 'isInsideLassoSelector',
  get: ({ get }) => {
    const lassoPos = get(blockPosAtom('select'))
    const lassoDims = get(blockDimsAtom('select'))
    const blockIds = get(blockIdsAtom)
    return blockIds.reduce((acc: string[], blockId) => {
      const pos = get(blockPosAtom(blockId))
      const dims = get(blockDimsAtom(blockId))
      const posInside = lassoPos.x <= pos.x && lassoPos.y <= pos.y
      const dimsInside =
        lassoPos.x + lassoDims.width >= pos.x + dims.width &&
        lassoPos.y + lassoDims.height >= pos.y + dims.height
      if (posInside && dimsInside) return [...acc, blockId]
      return acc
    }, [])
  },
})
