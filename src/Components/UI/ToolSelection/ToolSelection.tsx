import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowsAlt,
  faEraser,
  faHandPointer,
  faMousePointer,
  faObjectGroup,
  faPenFancy,
  faSquareFull,
} from '@fortawesome/free-solid-svg-icons'
import { Button, FlexBox, Spacer } from 'component-library'
import React from 'react'
import { useRecoilState } from 'recoil'
import { selectedToolAtom } from 'State'
import { useKeyboardShortcuts } from 'Hooks'

export const ToolSelection: React.FC<{ isInMobile: boolean }> = ({
  isInMobile,
}) => {
  const [tool, setTool] = useRecoilState(selectedToolAtom)
  const handleSelectTool = (selection: string) => {
    setTool((prevTool) => (selection === prevTool ? 'pointer' : selection))
  }

  useKeyboardShortcuts()

  return (
    <div className="ToolSelection">
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
          kind={tool === 'pen' ? 'default' : 'text'}
          onClick={() => handleSelectTool('pen')}
          iconLeft={<FontAwesomeIcon icon={faPenFancy} />}
        />
      </FlexBox>
    </div>
  )
}
