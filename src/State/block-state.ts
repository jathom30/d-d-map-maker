import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
} from 'recoil'
import { DimensionsType, PositionType } from 'Types'
import { flattenDiagnosticMessageText } from 'typescript'
import { gridSizeAtom } from './state'

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

export const wallOverlapSelector = selector({
  key: 'wallOverlapSelector',
  get: ({ get }) => {
    const blockIds = get(blockIdsAtom)
    const gridSize = get(gridSizeAtom)
    const blockCoords = blockIds.reduce((allBlockPos: PositionType[], id) => {
      const pos = get(blockPosAtom(id))
      const dims = get(blockDimsAtom(id))
      const xCoords = Array.from(
        { length: dims.width / gridSize + 1 },
        (_, i) => pos.x + i * gridSize,
      )
      const yCoords = Array.from(
        { length: dims.height / gridSize + 1 },
        (_, i) => pos.y + i * gridSize,
      )
      const xAxisCoords = (top: boolean) =>
        xCoords.reduce(
          (acc: PositionType[], xCoord) => [
            ...acc,
            { x: xCoord, y: pos.y + (top ? 0 : dims.height) },
          ],
          [],
        )
      const yAxisCoords = (left: boolean) =>
        yCoords.reduce(
          (acc: PositionType[], yCoord) => [
            ...acc,
            { x: pos.x + (left ? 0 : dims.width), y: yCoord },
          ],
          [],
        )
      // all sides with duplicates (corners) filtered
      const thisBlockCoords = [
        ...xAxisCoords(true),
        ...yAxisCoords(true),
        ...xAxisCoords(false),
        ...yAxisCoords(false),
      ].filter(
        (v, i, a) => a.findIndex((t) => t.x === v.x && t.y === v.y) === i,
      )
      return [...allBlockPos, ...thisBlockCoords]
    }, [])
    return blockCoords.filter(
      (v, i, a) => a.findIndex((t) => t.x === v.x && t.y === v.y) !== i,
    )
  },
})

export const blockCornerPositionsSelector = selectorFamily({
  key: 'blockCornerPositionsSelector',
  get:
    (id) =>
    ({ get }) => {
      const pos = get(blockPosAtom(id))
      const dims = get(blockDimsAtom(id))
      const gridSize = get(gridSizeAtom)
      const topLeft = pos
      const topRight = {
        x: pos.x + dims.width - gridSize,
        y: pos.y,
      }
      const bottomLeft = {
        x: pos.x,
        y: pos.y + dims.height - gridSize,
      }
      const bottomRight = {
        x: pos.x + dims.width - gridSize,
        y: pos.y + dims.height - gridSize,
      }
      return [topLeft, bottomLeft, topRight, bottomRight]
    },
})

export const allBlockCornerCoordsSelector = selector({
  key: 'allBlockCornerCoordsSelector',
  get: ({ get }) => {
    const ids = get(blockIdsAtom)
    return ids.reduce(
      (coords: PositionType[], id) => [
        ...coords,
        ...get(blockCornerPositionsSelector(id)),
      ],
      [],
    )
  },
})

export const wallBlockIsVisibleAtom = atomFamily({
  key: 'wallBlockIsVisible',
  default: true,
})

export const blockIsDraggingAtom = atomFamily({
  key: 'blockIsDragging',
  default: false,
})
