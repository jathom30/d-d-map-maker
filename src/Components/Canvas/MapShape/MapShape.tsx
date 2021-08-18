import { fixPointToGrid, isInArray } from 'Helpers'
import { KonvaEventObject } from 'konva/lib/Node'
import React, { useEffect } from 'react'
import { Line } from 'react-konva'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  creationPointsAtom,
  creationPosAtom,
  gridSizeAtom,
  isSelectedSelector,
  linePointsAtom,
  linePosAtom,
  selectedLineIdsAtom,
} from 'State'

export const MapShape: React.FC<{ id: string }> = ({ id }) => {
  const [points, setPoints] = useRecoilState(linePointsAtom(id))
  const [{ x, y }, setPos] = useRecoilState(linePosAtom(id))
  const gridSize = useRecoilValue(gridSizeAtom)
  const creationPoints = useRecoilValue(creationPointsAtom)
  const creationPos = useRecoilValue(creationPosAtom)

  const setSelectedLineIds = useSetRecoilState(selectedLineIdsAtom)
  const isSelected = useRecoilValue(isSelectedSelector(id))

  useEffect(() => {
    if (!points.length) {
      setPoints(creationPoints)
    }
    if (y < 0 && x < 0) {
      setPos(creationPos)
    }
  }, [points])

  const handleDragMove = (e: KonvaEventObject<DragEvent | TouchEvent>) => {
    const fixedPosition = fixPointToGrid(e.target.position(), gridSize)
    e.target.position(fixedPosition)
  }

  const handleClick = (e: KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true
    if (e.evt.shiftKey) {
      setSelectedLineIds((prevSelected) => {
        if (isInArray(prevSelected, id)) {
          return prevSelected.filter((selected) => selected !== id)
        }
        return [...prevSelected, id]
      })
      return
    }
    setSelectedLineIds([id])
  }

  return (
    <Line
      onDragMove={handleDragMove}
      onTouchMove={handleDragMove}
      onClick={handleClick}
      onTap={handleClick}
      draggable
      points={points}
      stroke={isSelected ? 'orange' : ''}
      strokeWidth={5}
      fill="darkgrey"
      closed
    />
  )
}
