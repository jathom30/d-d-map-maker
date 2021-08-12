import { useEffect } from 'react'
import {
  useMask,
  MaskType,
  ValidatedMaskType,
  seperateValidationMask,
} from '../useMask'
import { useValidation } from '../useValidation'
import { useLocalStorage } from './useLocalStorage'

type LocalMaskType = {
  initialState: string
  mask: MaskType
}

// ! For the safety of our user and, ultimately, the company,    ! //
// ! never use these hooks to save the user's personal           ! //
// ! information such as credit card numbers, passwords, etc     ! //

export const useLocalMask = (localMask: LocalMaskType, key: string) => {
  const { initialState, mask } = localMask

  const [maskedText, setMaskedText] = useMask(initialState, mask)
  const [localStorageItem, setLocalStorageItem] = useLocalStorage(
    maskedText,
    key,
  )

  // everytime localStorgeItem is updated, mask it
  useEffect(() => {
    setMaskedText(localStorageItem)
  }, [localStorageItem])

  return [maskedText, setLocalStorageItem]
}

export const useLocalValidatedMask = (
  validatedMask: ValidatedMaskType,
  key: string,
) => {
  const { initialState, mask, validation } =
    seperateValidationMask(validatedMask)

  const [maskedValue, setMaskedValue] = useLocalMask(
    { initialState, mask },
    key,
  )
  const isValid = useValidation(validation)

  return [maskedValue, setMaskedValue, isValid(maskedValue)]
}
