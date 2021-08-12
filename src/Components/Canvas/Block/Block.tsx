import { getGridPosition } from 'Helpers'
import { KonvaEventObject } from 'konva/lib/Node'
import React, { useEffect } from 'react'
import { Group, Rect } from 'react-konva'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  blockDimsAtom,
  blockPosAtom,
  canvasDimsSelector,
  creationDimsAtom,
  creationPosAtom,
  gridSizeAtom,
  isCreatingShapeAtom,
  selectedBlockIdAtom,
} from 'State'
import { CustomTransformer } from '../CustomTransformer'

export const Block: React.FC<{ id: string }> = ({ id }) => {
  const [{ width, height }, setDims] = useRecoilState(blockDimsAtom(id))
  const [{ x, y }, setPos] = useRecoilState(blockPosAtom(id))
  const isCreatingShape = useRecoilValue(isCreatingShapeAtom)

  const gridSize = useRecoilValue(gridSizeAtom)
  const canvasDims = useRecoilValue(canvasDimsSelector)
  const creationPos = useRecoilValue(creationPosAtom)
  const creationDims = useRecoilValue(creationDimsAtom)

  const setSelectedBlockId = useSetRecoilState(selectedBlockIdAtom)

  const handleClick = (e: KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true
    setSelectedBlockId((prevSelected) => {
      if (prevSelected === id) {
        return ''
      }
      return id
    })
  }

  const handleMove = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    const currentPos = e.currentTarget.position()
    e.currentTarget.position(
      getGridPosition(currentPos, { width, height }, gridSize, canvasDims),
    )
  }

  const handleMoveEnd = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    const currentPos = e.currentTarget.position()
    setPos(currentPos)
  }

  useEffect(() => {
    // if pos and dims are still default (-1); update
    if (y < 0 && x < 0) {
      setPos(creationPos)
    }
    if (width < 0 && height < 0) {
      setDims(creationDims)
    }
  }, [x, y, width, height])

  return (
    <Group
      x={x}
      y={y}
      onTouchMove={handleMove}
      onDragMove={handleMove}
      onTouchEnd={handleMoveEnd}
      onDragEnd={handleMoveEnd}
      draggable
    >
      <Rect
        width={width}
        height={height}
        fill="lightgreen"
        listening={!isCreatingShape}
        onClick={handleClick}
        onTap={handleClick}
      />
    </Group>
  )
}
