import React from 'react'
import { Group, Image, Rect } from 'react-konva'
import { useRecoilState, useRecoilValue } from 'recoil'
import { selectedToolAtom, wallBlockIsVisibleAtom } from 'State'
import useImage from 'use-image'

interface VerticalPiece {}

type WallCornerPieceType = {
  id: string
  image: string
  x: number
  y: number
  orientation: 'vertical' | 'horizontal'
  xAxis: 'left' | 'right'
  yAxis: 'top' | 'bottom'
}

export const WallCornerPiece: React.FC<WallCornerPieceType> = ({
  id,
  image,
  orientation,
  xAxis,
  yAxis,
  x,
  y,
}) => {
  const [isVisible, setIsVisible] = useRecoilState(wallBlockIsVisibleAtom(id))
  const tool = useRecoilValue(selectedToolAtom)
  const [img] = useImage(image, 'anonymous')
  const dims = { height: 20, width: 50 }
  const finalY = orientation === 'horizontal' ? y + dims.height : y
  const flipY = [
    orientation === 'horizontal' && yAxis === 'top',
    orientation === 'vertical' && xAxis === 'left',
  ]
  const flipX = [orientation === 'vertical' && yAxis === 'bottom']
  const scaleY = flipY.some((i) => i) ? -1 : 1
  const scaleX = flipX.some((i) => i) ? -1 : 1
  const rotation = orientation === 'vertical' ? -90 : 0

  return (
    <Group x={x} y={finalY} scaleY={scaleY} scaleX={scaleX} rotation={rotation}>
      <Image
        image={img}
        width={dims.width}
        height={dims.height}
        opacity={isVisible ? 1 : 0}
      />
      {tool === 'remove' && (
        <Rect
          width={dims.width}
          height={dims.height}
          fill={isVisible ? 'red' : 'blue'}
          opacity={0.35}
          onClick={() => setIsVisible(!isVisible)}
        />
      )}
    </Group>
  )
}
