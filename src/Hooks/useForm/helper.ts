import { FormObjectType } from './useForm'

// return a boolean based on type of data
export const handleDataType = (data: string | boolean | number) => {
  switch (typeof data) {
    case 'string':
      return data.length > 0
    default:
      return data
  }
}

// check that every item on the required list is found in the formData
export const checkForRequireds = (
  requiredList: string[],
  formData: FormObjectType,
): boolean => requiredList.every((key: string) => formData[key])

// returns list of missing fields based on the required list
export const updateMissingFields = (
  requiredList: string[],
  formData: FormObjectType,
) => {
  let missingFields: string[] = []
  requiredList.forEach((key: string) => {
    const dataExists = formData[key]
    missingFields = dataExists
      ? [...missingFields.filter((field: string) => field !== key)]
      : (missingFields = [...missingFields, key])
  })
  return missingFields
}
