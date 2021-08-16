import {
  faArrowsAlt,
  faEraser,
  faHandPointer,
  faMousePointer,
  faObjectGroup,
  faPenFancy,
  faSquareFull,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useResizeObserver from '@react-hook/resize-observer'
import { Button, FlexBox, Spacer } from 'component-library'
import { CreativeStage } from 'Components/Canvas/CreativeStage/CreativeStage'
import { Sidebar } from 'Components/UI'
import React, { useEffect, useRef, useState } from 'react'
import './theme.css'
import './App.scss'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  canDragCanvasAtom,
  playerIdsAtom,
  selectedToolAtom,
  stageDimsAtom,
} from 'State'
import { KonvaEventObject } from 'konva/lib/Node'
import { handleZoom } from 'Helpers'
import Konva from 'konva'
import { useKeyboardShortcuts } from 'Hooks'
import { v4 as uuid } from 'uuid'

function App() {
  const [isInMobile, setIsInMobile] = useState(false)
  const setPlayerIds = useSetRecoilState(playerIdsAtom)
  const setStageDims = useSetRecoilState(stageDimsAtom)
  const stageContainerRef = useRef<HTMLDivElement>(null)
  // gets dimensions of stage
  useResizeObserver(stageContainerRef, (entry) =>
    setStageDims(entry.contentRect),
  )

  useEffect(() => {
    const handleBrowserResize = () => {
      setIsInMobile(window.innerWidth <= 500)
    }
    window.addEventListener('resize', handleBrowserResize)
    return () => window.removeEventListener('resize', handleBrowserResize)
  }, [])

  const [tool, setTool] = useRecoilState(selectedToolAtom)
  const handleSelectTool = (selection: string) => {
    setTool((prevTool) => (selection === prevTool ? 'pointer' : selection))
  }
  const canDragCanvas = useRecoilValue(canDragCanvasAtom)

  const stageRef = useRef<Konva.Stage>(null)
  // future zoom stage will be needed as click to zoom is added
  const handleZoomSet = (e: KonvaEventObject<WheelEvent>) => {
    if (!stageRef.current) return
    handleZoom(e, stageRef.current)
  }

  useKeyboardShortcuts()

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
        elements={
          <FlexBox flexDirection={isInMobile ? 'row' : 'column'}>
            <Button
              kind={tool === 'pointer' ? 'default' : 'text'}
              onClick={() => handleSelectTool('pointer')}
              iconLeft={<FontAwesomeIcon icon={faMousePointer} />}
            />
            <Button
              kind={tool === 'edit-points' ? 'default' : 'text'}
              onClick={() => handleSelectTool('edit-points')}
              iconLeft={<FontAwesomeIcon icon={faHandPointer} />}
            />
            <Spacer height="0.25rem" width="0.25rem" />
            <Button
              kind={tool === 'grab' ? 'default' : 'text'}
              onClick={() => handleSelectTool('grab')}
              iconLeft={<FontAwesomeIcon icon={faArrowsAlt} />}
            />
            <Spacer height="0.25rem" width="0.25rem" />
            <Button
              kind={tool === 'shape' ? 'default' : 'text'}
              onClick={() => handleSelectTool('shape')}
              iconLeft={<FontAwesomeIcon icon={faSquareFull} />}
            />
            <Button
              kind={tool === 'remove' ? 'default' : 'text'}
              onClick={() => handleSelectTool('remove')}
              iconLeft={<FontAwesomeIcon icon={faEraser} />}
            />
            <Spacer height="0.25rem" width="0.25rem" />
            <Button
              kind={tool === 'select' ? 'default' : 'text'}
              onClick={() => handleSelectTool('select')}
              iconLeft={<FontAwesomeIcon icon={faObjectGroup} />}
            />
            <Button
              kind={tool === 'line' ? 'default' : 'text'}
              onClick={() => handleSelectTool('line')}
              iconLeft={<FontAwesomeIcon icon={faPenFancy} />}
            />
          </FlexBox>
        }
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
