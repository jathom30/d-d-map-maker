import { getGridPosition, isInArray } from 'Helpers'
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
  isSelectedSelector,
  selectedBlockIdsAtom,
} from 'State'
import { DungeonWalls } from '../DungeonWalls'

export const Block: React.FC<{ id: string }> = ({ id }) => {
  const [{ width, height }, setDims] = useRecoilState(blockDimsAtom(id))
  const [{ x, y }, setPos] = useRecoilState(blockPosAtom(id))
  const isCreatingShape = useRecoilValue(isCreatingShapeAtom)

  const gridSize = useRecoilValue(gridSizeAtom)
  const canvasDims = useRecoilValue(canvasDimsSelector)
  const creationPos = useRecoilValue(creationPosAtom)
  const creationDims = useRecoilValue(creationDimsAtom)

  const setSelectedBlockIds = useSetRecoilState(selectedBlockIdsAtom)
  const isSelected = useRecoilValue(isSelectedSelector(id))

  const handleClick = (e: KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true
    if (e.evt.shiftKey) {
      setSelectedBlockIds((prevSelected) => {
        if (isInArray(prevSelected, id)) {
          return prevSelected.filter((selected) => selected !== id)
        }
        return [...prevSelected, id]
      })
      return
    }
    setSelectedBlockIds([id])
  }

  const handleMove = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    const currentPos = e.currentTarget.position()
    e.currentTarget.position(
      getGridPosition(currentPos, { width, height }, gridSize, canvasDims),
    )
    setPos(getGridPosition(currentPos, { width, height }, gridSize, canvasDims))
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
      draggable
    >
      <Rect
        width={width}
        height={height}
        fill="darkgrey"
        listening={!isCreatingShape}
        onClick={handleClick}
        onTap={handleClick}
        stroke="orange"
        strokeWidth={isSelected ? 1 : 0}
      />
      <DungeonWalls id={id} />
    </Group>
  )
}
