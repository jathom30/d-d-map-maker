import { KonvaEventObject } from 'konva/lib/Node'
import { Stage } from 'konva/lib/Stage'
import { PositionType } from 'Types'

// based on konva docs: https://konvajs.org/docs/sandbox/Zooming_Relative_To_Pointer.html#page-title
export const basicZoom = (
  stage: Stage,
  scaleBy: number,
  point: PositionType,
  zoomIn: boolean,
) => {
  const oldScale = stage.scaleX()
  const scalePointTo = {
    x: (point.x - stage.x()) / oldScale,
    y: (point.y - stage.y()) / oldScale,
  }

  const newScale = zoomIn ? oldScale * scaleBy : oldScale / scaleBy
  stage.scale({ x: newScale, y: newScale })
  const newPos = {
    x: point.x - scalePointTo.x * newScale,
    y: point.y - scalePointTo.y * newScale,
  }
  stage.position(newPos)
  stage.batchDraw()
  return stage.getAbsoluteScale()
}

export const handleZoom = (e: KonvaEventObject<WheelEvent>, stage: Stage) => {
  const pointer = stage.getPointerPosition() || { x: 0, y: 0 }
  const zoomingIn = e.evt.deltaY > 0
  const min = 0.1
  // scale of 1 is the lowest zoom setting...
  // ...if scale is 1 or less while zooming out...
  // ...return so no negative zoom occurs
  if (stage.getAbsoluteScale().y <= min && !zoomingIn) return { x: min, y: min }

  return basicZoom(stage, 1.01, pointer, zoomingIn)
}

// ----------------------- multi touch helpers
export const getDistance = (p1: PositionType, p2: PositionType) =>
  Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2)

export const getCenter = (p1: PositionType, p2: PositionType) => ({
  x: (p1.x + p2.x) / 2,
  y: (p1.y + p2.y) / 2,
})

// TODO pinch zoom: https://konvajs.org/docs/sandbox/Multi-touch_Scale_Stage.html
