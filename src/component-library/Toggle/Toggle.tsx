import React, { useRef } from 'react'
import { useKeyboardFocus } from 'Hooks'
import './Toggle.scss'

export const Toggle: React.FunctionComponent<{
  isDisabled?: boolean
  isChecked?: boolean
  onChange: (checked: boolean) => void
  htmlFor: string
  size?: 's' | 'm' | 'l' | 'xl'
}> = ({ isDisabled, isChecked, htmlFor, onChange, size = 'm' }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const hasKeyboardFocus = useKeyboardFocus(inputRef)
  const sizeClass = `Toggle--${size}-size`
  return (
    <label
      htmlFor={htmlFor}
      className={`Toggle ${sizeClass} ${
        isChecked ? 'Toggle--is-checked' : ''
      } ${isDisabled ? 'Toggle--is-disabled' : ''} ${
        hasKeyboardFocus ? 'Toggle--has-keyboard-focus' : ''
      }`}
    >
      <input
        id={htmlFor}
        ref={inputRef}
        className="Toggle__input"
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={isDisabled}
      />
      <span
        className={`Toggle__slider ${
          isChecked ? 'Toggle__slider--is-checked' : ''
        } ${isDisabled ? 'Toggle__slider--is-disabled' : ''}`}
      />
    </label>
  )
}
