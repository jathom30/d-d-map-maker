import React, {
  cloneElement,
  isValidElement,
  ReactElement,
  useState,
} from 'react'
import './Form.scss'
import { isFoundInArray } from './helpers'

type FormType = {
  required?: string[]
  onSubmit?: () => void
  valid?: boolean
  touched?: string[]
  missingFields?: string[]
  UNSAFE_style?: { [key: string]: any }
  UNSAFE_className?: string
}

export const Form: React.FC<FormType> = ({
  children,
  required = [],
  onSubmit,
  valid = true,
  touched = [],
  missingFields = [],
  UNSAFE_style,
  UNSAFE_className = '',
}) => {
  // true if submit attempted
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)

  // returns a boolean for a key's validity
  const isValid = (key: string, _valid: boolean): boolean => {
    // isFoundInArray searches as array for a specific item and returns a boolean if found or not
    const isMissingField = isFoundInArray(missingFields, key)
    const isTouchedField = isFoundInArray(touched, key)
    const isRequiredField = isFoundInArray(required, key)

    if (isMissingField && attemptedSubmit) return false
    if (!isTouchedField || (isTouchedField && !isRequiredField)) return true
    return _valid
  }

  // update children's props to pass if required and test validity to show error message as needed
  const updateProps = (child: ReactElement) => {
    let newProps = { ...child.props }
    // check if required
    const isRequiredField = isFoundInArray(required, newProps.htmlFor)
    if (isRequiredField) {
      newProps = { ...newProps, required: true }
    }
    // update showErrorMessage if !valid
    newProps = {
      ...newProps,
      valid: isValid(newProps.htmlFor, newProps.valid),
    }
    return newProps
  }

  const _onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // if not valid setAttempted true then return void
    if (!valid) {
      setAttemptedSubmit(true)
      return
    }
    // if valid setAttempted to false(probably not needed) and execute onSubmit func
    setAttemptedSubmit(false)
    if (onSubmit) onSubmit()
  }

  return (
    <form
      className={`Form ${UNSAFE_className}`}
      style={UNSAFE_style}
      onSubmit={_onSubmit}
    >
      {React.Children.map(children, (child) => {
        if (!isValidElement(child)) return false
        if (child.type === 'div') return child
        return cloneElement(child, updateProps(child))
      })}
    </form>
  )
}
