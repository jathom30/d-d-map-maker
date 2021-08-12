import {
  faMousePointer,
  faSearch,
  faShapes,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useResizeObserver from '@react-hook/resize-observer'
import { Button, GridBox } from 'component-library'
import { CreativeStage } from 'Components/Canvas/CreativeStage/CreativeStage'
import { Sidebar } from 'Components/UI'
import React, { useRef, useState } from 'react'
import './theme.css'
import './App.scss'
import { useSetRecoilState } from 'recoil'
import { stageDimsAtom } from 'State'
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

  const [tab, setTab] = useState('')
  const handleSelectTab = (selection: string) => {
    setTab(selection === tab ? '' : selection)
  }

  const stageRef = useRef<Konva.Stage>(null)
  const [zoom, setZoom] = useState({ x: 1, y: 1 })
  const handleZoomSet = (e: KonvaEventObject<WheelEvent>) => {
    if (!stageRef.current) return
    setZoom(handleZoom(e, stageRef.current))
  }

  return (
    <div className="App">
      <Sidebar
        elements={
          <GridBox gap="0.25rem">
            <Button
              kind={tab === 'select' ? 'default' : 'text'}
              onClick={() => handleSelectTab('select')}
              iconLeft={<FontAwesomeIcon icon={faMousePointer} />}
            />
            <Button
              kind={tab === 'shape' ? 'default' : 'text'}
              onClick={() => handleSelectTab('shape')}
              iconLeft={<FontAwesomeIcon icon={faShapes} />}
            />
            <Button
              kind={tab === 'zoom' ? 'default' : 'text'}
              onClick={() => handleSelectTab('zoom')}
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
