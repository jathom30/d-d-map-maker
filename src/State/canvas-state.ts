import { atom, selector } from 'recoil'
import { gridSizeAtom } from './state'

export const stageDimsAtom = atom({
  key: 'visibleCanvasDims',
  default: {
    width: 0,
    height: 0,
  },
})

export const canvasDimsSelector = selector({
  key: 'canvasDimsSelector',
  get: ({ get }) => {
    const gridSize = get(gridSizeAtom)
    return {
      width: gridSize * 100,
      height: gridSize * 100,
    }
  },
})

export const gridLinesSelector = selector({
  key: 'gridLines',
  get: ({ get }) => {
    const { width, height } = get(canvasDimsSelector)
    const gridSize = get(gridSizeAtom)

    const horizontalLineCount = Math.floor(width / gridSize)
    const verticalLineCount = Math.floor(height / gridSize)

    const minMaxHorizontalPoints = [0, gridSize * horizontalLineCount]
    const minMaxVerticalPoints = [0, gridSize * verticalLineCount]

    const horizontalCoords = []
    const verticalCoords = []

    for (let i = 0; i <= minMaxVerticalPoints[1]; i += gridSize) {
      horizontalCoords.push([0, i, width, i])
    }
    for (let i = 0; i <= minMaxHorizontalPoints[1]; i += gridSize) {
      verticalCoords.push([i, 0, i, height])
    }
    return { horizontalCoords, verticalCoords }
  },
})

export const canvasPosAtom = atom({
  key: 'canvasPos',
  default: { x: 0, y: 0 },
})
