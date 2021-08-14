import React from 'react'
import horizontal from 'Assets/horizontal_wall.png'
import vertical from 'Assets/vertical_wall.png'
import { useRecoilValue } from 'recoil'
import { blockDimsAtom, blockPosAtom, gridSizeAtom } from 'State'
import { WallPiece } from '../WallPiece'

export const DungeonWalls: React.FC<{
  id: string
}> = ({ id }) => {
  const { width, height } = useRecoilValue(blockDimsAtom(id))
  const gridSize = useRecoilValue(gridSizeAtom)
  const parentBlockPos = useRecoilValue(blockPosAtom(id))
  const offset = gridSize / 4
  const repeatWidth = width / gridSize
  const repeatHeight = height / gridSize
  const horizontalWallPos = (top: boolean) =>
    Array.from({ length: repeatWidth }, (_, i) => ({
      id: `${id}_${top ? 'top' : 'bottom'}_${i}`,
      pos: {
        x: gridSize * i,
        y: top ? 0 : height,
      },
      parentPos: {
        x: parentBlockPos.x + gridSize * i,
        y: parentBlockPos.y + (top ? 0 : height),
      },
    }))
  const verticalWallPos = (left: boolean) =>
    Array.from({ length: repeatHeight }, (_, i) => ({
      id: `${id}_${left ? 'left' : 'right'}_${i}`,
      pos: {
        x: left ? 0 : width,
        y: gridSize * i,
      },
      parentPos: {
        x: parentBlockPos.x + (left ? 0 : width),
        y: parentBlockPos.y + gridSize * i,
      },
    }))

  return (
    <>
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
