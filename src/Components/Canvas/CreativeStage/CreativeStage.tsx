import { LineCreationLayer } from 'Components/LineCreationLayer'
import { getCenterPos, handleCoverDrag } from 'Helpers'
import Konva from 'konva'
import { KonvaEventObject } from 'konva/lib/Node'
import { Stage as StageType } from 'konva/lib/Stage'
import React, { Fragment, useRef } from 'react'
import { Layer, Stage, Rect, Group } from 'react-konva'
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilValue,
} from 'recoil'
import {
  blockIdsAtom,
  canDragCanvasAtom,
  canvasDimsSelector,
  lineIdsAtom,
  playerIdsAtom,
  selectedBlockIdsAtom,
  selectedLineIdsAtom,
  selectedToolAtom,
  stageDimsAtom,
} from 'State'
import { Block } from '../Block'
import { CreationLayer } from '../CreationLayer'
import { CustomTransformer } from '../CustomTransformer'
import { DungeonWalls } from '../DungeonWalls'
import { GridLayer } from '../GridLayer'
import { LineTransformer } from '../LineTransformer'
import { MapShape } from '../MapShape'
import { PlayerToken } from '../PlayerToken'

export const CreativeStage: React.FC<{
  stageRef: React.RefObject<StageType>
  onZoom: (e: KonvaEventObject<WheelEvent>) => void
}> = ({ stageRef, onZoom }) => {
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE()
  const groupRef = useRef<Konva.Group>(null)
  const canvasDims = useRecoilValue(canvasDimsSelector)
  const stageDims = useRecoilValue(stageDimsAtom)
  const blockIds = useRecoilValue(blockIdsAtom)
  const lineIds = useRecoilValue(lineIdsAtom)
  const playerIds = useRecoilValue(playerIdsAtom)

  const selectedBlocks = useRecoilValue(selectedBlockIdsAtom)
  const selectedLines = useRecoilValue(selectedLineIdsAtom)

  const tool = useRecoilValue(selectedToolAtom)
  const canDragCanvas = useRecoilValue(canDragCanvasAtom)

  const canDrag = canDragCanvas || tool === 'grab'

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
            draggable={canDrag}
            dragBoundFunc={(pos) => handleCoverDrag(pos, groupRef.current)}
          >
            <GridLayer />
            {blockIds
              .filter(
                (blockId) =>
                  !selectedBlocks.some(
                    (selectedBlock) => selectedBlock === blockId,
                  ),
              )
              .map((blockId) => (
                <Fragment key="blockId">
                  <Block id={blockId} />
                  <DungeonWalls id={blockId} />
                </Fragment>
              ))}
            {lineIds
              .filter(
                (lineId) =>
                  !selectedLines.some(
                    (selectedLine) => selectedLine === lineId,
                  ),
              )
              .map((id) => (
                <MapShape id={id} />
              ))}
            {(tool === 'shape' || tool === 'select') && <CreationLayer />}
            {tool === 'pen' && <LineCreationLayer />}
            {!!selectedBlocks.length && <CustomTransformer />}
            {!!selectedLines.length && <LineTransformer />}
            {playerIds.map((id) => (
              <PlayerToken key={id} id={id} />
            ))}
            {/* below rect used as grab handle for parent group */}
            {canDrag && (
              <Rect height={canvasDims.height} width={canvasDims.width} />
            )}
          </Group>
        </Layer>
      </RecoilBridge>
    </Stage>
  )
}
