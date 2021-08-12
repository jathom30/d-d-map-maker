import { DimensionsType } from 'Types'

export const getCenterPos = (parent: DimensionsType, child: DimensionsType) => {
  return {
    x: parent.width / 2 - child.width / 2,
    y: parent.height / 2 - child.height / 2,
  }
}

export const onGrid = (item: number, grid: number) =>
  Math.round(item / grid) * grid
