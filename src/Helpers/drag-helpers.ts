import Konva from 'konva'
import { Image } from 'konva/lib/shapes/Image'
import React from 'react'
import { DimensionsType, PositionType } from 'Types'
import { Nullable } from 'unsplash-js/src/helpers/typescript'
import { KonvaEventObject } from 'konva/lib/Node'
import { snapTo } from './snap-helpers'

// returns safe drag position to keep contents covered by parent
export const handleCoverDrag = (
  pos: PositionType,
  draggedItem: Nullable<Konva.Image | Konva.Group | Konva.Rect>,
) => {
  if (!draggedItem) return pos
  const layer = draggedItem.getLayer()
  const scale = layer?.getAbsoluteScale() || { x: 1, y: 1 }
  const parent = draggedItem.getParent()
  const parentPos = parent.getAbsolutePosition()
  const draggedItemDim = {
    width: draggedItem.width(),
    height: draggedItem.height(),
  }

  const offset = {
    x: pos.x - parentPos.x,
    y: pos.y - parentPos.y,
  }
  const getSafeCoord = (axis: 'x' | 'y') => {
    const dimension = axis === 'x' ? 'width' : 'height'
    const maxCheck =
      offset[axis] / scale.x + draggedItemDim[dimension] - parent[dimension]()
    if (offset[axis] > 0) return parentPos[axis]
    if (maxCheck < 0) {
      return (
        parentPos[axis] -
        draggedItemDim[dimension] * scale[axis] +
        parent[dimension]() * scale[axis]
      )
    }
    return pos[axis]
  }
  return {
    x: getSafeCoord('x'),
    y: getSafeCoord('y'),
  }
}

// not currently used, but useful if a grid needs to be applied to an artboard...
// ...will snap item to grid
export const getGridPosition = (
  pos: PositionType,
  dims: DimensionsType,
  grid: number,
  bounds: DimensionsType,
) => {
  const x = Math.round(pos.x / grid) * grid
  const y = Math.round(pos.y / grid) * grid
  const { width, height } = dims
  const safeSpace = (
    position: number,
    dimension: number,
    bound: number,
    gridSize: number,
  ) => {
    const max = bound - dimension
    const min = 0
    if (position >= max) {
      return max
    }
    if (position <= min) {
      return min
    }
    return position
  }
  return {
    x: safeSpace(x, width, bounds.width, grid),
    y: safeSpace(y, height, bounds.height, grid),
  }
}

// clamps value within a min and max
export const withinMinMax = (initial: number, minMax: [number, number]) => {
  if (initial < minMax[0]) {
    return minMax[0]
  }
  if (initial > minMax[1]) {
    return minMax[1]
  }
  return initial
}

// returns position and dimensions for an image to cover its parent
// ...essentially css `background-size: cover;`
export const getImageDetailsCover = (
  image: Image,
  imageDims: DimensionsType,
) => {
  const parent = image.getParent()
  const parentWidth = parent.width()
  const parentHeight = parent.height()

  // ratio: less than 1 = portrait, greater than 1 = landscape
  const imageRatio = imageDims.width / imageDims.height
  const artboardRatio = parentWidth / parentHeight
  const imageWidth = parentHeight * imageRatio
  if (artboardRatio <= 1) {
    return {
      height: parentHeight,
      width: imageWidth,
      x: parentWidth / 2 - imageWidth / 2,
      y: 0,
    }
  }
  // if landscape artboard
  const imageHeight = parentWidth / imageRatio
  // if image doesnt fill artboard height
  if (imageHeight < parentHeight) {
    return {
      width: imageWidth,
      height: parentHeight,
      x: parentWidth / 2 - imageWidth / 2,
      y: 0,
    }
  }
  return {
    width: parentWidth,
    height: imageHeight,
    x: 0,
    y: parentHeight / 2 - imageHeight / 2,
  }
}

