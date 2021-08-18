import { fixPointToGrid } from 'Helpers'
import { KonvaEventObject } from 'konva/lib/Node'
import React, { Fragment } from 'react'
import { Group, Line, Rect } from 'react-konva'
import { useRecoilState, useRecoilValue } from 'recoil'
import { gridSizeAtom, selectedLinesSelector } from 'State'

export const LineTransformer = () => {
  const [selectedPoints, setSelectedPoints] = useRecoilState(
    selectedLinesSelector,
  )
  const gridSize = useRecoilValue(gridSizeAtom)
  const handleSize = gridSize / 2
  const offset = handleSize / 2

  const handleDragMoveHandle = (
    e: KonvaEventObject<DragEvent>,
    id: string,
    index: number,
  ) => {
    const currentPos = e.target.position()
    const offsetToGrid = {
      x: fixPointToGrid(currentPos, gridSize).x - offset,
      y: fixPointToGrid(currentPos, gridSize).y - offset,
    }
    e.target.position(offsetToGrid)

    setSelectedPoints((prevPoints) => {
      const pointIndex = prevPoints.findIndex((point) => point.id === id)
      const newPoints = [...prevPoints]
      newPoints[pointIndex] = {
        ...newPoints[pointIndex],
      }
      return newPoints
    })
  }

  return (
    <Group draggable>
      {selectedPoints.map((selected) => (
        <Fragment key={selected.id}>
          <Line points={selected.points} fill="lightgreen" closed />
          {selected.coords.map((coord, i) => (
            <Rect
              key={i}
              x={coord.x - offset}
              y={coord.y - offset}
              stroke="black"
              fill="white"
              width={handleSize}
              height={handleSize}
              draggable
              onDragMove={(e) => handleDragMoveHandle(e, selected.id, i)}
            />
          ))}
        </Fragment>
      ))}
    </Group>
  )
}
