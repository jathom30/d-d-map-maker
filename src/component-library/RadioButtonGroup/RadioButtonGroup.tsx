import React, { ReactElement, ChangeEvent } from 'react'
import './RadioButtonGroup.scss'
import classNames from 'classnames'
import { RadioButton } from '../RadioButton'

type OnChangeType = (
  newSelection: string | number,
  name: string,
  event: ChangeEvent<HTMLInputElement>,
) => void

export const RadioButtonGroup = ({
  children,
  name,
  onChange,
  defaultSelected,
  valueSelected,
  layout = 'vertical',
  size,
}: {
  children: ReactElement[]
  name: string
  defaultSelected?: string | number
  valueSelected: string | number | null
  onChange: OnChangeType
  layout?: 'horizontal' | 'vertical'
  size?: 's' | 'm' | 'l' | 'xl'
}) => {
  const wrapperClasses = classNames(' ', {
    'RadioButtonGroup--horizontal': layout !== 'vertical',
  })

  const selected = valueSelected || defaultSelected

  const handleChange: OnChangeType = (newSelection, _name, event) => {
    if (onChange) {
      onChange(newSelection, _name, event)
    }
  }

  const getRadioButtons = () => {
    const radioButtons = React.Children.map(children, (radioButton) => {
      const { value, label } = radioButton.props

      if (Object.prototype.hasOwnProperty.call(radioButton, 'checked')) {
        console.error(
          `When using RadioButton components as children of a RadioButtonGroup
          component, do not use the 'checked' prop of any RadioButton components.
          It will be managed by the RadioButtonGroup`,
        )
      }

      return (
        <RadioButton
          label={label}
          name={name}
          value={value}
          size={size}
          onChange={handleChange}
          checked={value === selected}
        />
      )
    })

    return radioButtons
  }

  return (
    <div className={`RadioButtonGroup${wrapperClasses}`}>
      {getRadioButtons()}
    </div>
  )
}
