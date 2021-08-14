import React, { useState } from 'react'
import { Group, Image, Rect } from 'react-konva'
import { useRecoilState, useRecoilValue } from 'recoil'
import { selectedToolAtom, wallBlockIsVisibleAtom } from 'State'
import useImage from 'use-image'

export const WallPiece: React.FC<{
  id: string
  image: string
  orientation: 'vertical' | 'horizontal'
  x: number
  y: number
}> = ({ id, image, orientation, x, y }) => {
  const [isVisible, setIsVisible] = useRecoilState(wallBlockIsVisibleAtom(id))
  const tool = useRecoilValue(selectedToolAtom)
  const [img] = useImage(image, 'anonymous')
  const dims =
    orientation === 'horizontal'
      ? { height: 20, width: 40 }
      : { height: 40, width: 20 }

  return (
    <Group x={x} y={y}>
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
