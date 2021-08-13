import React from 'react'
import { Group, Image, Rect } from 'react-konva'
import useImage from 'use-image'
import center from 'Assets/center_wall.png'
import left from 'Assets/left_wall.png'
import right from 'Assets/right_wall.png'
import { useRecoilValue } from 'recoil'
import { blockDimsAtom } from 'State'

export const DungeonWall: React.FC<{
  id: string
  side: 'top' | 'bottom' | 'left' | 'right'
}> = ({ id, side }) => {
  const { width, height } = useRecoilValue(blockDimsAtom(id))
  const [img] = useImage(center, 'anonymous')
  const [leftImg] = useImage(left, 'anonymous')
  const [rightImg] = useImage(right, 'anonymous')
  const imageDims = { height: 10, width: 40 }
  const repeatWidth = Math.floor(width / imageDims.width) - 2
  const repeatHeight = Math.floor(height / imageDims.width) - 2
  switch (side) {
    case 'top':
      return (
        <Group>
          <Image
            image={leftImg}
            width={imageDims.width}
            height={imageDims.height}
          />
          {Array.from({ length: repeatWidth }, (_, index) => (
            <Image
              image={img}
              x={imageDims.width * (index + 1)}
              width={imageDims.width}
              height={imageDims.height}
            />
          ))}
          <Image
            image={rightImg}
            x={width - imageDims.width}
            width={imageDims.width}
            height={imageDims.height}
          />
        </Group>
      )
    case 'bottom':
      return (
        <Group rotation={180} x={width} y={height}>
          <Image
            image={leftImg}
            width={imageDims.width}
            height={imageDims.height}
          />
          {Array.from({ length: repeatWidth }, (_, index) => (
            <Image
              image={img}
              x={imageDims.width * (index + 1)}
              width={imageDims.width}
              height={imageDims.height}
            />
          ))}
          <Image
            image={rightImg}
            x={width - imageDims.width}
            width={imageDims.width}
            height={imageDims.height}
          />
        </Group>
      )
    case 'left':
      return (
        <Group rotation={-90} y={height}>
          <Image
            image={leftImg}
            width={imageDims.width}
            height={imageDims.height}
          />
          {Array.from({ length: repeatHeight }, (_, index) => (
            <Image
              image={img}
              x={imageDims.width * (index + 1)}
              width={imageDims.width}
              height={imageDims.height}
            />
          ))}
          <Image
            image={rightImg}
            x={height - imageDims.width}
            width={imageDims.width}
            height={imageDims.height}
          />
        </Group>
      )
    case 'right':
      return (
        <Group rotation={90} x={width}>
          <Image
            image={leftImg}
            width={imageDims.width}
            height={imageDims.height}
          />
          {Array.from({ length: repeatHeight }, (_, index) => (
            <Image
              image={img}
              x={imageDims.width * (index + 1)}
              width={imageDims.width}
              height={imageDims.height}
            />
          ))}
          <Image
            image={rightImg}
            x={height - imageDims.width}
            width={imageDims.width}
            height={imageDims.height}
          />
        </Group>
      )
    default:
      return <Rect />
  }
}
