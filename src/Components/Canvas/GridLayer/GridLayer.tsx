import React from 'react'
import { Layer, Line } from 'react-konva'
import { useRecoilValue } from 'recoil'
import { gridLinesSelector } from 'State'

export const GridLayer = () => {
  const gridLines = useRecoilValue(gridLinesSelector)
  return (
    <>
      {gridLines.horizontalCoords.map((line, i) => (
        <Line key={i} points={line} stroke="lightgrey" strokeWidth={1} />
      ))}
      {gridLines.verticalCoords.map((line, i) => (
        <Line key={i} points={line} stroke="lightgrey" strokeWidth={1} />
      ))}
    </>
  )
}
