import { getGridPosition, handleBlockDragMove, handleCoverDrag } from 'Helpers'
import Konva from 'konva'
import { KonvaEventObject } from 'konva/lib/Node'
import { Stage as StageType } from 'konva/lib/Stage'
import React, { useRef } from 'react'
import { Layer, Stage, Rect, Group } from 'react-konva'
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilValue,
} from 'recoil'
import { canvasDimsSelector, gridSizeAtom, stageDimsAtom } from 'State'
import { GridLayer } from '../GridLayer'

export const CreativeStage: React.FC<{
  stageRef: React.RefObject<StageType>
  onZoom: (e: KonvaEventObject<WheelEvent>) => void
}> = ({ stageRef, onZoom }) => {
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE()
  const groupRef = useRef<Konva.Group>(null)
  const canvasDims = useRecoilValue(canvasDimsSelector)
  const stageDims = useRecoilValue(stageDimsAtom)
  const gridSize = useRecoilValue(gridSizeAtom)

  const testRectPosDims = () => {
    const width = 400
    const height = 400
    const x = canvasDims.width / 2 - width / 2
    const y = canvasDims.height / 2 - height / 2

    const gridPos = getGridPosition(
      { x, y },
      { width, height },
      gridSize,
      canvasDims,
    )
    return {
      width,
      height,
      ...gridPos,
    }
  }

  const testRectRef = useRef<Konva.Rect>(null)

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
            x={stageDims.width / 2 - canvasDims.width / 2}
            y={stageDims.height / 2 - canvasDims.height / 2}
            draggable
            dragBoundFunc={(pos) => handleCoverDrag(pos, groupRef.current)}
          >
            <GridLayer />
            {/* below rect used as grab handle for parent group */}
            <Rect height={canvasDims.height} width={canvasDims.width} />
            {/* test rect */}
            <Rect
              ref={testRectRef}
              height={testRectPosDims().height}
              width={testRectPosDims().width}
              x={testRectPosDims().x}
              y={testRectPosDims().y}
              fill="orange"
              stroke="coral"
              strokeWidth={4}
              draggable
              onDragMove={(e) => {
                const currentPos = e.currentTarget.position()
                e.currentTarget.position(
                  getGridPosition(
                    currentPos,
                    {
                      width: testRectPosDims().width,
                      height: testRectPosDims().height,
                    },
                    gridSize,
                    canvasDims,
                  ),
                )
              }}
            />
          </Group>
        </Layer>
      </RecoilBridge>
    </Stage>
  )
}
