import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useResizeObserver from '@react-hook/resize-observer'
import { Button, FlexBox } from 'component-library'
import { CreativeStage } from 'Components/Canvas/CreativeStage/CreativeStage'
import { Sidebar, ToolSelection } from 'Components/UI'
import React, { useEffect, useRef, useState } from 'react'
import './theme.css'
import './App.scss'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  canDragCanvasAtom,
  playerIdsAtom,
  selectedToolAtom,
  stageDimsAtom,
} from 'State'
import { KonvaEventObject } from 'konva/lib/Node'
import { handleZoom } from 'Helpers'
import Konva from 'konva'
import { v4 as uuid } from 'uuid'

function App() {
  const setPlayerIds = useSetRecoilState(playerIdsAtom)
  const setStageDims = useSetRecoilState(stageDimsAtom)
  const stageContainerRef = useRef<HTMLDivElement>(null)
  // gets dimensions of stage
  useResizeObserver(stageContainerRef, (entry) =>
    setStageDims(entry.contentRect),
  )
  const tool = useRecoilValue(selectedToolAtom)
  const canDragCanvas = useRecoilValue(canDragCanvasAtom)
  const [isInMobile, setIsInMobile] = useState(false)

  useEffect(() => {
    const handleBrowserResize = () => {
      setIsInMobile(window.innerWidth <= 500)
    }
    window.addEventListener('resize', handleBrowserResize)
    return () => window.removeEventListener('resize', handleBrowserResize)
  }, [])

  const stageRef = useRef<Konva.Stage>(null)
  // future zoom stage will be needed as click to zoom is added
  const handleZoomSet = (e: KonvaEventObject<WheelEvent>) => {
    if (!stageRef.current) return
    handleZoom(e, stageRef.current)
  }

  const handleAddPlayerToken = () => {
    setPlayerIds((prevIds) => [...prevIds, uuid()])
  }

  return (
    <div
      className={`App ${
        canDragCanvas || tool === 'grab' ? 'App--is-dragging' : ''
      } ${tool === 'shape' ? 'App--is-creating' : ''}`}
    >
      <Sidebar
        elements={<ToolSelection isInMobile={isInMobile} />}
        footer={
          <FlexBox flexDirection={isInMobile ? 'row' : 'column'}>
            <Button
              iconLeft={<FontAwesomeIcon icon={faUserPlus} />}
              onClick={handleAddPlayerToken}
            />
          </FlexBox>
        }
      />
      <div ref={stageContainerRef} className="App__stage">
        <CreativeStage stageRef={stageRef} onZoom={handleZoomSet} />
      </div>
    </div>
  )
}

export default App
