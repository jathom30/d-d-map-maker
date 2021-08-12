import { faSearch, faSquareFull } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useResizeObserver from '@react-hook/resize-observer'
import { Button, GridBox } from 'component-library'
import { CreativeStage } from 'Components/Canvas/CreativeStage/CreativeStage'
import { Sidebar } from 'Components/UI'
import React, { useEffect, useRef } from 'react'
import './theme.css'
import './App.scss'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { canDragCanvasAtom, selectedToolAtom, stageDimsAtom } from 'State'
import { KonvaEventObject } from 'konva/lib/Node'
import { handleZoom } from 'Helpers'
import Konva from 'konva'

function App() {
  const setStageDims = useSetRecoilState(stageDimsAtom)
  const stageContainerRef = useRef<HTMLDivElement>(null)
  // gets dimensions of stage
  useResizeObserver(stageContainerRef, (entry) =>
    setStageDims(entry.contentRect),
  )

  const [tool, setTool] = useRecoilState(selectedToolAtom)
  const handleSelectTool = (selection: string) => {
    setTool((prevTool) => (selection === prevTool ? '' : selection))
  }
  const [canDragCanvas, setCanDragCanvas] = useRecoilState(canDragCanvasAtom)

  const stageRef = useRef<Konva.Stage>(null)
  // future zoom stage will be needed as click to zoom is added
  const handleZoomSet = (e: KonvaEventObject<WheelEvent>) => {
    if (!stageRef.current) return
    handleZoom(e, stageRef.current)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setCanDragCanvas(true)
      }
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setCanDragCanvas(false)
      }
    }
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'KeyU') {
        handleSelectTool('shape')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('keypress', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('keypress', handleKeyPress)
    }
  }, [])

  return (
    <div className={`App ${canDragCanvas ? 'App--is-dragging' : ''}`}>
      <Sidebar
        elements={
          <GridBox gap="0.25rem">
            <Button
              kind={tool === 'shape' ? 'default' : 'text'}
              onClick={() => handleSelectTool('shape')}
              iconLeft={<FontAwesomeIcon icon={faSquareFull} />}
            />
            <Button
              kind={tool === 'zoom' ? 'default' : 'text'}
              onClick={() => handleSelectTool('zoom')}
              iconLeft={<FontAwesomeIcon icon={faSearch} />}
            />
          </GridBox>
        }
      />
      <div ref={stageContainerRef} className="App__stage">
        <CreativeStage stageRef={stageRef} onZoom={handleZoomSet} />
      </div>
    </div>
  )
}

export default App