// restricts a blocks drag to within its parent artboard...
// ...also snaps block to either axis
// for more info on snapping: https://konvajs.org/docs/sandbox/Objects_Snapping.html#page-title
export const handleBlockDragMove = (
  e: KonvaEventObject<DragEvent>,
  width: number,
  height: number,
) => {
  const blockNode = e.target
  const { parent } = e.target
  const layer = e.target.getLayer()
  if (!(blockNode && parent && layer)) return
  const pad = 5
  const snap = 10

  const maxX = parent.width() - width - pad
  const maxY = parent.height() - height - pad
  // get top left point of artboard (compensating for the block itself)
  const parentOrigin = {
    x: parent.width() / 2 - width / 2,
    y: parent.height() / 2 - height / 2,
  }
  const blockOrigin = {
    x: blockNode.position().x,
    y: blockNode.position().y,
  }

  // snaps to center of axis if within snap distance
  const snappedX = snapTo(parentOrigin.x, blockOrigin.x, snap)
  const snappedY = snapTo(parentOrigin.y, blockOrigin.y, snap)

  // prevents block from exceeding pad range
  const boundAndSnappedX = withinMinMax(snappedX, [pad, maxX])
  const boundAndSnappedY = withinMinMax(snappedY, [pad, maxY])

  // guide line to show if block is moved within range
  const verticalLine = new Konva.Line({
    points: [0, -6000, 0, 6000],
    stroke: 'rb(0, 161, 255)',
    strokeWidth: 1,
    name: 'guide-line',
    dash: [4, 6],
  })
  const horizontalLine = new Konva.Line({
    points: [-6000, 0, 6000, 0],
    stroke: 'rb(0, 161, 255)',
    strokeWidth: 1,
    name: 'guide-line',
    dash: [4, 6],
  })
  // destroy any unused guide lines if the below is not met
  layer.find('.guide-line').destroy()
  if (boundAndSnappedX === parentOrigin.x) {
    parent.add(verticalLine)
    verticalLine.position({
      x: parent.width() / 2,
      y: 0,
    })
  }
  if (boundAndSnappedY === parentOrigin.y) {
    parent.add(horizontalLine)
    horizontalLine.position({
      x: 0,
      y: parent.height() / 2,
    })
  }

  // set block position
  blockNode.position({
    x: boundAndSnappedX,
    y: boundAndSnappedY,
  })
  // position state is tracked on dragEnd and not needed here
}

// used within ImageFrame Block to place image in center
export const placeImage = (
  imageRef: React.RefObject<Image>,
  imageDimensions: DimensionsType,
) => {
  if (!imageRef.current) {
    return {
      height: 0,
      width: 0,
      x: 0,
      y: 0,
    }
  }
  const parent = imageRef.current.getParent()
  const parentWidth = parent.width()
  const parentHeight = parent.height()

  const imageRatio = imageDimensions.width / imageDimensions.height
  const imageWidth = parentHeight * imageRatio
  const imageHeight = parentWidth / imageRatio

  if (imageRatio > 1) {
    return {
      height: parentHeight,
      width: imageWidth,
      x: parentWidth / 2 - imageWidth / 2,
      y: 0,
    }
  }
  return {
    height: imageHeight,
    width: parentWidth,
    x: 0,
    y: parentHeight / 2 - imageHeight / 2,
  }
}

export const getCreateOnDragPos = (
  startPos: PositionType,
  stopPos: PositionType,
) => {
  const left = startPos.x < stopPos.x ? startPos.x : stopPos.x
  const top = startPos.y < stopPos.y ? startPos.y : stopPos.y
  return {
    x: left,
    y: top,
  }
}

export const getCreateOnDragDims = (
  startPos: PositionType,
  stopPos: PositionType,
  grid: number,
) => {
  const exactWidth = Math.abs(startPos.x - stopPos.x)
  const exactHeight = Math.abs(startPos.y - stopPos.y)
  return {
    width: Math.round(exactWidth / grid) * grid,
    height: Math.round(exactHeight / grid) * grid,
  }
}
