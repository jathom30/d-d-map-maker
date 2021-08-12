import React, { useState } from 'react'
import './TextInput.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'

type TextInputType = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  icon?: JSX.Element
  password?: boolean
  id?: string
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  size?: 's' | 'm' | 'l' | 'xl'
} & (
  | { valid: boolean; validityIcon?: undefined }
  | { valid?: undefined; validityIcon: React.ReactNode }
  | { valid?: undefined; validityIcon?: undefined }
)

export const TextInput: React.FC<TextInputType> = ({
  value,
  onChange,
  placeholder = '',
  icon,
  valid,
  validityIcon,
  password,
  id,
  onKeyDown,
  size = 'm',
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const sizeClass = ` TextInput--${size}-size`
  const modifierClasses = classNames(' ', sizeClass, {
    'TextInput--is-focused': isFocused,
  })

  return (
    <div className={`TextInput${modifierClasses}`}>
      {!!icon && <div className="TextInput__iconLeft">{icon}</div>}
      <input
        onKeyDown={onKeyDown}
        id={id}
        className="TextInput__input"
        type={password ? 'password' : 'text'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {!!validityIcon && (
        <div className="TextInput__iconRight">{validityIcon}</div>
      )}
      {!!valid && (
        <div className="TextInput__iconRight">
          <FontAwesomeIcon icon={valid ? faCheck : faTimes} />
        </div>
      )}
    </div>
  )
}
