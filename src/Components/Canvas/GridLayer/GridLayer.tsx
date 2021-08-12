import React from 'react'
import { Line } from 'react-konva'
import { useRecoilValue } from 'recoil'
import { gridLinesSelector } from 'State'

export const GridLayer = () => {
  const gridLines = useRecoilValue(gridLinesSelector)
  const boldLines = (coords: number[][]) => {
    return coords.map((coord, i) => {
      if (!(i % 10)) {
        return coord
      }
      return []
    })
  }
  return (
    <>
      {gridLines.horizontalCoords.map((line, i) => (
        <Line key={i} points={line} stroke="gainsboro" strokeWidth={1} />
      ))}
      {gridLines.verticalCoords.map((line, i) => (
        <Line key={i} points={line} stroke="gainsboro" strokeWidth={1} />
      ))}
      {boldLines(gridLines.horizontalCoords).map((line, i) => (
        <Line key={i} points={line} stroke="lightgrey" strokeWidth={2} />
      ))}
      {boldLines(gridLines.verticalCoords).map((line, i) => (
        <Line key={i} points={line} stroke="lightgrey" strokeWidth={2} />
      ))}
    </>
  )
}
