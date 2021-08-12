import { getCreateOnDragDims, getCreateOnDragPos } from 'Helpers'
import { KonvaEventObject } from 'konva/lib/Node'
import React, { useState } from 'react'
import { Group, Rect } from 'react-konva'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  blockDimsAtom,
  blockIdsAtom,
  blockPosAtom,
  canvasDimsSelector,
  creationDimsAtom,
  creationPosAtom,
  gridSizeAtom,
  isCreatingShapeAtom,
} from 'State'
import { v4 as uuid } from 'uuid'

export const CreationLayer = () => {
  const canvasDims = useRecoilValue(canvasDimsSelector)
  const setBlockIds = useSetRecoilState(blockIdsAtom)
  const gridSize = useRecoilValue(gridSizeAtom)
  const [clickStartPos, setClickStartPos] = useState({ x: 0, y: 0 })
  const [isCreatingShape, setIsCreatingShape] =
    useRecoilState(isCreatingShapeAtom)
  const setCreationPos = useSetRecoilState(creationPosAtom)
  const setCreationDims = useSetRecoilState(creationDimsAtom)
  const [tempDims, setTempDims] = useRecoilState(blockDimsAtom('create'))
  const [tempPos, setTempPos] = useRecoilState(blockPosAtom('create'))

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    setIsCreatingShape(true)
    const pos = e.currentTarget.getRelativePointerPosition()
    setClickStartPos({
      x: Math.round(pos.x / gridSize) * gridSize,
      y: Math.round(pos.y / gridSize) * gridSize,
    })
  }

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!isCreatingShape) return
    const pos = e.currentTarget.getRelativePointerPosition()
    const x = Math.round(pos.x / gridSize) * gridSize
    const y = Math.round(pos.y / gridSize) * gridSize
    setTempDims(getCreateOnDragDims(clickStartPos, { x, y }, gridSize))
    setTempPos(getCreateOnDragPos(clickStartPos, { x, y }))
  }

  const handleMouseUp = (e: KonvaEventObject<MouseEvent>) => {
    setIsCreatingShape(false)
    setTempDims({ width: 0, height: 0 })
    const pos = e.currentTarget.getRelativePointerPosition()
    const exactWidth = Math.abs(pos.x - clickStartPos.x)
    const exactHeight = Math.abs(pos.y - clickStartPos.y)
    // below dims set to nearest grid length with min of of one grid length
    const width = Math.max(
      gridSize,
      Math.round(exactWidth / gridSize) * gridSize,
    )
    const height = Math.max(
      gridSize,
      Math.round(exactHeight / gridSize) * gridSize,
    )
    const x = Math.round(pos.x / gridSize) * gridSize
    const y = Math.round(pos.y / gridSize) * gridSize
    setCreationPos(getCreateOnDragPos(clickStartPos, { x, y }))
    setCreationDims({ width, height })
    const newBlockId = uuid()
    setBlockIds((prevIds) => {
      return [...prevIds, newBlockId]
    })
  }

  return (
    <Group
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Rect width={canvasDims.width} height={canvasDims.height} />
      {isCreatingShape && (
        <Rect
          x={tempPos.x}
          y={tempPos.y}
          stroke="red"
          strokeWidth={3}
          width={tempDims.width}
          height={tempDims.height}
        />
      )}
    </Group>
  )
}
