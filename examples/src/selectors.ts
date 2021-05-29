import { selector } from '../../src'
import { countI } from './atoms'

export const countIII = selector({
  key: 'countIII',
  get({ get }) {
    console.log('countIII was computed!')
    const c1 = get(countI)
    return c1 + 1
  },
})
