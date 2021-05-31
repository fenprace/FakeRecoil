import { selector } from '../../src'
import { countI } from './atoms'

export const countIII = selector<number>({
  key: 'countIII',
  get({ get }) {
    console.log('countIII was computed!')
    const c1 = get(countI)
    return c1 + 1
  },
  set({ set }, newValue) {
    console.log("setting countIII's upstream")
    set(countI, newValue - 1)
  },
})
