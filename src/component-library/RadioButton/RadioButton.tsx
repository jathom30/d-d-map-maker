import React, { FC, ReactNode, ChangeEvent } from 'react'
import './RadioButton.scss'
import classNames from 'classnames'

export type RadioButtonType = {
  checked?: boolean
  value: string | number
  onChange?: (
    newSelection: string | number,
    name: string,
    event: ChangeEvent<HTMLInputElement>,
  ) => void
  label?: ReactNode
  id?: string
  name?: string
  size?: 's' | 'm' | 'l' | 'xl'
}

export const RadioButton: FC<RadioButtonType> = ({
  label,
  onChange,
  value,
  checked,
  name,
  size = 'm',
  id,
}) => {
  const sizeClass = ` RadioButton--${size}-size`
  const modifierClasses = classNames(' ', sizeClass, {
    'RadioButton--checked': checked,
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange && value && name) {
      onChange(value, name, event)
    }
  }

  return (
    <div className={`RadioButton${modifierClasses}`}>
      <label htmlFor={id} className="RadioButton__wrapper-label">
        <input
          className="RadioButton__input"
          type="radio"
          onChange={handleChange}
          checked={checked}
          value={value}
          name={name}
          id={id}
        />

        {label && <span className="RadioButton__label">{label}</span>}
      </label>
    </div>
  )
}
