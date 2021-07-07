import { atom } from '../atom'
import { createRecoilStore } from '../redux/defaultStore'
import { selector, Selector } from '../selector'

describe('test selector()', () => {
  it('returns an Selector instance', () => {
    const get = () => 3
    const set = () => 4

    const testSelector = selector({ key: 'test', get, set })

    expect(testSelector instanceof Selector).toBe(true)
    expect(testSelector.key).toBe('test')
    expect(testSelector.get).toBe(get)
    expect(testSelector.set).toBe(set)
  })

  it('test register()', () => {
    const store = createRecoilStore()

    const testAtom = atom({
      key: 'atom',
      default: 3,
    })

    const testSelector = selector({
      key: 'selector',
      get: ({ get }) => get(testAtom) + 1,
    })

    expect(store.getState()).toEqual({})

    testSelector.register(store)

    expect(store.getState()).toEqual({ atom: 3, selector: 4 })
  })
})
