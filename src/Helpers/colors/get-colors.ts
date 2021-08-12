import { ColorTokensWithLighterAndDarkerType } from 'component-library'

export const getColors = (
  on: ColorTokensWithLighterAndDarkerType,
  kind?: 'primary' | 'secondary' | 'tertiary',
) => {
  const baseColor = () => {
    // does on have a number?
    const onHasNumbers = /\d/.test(on)
    // get numbers
    const numbersOfOn = parseInt(on.replace(/\D/g, ''), 10)
    const stringOfOn = on.replace(/[0-9]/g, '')
    if (on === 'white') return 'grey-100'
    if (!onHasNumbers) {
      return `${on}-darker`
    }
    // if color is darker than 500; lighten, otherwise darken
    const lighten = numbersOfOn > 500
    const newNumber = () => {
      if (numbersOfOn === 50) {
        return 100
      }
      return numbersOfOn + (lighten ? -100 : 100)
    }
    return `${stringOfOn}${newNumber()}`
  }
  const colors = {
    color: `var(--text-on-${on}${kind ? `--${kind}` : ''})`,
    backgroundColor: `var(--color-${on})`,
  }
  const hovered = {
    color: `var(--text-on-${baseColor()}${kind ? `--${kind}` : ''})`,
    backgroundColor: `var(--color-${baseColor()})`,
  }
  return { colors, hovered }
}
