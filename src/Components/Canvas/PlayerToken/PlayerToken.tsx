import React from 'react'
import { Circle } from 'react-konva'
import { useRecoilState } from 'recoil'
import { playerPosAtom } from 'State'

export const PlayerToken: React.FC<{ id: string }> = ({ id }) => {
  const [{ x, y }, setPos] = useRecoilState(playerPosAtom(id))
  return (
    <Circle
      radius={10}
      x={x}
      y={y}
      fill="red"
      draggable
      onDragEnd={(e) => setPos(e.currentTarget.position())}
    />
  )
}

// TODO look into drawing shapes as polygons; + - like illustrator
