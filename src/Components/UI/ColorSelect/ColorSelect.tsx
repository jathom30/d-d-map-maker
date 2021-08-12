import React, { useState, useRef, useEffect } from 'react'
import { ColorChangeHandler, SketchPicker } from 'react-color'
import { useOnClickOutside } from 'Hooks'
import './ColorSelect.scss'
import { Popover } from 'component-library'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil'
import { recentColorsAtom } from 'State'

export const ColorSelect: React.FC<{
  color: string
  onChange: ColorChangeHandler
  error?: boolean
}> = ({ color, onChange, error = false }) => {
  const [showPicker, setShowPicker] = useState(false)
  const buttonRef = useRef<HTMLDivElement>(null)
  const [recentColors, setRecentColors] = useRecoilState(recentColorsAtom)
  useOnClickOutside(buttonRef, () => setShowPicker(false))

  useEffect(() => {
    if (showPicker) return
    setRecentColors((prevColors) => {
      if (prevColors.some((prevColor) => prevColor === color) || color === '')
        return prevColors
      return [color, ...prevColors.slice(0, 15)]
    })
  }, [showPicker])

  return (
    <div className="ColorSelect">
      <Popover
        align="center"
        position={['bottom']}
        content={
          <div ref={buttonRef}>
            <SketchPicker
              color={color}
              onChange={(c, e) => {
                onChange(c, e)
              }}
              onChangeComplete={(c, e) => {
                onChange(c, e)
              }}
              presetColors={recentColors}
            />
          </div>
        }
        isOpen={showPicker}
      >
        <div
          className={`ColorSelect__button-wrapper ${
            showPicker ? 'ColorSelect__button-wrapper--is-disabled' : ''
          }`}
        >
          <button
            onClick={() => setShowPicker(!showPicker)}
            type="button"
            className="ColorSelect__button"
            aria-label="select color"
            style={{ backgroundColor: error ? 'lightgrey' : color }}
          >
            {error && <FontAwesomeIcon icon={faQuestion} />}
          </button>
        </div>
      </Popover>
    </div>
  )
}
