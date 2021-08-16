import { fixPointToGrid, onSameCoord } from 'Helpers'
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
    </Group>
  )
}
