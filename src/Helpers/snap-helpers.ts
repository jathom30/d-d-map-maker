import { PositionType } from 'Types'

// if within range of snapping, you best snap
export const snapTo = (parentPos: number, childPos: number, snap: number) => {
  const delta = parentPos - childPos
  if (delta < snap && delta > -snap) {
    return parentPos
  }
  return childPos
}

export const fixPointToGrid = (pos: PositionType, grid: number) => ({
  x: Math.round(pos.x / grid) * grid,
  y: Math.round(pos.y / grid) * grid,
})
