import { getGridPosition, onGrid } from 'Helpers'
import { KonvaEventObject } from 'konva/lib/Node'
import React from 'react'
import { Rect, Group } from 'react-konva'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  blockDimsAtom,
  blockPosAtom,
  canvasDimsSelector,
  gridSizeAtom,
  selectedBlockIdAtom,
} from 'State'
import './CustomTransformer.scss'

export const CustomTransformer: React.FC<{ id: string }> = ({ id }) => {
  const [{ width, height }, setDims] = useRecoilState(blockDimsAtom(id))
  const setSelected = useSetRecoilState(selectedBlockIdAtom)
  const [{ x, y }, setPos] = useRecoilState(blockPosAtom(id))
  const canvasDims = useRecoilValue(canvasDimsSelector)
  const gridSize = useRecoilValue(gridSizeAtom)
  const handleSize = gridSize / 2
  const centerOfHandle = handleSize / 2

  const handleResizeBottomRight = (
    e: KonvaEventObject<DragEvent | TouchEvent>,
  ) => {
    // get distance to center of handle

    // active axis needed to be offset by center of handle after applied to grid
    const gridPos = {
      x: Math.max(gridSize, onGrid(e.currentTarget.x(), gridSize)),
      y: Math.max(gridSize, onGrid(e.currentTarget.y(), gridSize)),
    }
    e.currentTarget.position({
      x: gridPos.x - centerOfHandle,
      y: gridPos.y - centerOfHandle,
    })
    // resize block to distance of handle
    setDims({
      width: gridPos.x,
      height: gridPos.y,
    })
  }

  const handleDragGroup = (e: KonvaEventObject<DragEvent>) => {
    const currentPos = e.currentTarget.position()
    const gridPos = getGridPosition(
      currentPos,
      { width, height },
      gridSize,
      canvasDims,
    )
    e.currentTarget.position(gridPos)
    setPos(gridPos)
  }

  return (
    <Group x={x} y={y} draggable onDragMove={handleDragGroup}>
      <Rect
        width={width}
        height={height}
        stroke="orange"
        strokeWidth={3}
        onClick={() => setSelected('')}
        onTap={() => setSelected('')}
      />
      <Rect
        name="bottom-right"
        width={handleSize}
        height={handleSize}
        x={width - handleSize / 2}
        y={height - handleSize / 2}
        fill="orange"
        draggable
        onDragMove={handleResizeBottomRight}
        onTouchMove={handleResizeBottomRight}
      />
    </Group>
  )
}
