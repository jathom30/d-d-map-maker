import { useState } from 'react'
import {
  handleDataType,
  checkForRequireds,
  updateMissingFields,
} from './helper'

// ? is 'number' needed in type?
export type FormObjectType = {
  [key: string]: any
}

// takes in an optional list of required fields
// required field names should match formValue keys
export const useForm = (formData: FormObjectType) => {
  const [touched, setTouched] = useState<string[]>([])

  // update touched as new form inputs are touched without creating duplicates in the array
  const addTouched = (key: string) => {
    if (touched.every((item: string) => item !== key)) {
      setTouched([...touched, key])
    }
  }

  // takes in form data, only returns data that have filled in fields
  // also adds to touched array
  const trackFormData = (): FormObjectType => {
    const keys = Object.keys(formData)
    keys.forEach((key: string) => {
      // check that input has characters before adding to touched array
      if (handleDataType(formData[key])) addTouched(key)
    })
    // removes from formData object keys with empty value pairs
    const cleanedValues = keys.reduce((acc: FormObjectType, key: string) => {
      if (handleDataType(formData[key])) {
        return {
          ...acc,
          [key]: formData[key],
        }
      }
      return acc
    }, {})
    return cleanedValues
  }

  // checks that required fields have been filled in and are optionally validated
  const isValidForm = (checks: (string | boolean)[]) => {
    // by default all checks are true and there are no missing fields
    let validatedCheck = true
    let requiredCheck = true
    let missingFields: string[] = []

    let validatedArr: boolean[] = []
    let requiredArr: string[] = []

    // seperate checks into their typed arrays
    checks.forEach((check: boolean | string) => {
      if (typeof check === 'boolean') {
        validatedArr = [...validatedArr, check]
      }
      if (typeof check === 'string') {
        requiredArr = [...requiredArr, check]
      }
    })

    // every boolean in validatedArr must return true
    validatedCheck = validatedArr.every((valid: boolean) => valid)
    // every item in requiredArr must correspond with a key in formData
    requiredCheck = checkForRequireds(requiredArr, formData)
    // if an item in requiredArr does not exist as key in formData, it is added to missingFields
    missingFields = updateMissingFields(requiredArr, formData)

    return {
      validForm: validatedCheck && requiredCheck,
      missingFields,
    }
  }

  return { formData: trackFormData(), isValidForm, touched }
}
