import { PositionType } from 'Types'

export const onSameCoord = (pos1: PositionType, pos2: PositionType) =>
  pos1.x === pos2.x && pos1.y === pos2.y
