import React from 'react'
import horizontal from 'Assets/horizontal_wall.png'
import vertical from 'Assets/vertical_wall.png'
import corner from 'Assets/corner_wall.png'
import { useRecoilValue } from 'recoil'
import {
  blockDimsAtom,
  blockIsDraggingAtom,
  blockPosAtom,
  gridSizeAtom,
} from 'State'
import { WallCornerPiece } from 'Components/WallCornerPiece'
import { WallPiece } from '../WallPiece'

export const DungeonWalls: React.FC<{
  id: string
}> = ({ id }) => {
  const { width, height } = useRecoilValue(blockDimsAtom(id))
  const { x, y } = useRecoilValue(blockPosAtom(id))
  const blockIsDragging = useRecoilValue(blockIsDraggingAtom(id))
  const gridSize = useRecoilValue(gridSizeAtom)
  const offset = gridSize / 4
  const repeatWidth = width / gridSize
  const repeatHeight = height / gridSize
  const horizontalWallPos = (top: boolean) =>
    Array.from({ length: repeatWidth - 2 }, (_, i) => ({
      id: `${id}_${top ? 'top' : 'bottom'}_${i}`,
      pos: {
        x: x + gridSize * (i + 1),
        y: y + (top ? 0 : height),
      },
    }))
  const verticalWallPos = (left: boolean) =>
    Array.from({ length: repeatHeight - 2 }, (_, i) => ({
      id: `${id}_${left ? 'left' : 'right'}_${i}`,
      pos: {
        x: x + (left ? 0 : width),
        y: y + gridSize * (i + 1),
      },
    }))

  if (blockIsDragging) return null
  return (
    <>
      <WallCornerPiece
        id={`${id}_top-left-horz`}
        image={corner}
        orientation="horizontal"
        xAxis="left"
        yAxis="top"
        x={x - offset}
        y={y - offset}
      />
      <WallCornerPiece
        id={`${id}_top-left-vert`}
        image={corner}
        orientation="vertical"
        xAxis="left"
        yAxis="top"
        x={x + offset}
        y={y + gridSize}
      />

      <WallCornerPiece
        id={`${id}_top-right-horz`}
        image={corner}
        orientation="horizontal"
        xAxis="right"
        yAxis="top"
        x={x + width - gridSize}
        y={y - offset}
      />
      <WallCornerPiece
        id={`${id}_top-right-vert`}
        image={corner}
        orientation="vertical"
        xAxis="right"
        yAxis="top"
        x={x + width - offset}
        y={y + gridSize}
      />

      <WallCornerPiece
        id={`${id}_bottom-left-horz`}
        image={corner}
        orientation="horizontal"
        xAxis="left"
        yAxis="bottom"
        x={x - offset}
        y={y + height - gridSize + offset}
      />
      <WallCornerPiece
        id={`${id}_bottom-left-vert`}
        image={corner}
        orientation="vertical"
        xAxis="left"
        yAxis="bottom"
        x={x + offset}
        y={y + height - gridSize}
      />

      <WallCornerPiece
        id={`${id}_bottom-right-horz`}
        image={corner}
        orientation="horizontal"
        xAxis="right"
        yAxis="bottom"
        x={x + width - gridSize}
        y={y + height - gridSize + offset}
      />
      <WallCornerPiece
        id={`${id}_bottom-right-vert`}
        image={corner}
        orientation="vertical"
        xAxis="right"
        yAxis="bottom"
        x={x + width - offset}
        y={y + height - gridSize}
      />

      {horizontalWallPos(true).map((coords) => (
        <WallPiece
          key={coords.id}
          id={coords.id}
          orientation="horizontal"
          image={horizontal}
          x={coords.pos.x}
          y={coords.pos.y - offset}
        />
      ))}
      {horizontalWallPos(false).map((coords) => (
        <WallPiece
          key={coords.id}
          id={coords.id}
          orientation="horizontal"
          image={horizontal}
          x={coords.pos.x}
          y={coords.pos.y - offset}
        />
      ))}
      {verticalWallPos(true).map((coords) => (
        <WallPiece
          key={coords.id}
          id={coords.id}
          orientation="vertical"
          image={vertical}
          x={coords.pos.x - offset}
          y={coords.pos.y}
        />
      ))}
      {verticalWallPos(false).map((coords) => (
        <WallPiece
          key={coords.id}
          id={coords.id}
          orientation="vertical"
          image={vertical}
          x={coords.pos.x - offset}
          y={coords.pos.y}
        />
      ))}
    </>
  )
}

// const filterSide = (
//   sidePos: { pos: PositionType; parentPos: PositionType }[],
// ) => {
//   return sidePos
//   // .filter((overlap) =>
//   //   blockCorners.some((corner) => !onSameCoord(corner, overlap.parentPos)),
//   // )
// }

// const highlightOverlapping = (
//   sidePos: { pos: PositionType; parentPos: PositionType }[],
// ) => {
//   return sidePos.map((wallPos) => {
//     const isOverlapping = overlappingPos.some((overlap) =>
//       onSameCoord(overlap, wallPos.parentPos),
//     )
//     return {
//       ...wallPos.pos,
//       color: isOverlapping ? 'red' : '',
//     }
//   })
// }
