import { atom, atomFamily } from 'recoil'

export const playerIdsAtom = atom<string[]>({
  key: 'playerIds',
  default: [],
})

export const playerPosAtom = atomFamily({
  key: 'playerPos',
  default: { x: 0, y: 0 },
})
