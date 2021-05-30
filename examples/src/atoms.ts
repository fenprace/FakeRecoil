import { atom } from '../../src'

export const countI = atom({
  key: 'countI',
  default: 1,
})

export const countII = atom({
  key: 'countII',
  default: () => {
    console.log('CountII was Initialized')
    return 2
  },
})
