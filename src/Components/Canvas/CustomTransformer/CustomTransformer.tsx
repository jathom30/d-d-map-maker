import React from 'react'
import { getGridPosition, onGrid } from 'Helpers'
import { KonvaEventObject } from 'konva/lib/Node'
import { Rect, Group } from 'react-konva'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  blockDimsAtom,
  canvasDimsSelector,
  gridSizeAtom,
  selectedBlockIdsAtom,
  selectedPosSelector,
} from 'State'
import './CustomTransformer.scss'
import { SelectedBlock } from '../SelectedBlock'

export const CustomTransformer = () => {
  // const tempId = ''
  const selectedIds = useRecoilValue(selectedBlockIdsAtom)
  const [{ x, y, width, height }, setPos] = useRecoilState(selectedPosSelector)
  const setDims = useSetRecoilState(blockDimsAtom(selectedIds[0]))
  const canvasDims = useRecoilValue(canvasDimsSelector)
  const gridSize = useRecoilValue(gridSizeAtom)
  const handleSize = gridSize / 2
  const centerOfHandle = handleSize / 2

  const handleResize = (e: KonvaEventObject<DragEvent | TouchEvent>) => {
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
  }

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    const pos = e.currentTarget.position()
    setPos({ ...pos, width, height })
  }

  return (
    <Group
      x={x}
      y={y}
      draggable
      onDragMove={handleDragGroup}
      onDragEnd={handleDragEnd}
    >
      <Rect width={width} height={height} stroke="orange" strokeWidth={3} />
      {selectedIds.map((id) => (
        <SelectedBlock key={id} id={id} />
      ))}
      {selectedIds.length === 1 && (
        <Rect
          name="bottom-right"
          width={handleSize}
          height={handleSize}
          x={width - handleSize / 2}
          y={height - handleSize / 2}
          fill="orange"
          draggable
          onDragMove={handleResize}
          onTouchMove={handleResize}
        />
      )}
    </Group>
  )
}
