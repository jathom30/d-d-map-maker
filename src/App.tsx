import {
  faArrowsAlt,
  faMousePointer,
  faSearch,
  faSquareFull,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useResizeObserver from '@react-hook/resize-observer'
import { Button, GridBox } from 'component-library'
import { CreativeStage } from 'Components/Canvas/CreativeStage/CreativeStage'
import { Sidebar } from 'Components/UI'
import React, { useEffect, useRef } from 'react'
import './theme.css'
import './App.scss'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  blockIdsAtom,
  canDragCanvasAtom,
  selectedBlockIdAtom,
  selectedToolAtom,
  stageDimsAtom,
} from 'State'
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
    setTool((prevTool) => (selection === prevTool ? 'pointer' : selection))
  }
  const [canDragCanvas, setCanDragCanvas] = useRecoilState(canDragCanvasAtom)

  const setBlockIds = useSetRecoilState(blockIdsAtom)
  const selectedBlock = useRecoilValue(selectedBlockIdAtom)

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
      if (e.code === 'Backspace') {
        setBlockIds((prevBlocks) => {
          return prevBlocks.filter((block) => {
            return block !== selectedBlock
          })
        })
      }
      if (e.code === 'KeyU') {
        handleSelectTool('shape')
      }
      if (e.code === 'KeyV') {
        handleSelectTool('pointer')
      }
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setCanDragCanvas(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return (
    <div
      className={`App ${
        canDragCanvas || tool === 'grab' ? 'App--is-dragging' : ''
      } ${tool === 'shape' ? 'App--is-creating' : ''}`}
    >
      <Sidebar
        elements={
          <GridBox gap="0.25rem">
            <Button
              kind={tool === 'pointer' ? 'default' : 'text'}
              onClick={() => handleSelectTool('pointer')}
              iconLeft={<FontAwesomeIcon icon={faMousePointer} />}
            />
            <Button
              kind={tool === 'grab' ? 'default' : 'text'}
              onClick={() => handleSelectTool('grab')}
              iconLeft={<FontAwesomeIcon icon={faArrowsAlt} />}
            />
            <Button
              kind={tool === 'shape' ? 'default' : 'text'}
              onClick={() => handleSelectTool('shape')}
              iconLeft={<FontAwesomeIcon icon={faSquareFull} />}
            />
            {/* <Button
              kind={tool === 'zoom' ? 'default' : 'text'}
              onClick={() => handleSelectTool('zoom')}
              iconLeft={<FontAwesomeIcon icon={faSearch} />}
            /> */}
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
