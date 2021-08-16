import { fixPointToGrid, onGrid } from 'Helpers'
import { KonvaEventObject } from 'konva/lib/Node'
import React, { useEffect } from 'react'
import { Line } from 'react-konva'
import { useRecoilState, useRecoilValue } from 'recoil'
import { creationPointsAtom, gridSizeAtom, linePointsAtom } from 'State'

export const MapShape: React.FC<{ id: string }> = ({ id }) => {
  const [points, setPoints] = useRecoilState(linePointsAtom(id))
  const gridSize = useRecoilValue(gridSizeAtom)
  const creationPoints = useRecoilValue(creationPointsAtom)

  useEffect(() => {
    if (!points.length) {
      setPoints(creationPoints)
    }
  }, [points])

  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    const fixedPosition = fixPointToGrid(e.target.position(), gridSize)
    e.target.position(fixedPosition)
  }

  return (
    <Line
      onDragMove={handleDragMove}
      draggable
      points={points}
      stroke="red"
      strokeWidth={5}
      fill="darkgrey"
      closed
    />
  )
}
