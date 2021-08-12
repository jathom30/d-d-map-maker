import { atom, atomFamily } from 'recoil'

export const blockIdsAtom = atom<string[]>({
  key: 'blockIds',
  default: [],
})

export const blockDimsAtom = atomFamily({
  key: 'blockDims',
  default: { width: -1, height: -1 },
})

export const blockPosAtom = atomFamily({
  key: 'blockPos',
  default: { x: -1, y: -1 },
})

export const creationPosAtom = atom({
  key: 'creationPos',
  default: { x: 0, y: 0 },
})

export const creationDimsAtom = atom({
  key: 'creationDims',
  default: { width: -1, height: -1 },
})
