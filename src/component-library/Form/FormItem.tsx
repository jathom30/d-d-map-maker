import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { isValidElement, cloneElement, ReactElement } from 'react'
import { FlexBox } from '../Box'
import './FormItem.scss'

type FormItemType = {
  // htmlFor must match a key in the form data for required, valid, etc to work as intended
  htmlFor: string
  label?: string
  required?: boolean
  errorMessage?: string
  valid?: boolean
}

export const FormItem: React.FC<FormItemType> = ({
  children,
  htmlFor,
  label,
  required = false,
  errorMessage = '',
  valid = true,
}) => {
  const updateProps = (child: ReactElement) => {
    let newProps = { ...child.props }
    // set id of child to htmlFor for better UX
    newProps = { ...newProps, id: htmlFor }
    return newProps
  }

  return (
    <div className="FormItem">
      <FlexBox flexDirection="column">
        {label && (
          <label className="FormItem__label" htmlFor={htmlFor}>
            {label}
            {!required && ' (optional)'}
          </label>
        )}
        {React.Children.map(children, (child) => {
          if (!isValidElement(child)) return false
          return cloneElement(child, updateProps(child))
        })}
        <div className="FormItem__msg-wrapper">
          {!valid && (
            <p className="FormItem__error-message">
              <FontAwesomeIcon icon={faExclamationCircle} />
              <span>{errorMessage}</span>
            </p>
          )}
        </div>
      </FlexBox>
    </div>
  )
}
