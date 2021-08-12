export const isFoundInArray = (arrayToCheck: string[], key: string): boolean =>
  arrayToCheck.some((item: string) => item === key)
