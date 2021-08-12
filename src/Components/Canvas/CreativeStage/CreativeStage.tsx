import { getCenterPos, handleCoverDrag } from 'Helpers'
import Konva from 'konva'
import { KonvaEventObject } from 'konva/lib/Node'
import { Stage as StageType } from 'konva/lib/Stage'
import React, { useRef } from 'react'
import { Layer, Stage, Rect, Group } from 'react-konva'
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilValue,
} from 'recoil'
import {
  blockIdsAtom,
  canDragCanvasAtom,
  canvasDimsSelector,
  selectedToolAtom,
  stageDimsAtom,
} from 'State'
import { Block } from '../Block'
import { CreationLayer } from '../CreationLayer'
import { GridLayer } from '../GridLayer'

export const CreativeStage: React.FC<{
  stageRef: React.RefObject<StageType>
  onZoom: (e: KonvaEventObject<WheelEvent>) => void
}> = ({ stageRef, onZoom }) => {
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE()
  const groupRef = useRef<Konva.Group>(null)
  const canvasDims = useRecoilValue(canvasDimsSelector)
  const stageDims = useRecoilValue(stageDimsAtom)
  const blockIds = useRecoilValue(blockIdsAtom)

  const tool = useRecoilValue(selectedToolAtom)
  const canDragCanvas = useRecoilValue(canDragCanvasAtom)

  return (
    <Stage
      ref={stageRef}
      width={stageDims.width}
      height={stageDims.height}
      onWheel={onZoom}
    >
      <RecoilBridge>
        <Layer>
          <Group
            ref={groupRef}
            height={canvasDims.height}
            width={canvasDims.width}
            x={getCenterPos(stageDims, canvasDims).x}
            y={getCenterPos(stageDims, canvasDims).y}
            draggable={canDragCanvas}
            dragBoundFunc={(pos) => handleCoverDrag(pos, groupRef.current)}
          >
            <GridLayer />
            {tool === 'shape' && <CreationLayer />}
            {blockIds.map((blockId) => (
              <Block key={blockId} id={blockId} />
            ))}
            {/* below rect used as grab handle for parent group */}
            {canDragCanvas && (
              <Rect height={canvasDims.height} width={canvasDims.width} />
            )}
          </Group>
        </Layer>
      </RecoilBridge>
    </Stage>
  )
}
