import { atom, atomFamily } from 'recoil'

export const lineIdsAtom = atom<string[]>({
  key: 'lineIds',
  default: [],
})

export const linePointsAtom = atomFamily<number[], string>({
  key: 'linePoints',
  default: [],
})

export const creationPointsAtom = atom<number[]>({
  key: 'creationPoints',
  default: [],
})
