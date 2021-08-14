import React from 'react'
import horizontal from 'Assets/horizontal_wall.png'
import vertical from 'Assets/vertical_wall.png'
import corner from 'Assets/corner_wall.png'
import { useRecoilValue } from 'recoil'
import { blockDimsAtom, gridSizeAtom } from 'State'
import { WallCornerPiece } from 'Components/WallCornerPiece'
import { WallPiece } from '../WallPiece'

export const DungeonWalls: React.FC<{
  id: string
}> = ({ id }) => {
  const { width, height } = useRecoilValue(blockDimsAtom(id))
  const gridSize = useRecoilValue(gridSizeAtom)
  // const parentBlockPos = useRecoilValue(blockPosAtom(id))
  const offset = gridSize / 4
  const repeatWidth = width / gridSize
  const repeatHeight = height / gridSize
  const horizontalWallPos = (top: boolean) =>
    Array.from({ length: repeatWidth - 2 }, (_, i) => ({
      id: `${id}_${top ? 'top' : 'bottom'}_${i}`,
      pos: {
        x: gridSize * (i + 1),
        y: top ? 0 : height,
      },
      // parentPos: {
      //   x: parentBlockPos.x + gridSize * i,
      //   y: parentBlockPos.y + (top ? 0 : height),
      // },
    }))
  const verticalWallPos = (left: boolean) =>
    Array.from({ length: repeatHeight - 2 }, (_, i) => ({
      id: `${id}_${left ? 'left' : 'right'}_${i}`,
      pos: {
        x: left ? 0 : width,
        y: gridSize * (i + 1),
      },
      // parentPos: {
      //   x: parentBlockPos.x + (left ? 0 : width),
      //   y: parentBlockPos.y + gridSize * i,
      // },
    }))

  return (
    <>
      <WallCornerPiece
        id={`${id}_top-left-horz`}
        image={corner}
        orientation="horizontal"
        xAxis="left"
        yAxis="top"
        x={-offset}
        y={-offset}
      />
      <WallCornerPiece
        id={`${id}_top-left-vert`}
        image={corner}
        orientation="vertical"
        xAxis="left"
        yAxis="top"
        x={offset}
        y={gridSize}
      />

      <WallCornerPiece
        id={`${id}_top-right-horz`}
        image={corner}
        orientation="horizontal"
        xAxis="right"
        yAxis="top"
        x={width - gridSize}
        y={-offset}
      />
      <WallCornerPiece
        id={`${id}_top-right-vert`}
        image={corner}
        orientation="vertical"
        xAxis="right"
        yAxis="top"
        x={width - offset}
        y={gridSize}
      />

      <WallCornerPiece
        id={`${id}_bottom-left-horz`}
        image={corner}
        orientation="horizontal"
        xAxis="left"
        yAxis="bottom"
        x={-offset}
        y={height - gridSize + offset}
      />
      <WallCornerPiece
        id={`${id}_bottom-left-vert`}
        image={corner}
        orientation="vertical"
        xAxis="left"
        yAxis="bottom"
        x={offset}
        y={height - gridSize}
      />

      <WallCornerPiece
        id={`${id}_bottom-right-horz`}
        image={corner}
        orientation="horizontal"
        xAxis="right"
        yAxis="bottom"
        x={width - gridSize}
        y={height - gridSize + offset}
      />
      <WallCornerPiece
        id={`${id}_bottom-right-vert`}
        image={corner}
        orientation="vertical"
        xAxis="right"
        yAxis="bottom"
        x={width - offset}
        y={height - gridSize}
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
