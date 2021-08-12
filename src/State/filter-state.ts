import { filters } from 'Configs'
import { atom } from 'recoil'

export const filtersAtom = atom({
  key: 'filters',
  default: filters,
})

export const filterStartColorAtom = atom<string>({
  key: 'filterStartColor',
  default: 'red',
})

export const filterStopColorAtom = atom<string>({
  key: 'filterStopColor',
  default: 'orange',
})

export const filterStartSpaceAtom = atom<number>({
  key: 'filterStartSpace',
  default: 0,
})

export const filterStopSpaceAtom = atom<number>({
  key: 'filterStopSpace',
  default: 1,
})

export const filterAngleAtom = atom<number>({
  key: 'filterAngle',
  default: 45,
})

export const filterOpacityAtom = atom<number>({
  key: 'filterOpacity',
  default: 0.5,
})

export const filterVisibleAtom = atom({
  key: 'filterVisible',
  default: false,
})
