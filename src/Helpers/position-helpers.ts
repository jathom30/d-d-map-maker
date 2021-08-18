import { PositionType } from 'Types'

export const onSameCoord = (pos1: PositionType, pos2: PositionType) =>
  pos1.x === pos2.x && pos1.y === pos2.y

export const pointsToPositions = (points: number[]) =>
  points.reduce((acc: PositionType[], coord, i) => {
    if (i % 2 === 0) {
      return [...acc, { x: coord, y: points[i + 1] }]
    }
    return acc
  }, [])
