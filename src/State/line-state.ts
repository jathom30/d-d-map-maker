import { pointsToPositions } from 'Helpers'
import { atom, atomFamily, selector } from 'recoil'

export const lineIdsAtom = atom<string[]>({
  key: 'lineIds',
  default: [],
})

export const linePointsAtom = atomFamily<number[], string>({
  key: 'linePoints',
  default: [],
})

export const linePosAtom = atomFamily({
  key: 'linePos',
  default: { x: 0, y: 0 },
})

export const creationPointsAtom = atom<number[]>({
  key: 'creationPoints',
  default: [],
})

export const selectedLineIdsAtom = atom<string[]>({
  key: 'selectedLineIds',
  default: [],
})

export const selectedLinesSelector = selector({
  key: 'selectedLinesSelector',
  get: ({ get }) => {
    const ids = get(selectedLineIdsAtom)
    return ids.map((id) => {
      const points = get(linePointsAtom(id))
      const coords = pointsToPositions(points)
      return { id, points, coords }
    })
  },
  set: ({ get, set }) => {
    const ids = get(selectedLineIdsAtom)
    ids.map((id) => {
      const points = get(linePointsAtom(id))
      const coords = pointsToPositions(points)
      return { id, points, coords }
    })
  },
})
