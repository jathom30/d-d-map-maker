import { getGridPosition } from 'Helpers'
import { KonvaEventObject } from 'konva/lib/Node'
import React, { useEffect } from 'react'
import { Rect } from 'react-konva'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  blockDimsAtom,
  blockPosAtom,
  canvasDimsSelector,
  creationDimsAtom,
  creationPosAtom,
  gridSizeAtom,
} from 'State'

export const Block: React.FC<{ id: string }> = ({ id }) => {
  const [{ width, height }, setDims] = useRecoilState(blockDimsAtom(id))
  const [{ x, y }, setPos] = useRecoilState(blockPosAtom(id))

  const gridSize = useRecoilValue(gridSizeAtom)
  const canvasDims = useRecoilValue(canvasDimsSelector)
  const creationPos = useRecoilValue(creationPosAtom)
  const creationDims = useRecoilValue(creationDimsAtom)

  const handleClick = (e: KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true
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
    <Rect
      onClick={handleClick}
      width={width}
      height={height}
      x={x}
      y={y}
      fill="lightgreen"
      draggable
      onDragMove={(e) => {
        const currentPos = e.currentTarget.position()
        e.currentTarget.position(
          getGridPosition(currentPos, { width, height }, gridSize, canvasDims),
        )
      }}
      onDragEnd={(e) => {
        const currentPos = e.currentTarget.position()
        setPos(currentPos)
      }}
    />
  )
}
