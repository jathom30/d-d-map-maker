import { KonvaEventObject } from 'konva/lib/Node'
import React, { useEffect } from 'react'
import { Line } from 'react-konva'
import { useRecoilState, useRecoilValue } from 'recoil'
import { creationPointsAtom, linePointsAtom } from 'State'

export const MapShape: React.FC<{ id: string }> = ({ id }) => {
  const [points, setPoints] = useRecoilState(linePointsAtom(id))
  const creationPoints = useRecoilValue(creationPointsAtom)

  useEffect(() => {
    if (!points.length) {
      setPoints(creationPoints)
    }
  }, [points])

  return (
    <Line
      draggable
      points={points}
      stroke="red"
      strokeWidth={5}
      fill="darkgrey"
      closed
    />
  )
}

// TODO : stick to grid on move
