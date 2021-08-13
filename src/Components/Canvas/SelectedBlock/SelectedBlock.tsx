import { isInArray } from 'Helpers'
import { KonvaEventObject } from 'konva/lib/Node'
import React from 'react'
import { Group, Rect } from 'react-konva'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  blockDimsAtom,
  isCreatingShapeAtom,
  selectedBlockIdsAtom,
  selectedBlockPosSelector,
} from 'State'
import './SelectedBlock.scss'

export const SelectedBlock: React.FC<{ id: string }> = ({ id }) => {
  const { width, height } = useRecoilValue(blockDimsAtom(id))
  const { x, y } = useRecoilValue(selectedBlockPosSelector(id))
  const isCreatingShape = useRecoilValue(isCreatingShapeAtom)

  const setSelectedBlockIds = useSetRecoilState(selectedBlockIdsAtom)

  const handleClick = (e: KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true
    setSelectedBlockIds((prevSelected) => {
      if (isInArray(prevSelected, id)) {
        return prevSelected.filter((selected) => selected !== id)
      }
      return [...prevSelected, id]
    })
  }

  return (
    <Group x={x} y={y}>
      <Rect
        width={width}
        height={height}
        fill="lightgreen"
        listening={!isCreatingShape}
        onClick={handleClick}
        onTap={handleClick}
        stroke="orange"
        strokeWidth={1}
      />
    </Group>
  )
}
