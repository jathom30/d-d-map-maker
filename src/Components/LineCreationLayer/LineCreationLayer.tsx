import { fixPointToGrid, onGrid, onSameCoord } from 'Helpers'
import { KonvaEventObject } from 'konva/lib/Node'
import React, { useState } from 'react'
import { Group, Line, Rect } from 'react-konva'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  canvasDimsSelector,
  creationPointsAtom,
  gridSizeAtom,
  lineIdsAtom,
} from 'State'
import { PositionType } from 'Types'
import { v4 as uuid } from 'uuid'

export const LineCreationLayer = () => {
  const canvasDims = useRecoilValue(canvasDimsSelector)
  const gridSize = useRecoilValue(gridSizeAtom)
  const [currentLine, setCurrentLine] = useState<PositionType[]>([])
  const setLineIds = useSetRecoilState(lineIdsAtom)
  const [isCreating, setIsCreating] = useState(false)
  const setCreationPoints = useSetRecoilState(creationPointsAtom)

  const handleClick = (e: KonvaEventObject<MouseEvent>) => {
    setIsCreating(true)
    const pos = fixPointToGrid(
      e.currentTarget.getRelativePointerPosition(),
      gridSize,
    )
    if (currentLine.some((point) => onSameCoord(point, pos))) {
      setIsCreating(false)
      setLineIds((prevIds) => [...prevIds, uuid()])
      setCreationPoints(currentLine.map((coord) => [coord.x, coord.y]).flat())
      return
    }
    setCurrentLine((prevLine) => [...prevLine, pos])
  }

  const handlePointMove = (e: KonvaEventObject<DragEvent>, index: number) => {
    console.log('dragging', index)
    const posOnGrid = fixPointToGrid(e.target.position(), gridSize)
    const posOffset = {
      x: posOnGrid.x - gridSize / 4,
      y: posOnGrid.y - gridSize / 4,
    }
    e.target.position(posOffset)
    setCurrentLine((prevPoints) => {
      const newPoints = [...prevPoints]
      newPoints[index] = posOnGrid
      return newPoints
    })
  }

  const points = currentLine.map((coord) => [coord.x, coord.y]).flat()

  return (
    <Group onClick={handleClick}>
      <Rect width={canvasDims.width} height={canvasDims.height} />
      <Line
        points={points}
        stroke="red"
        strokeWidth={5}
        closed={!isCreating}
        fill="orange"
      />
      {currentLine.map((coord, i) => (
        <Rect
          key={i}
          x={coord.x - gridSize / 4}
          y={coord.y - gridSize / 4}
          stroke="red"
          fill="white"
          width={gridSize / 2}
          height={gridSize / 2}
          onDragMove={(e) => handlePointMove(e, i)}
          draggable
        />
      ))}
    </Group>
  )
}
