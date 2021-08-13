import { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import {
  blockIdsAtom,
  canDragCanvasAtom,
  selectedBlockIdsAtom,
  selectedToolAtom,
} from 'State'

export const useKeyboardShortcuts = () => {
  const setCanDragCanvas = useSetRecoilState(canDragCanvasAtom)

  const setBlockIds = useSetRecoilState(blockIdsAtom)
  const [selectedBlocks, setSelectedBlocks] =
    useRecoilState(selectedBlockIdsAtom)

  const setTool = useSetRecoilState(selectedToolAtom)
  const handleSelectTool = (selection: string) => {
    setTool((prevTool) => (selection === prevTool ? 'pointer' : selection))
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setCanDragCanvas(true)
      }
      if (e.code === 'Backspace') {
        setBlockIds((prevBlocks) =>
          prevBlocks.filter(
            (block) => !selectedBlocks.some((selected) => selected === block),
          ),
        )
        setSelectedBlocks([])
      }
      if (e.code === 'KeyU') {
        handleSelectTool('shape')
      }
      if (e.code === 'KeyV') {
        handleSelectTool('pointer')
      }
      if (e.code === 'KeyM') {
        handleSelectTool('select')
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
  }, [selectedBlocks])
}
