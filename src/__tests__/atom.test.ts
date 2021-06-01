import { createRecoilStore } from '../recoilDefaultStore'
import { atom, Atom } from '../atom'

describe('test atom()', () => {
  it('returns an Atom instance', () => {
    const testAtom = atom({
      key: 'test',
      default: 3,
    })

    expect(testAtom instanceof Atom).toBe(true)
    expect(testAtom.key).toBe('test')
    expect(testAtom.default).toBe(3)
  })

  it('initialize callback shall only be executed once', () => {
    const initCb = jest.fn(() => 3)

    const testAtom = atom({
      key: 'test',
      // jest.fn() is not recognised as an instacne of Function,
      // see: https://github.com/facebook/jest/issues/6329
      default: (...args) => initCb(...args),
    })

    expect(testAtom.default).toBe(3)
    expect(initCb.mock.calls.length).toBe(1)
  })

  it('test register()', () => {
    const store = createRecoilStore()

    const testAtom = atom({
      key: 'test',
      default: 3,
    })

    expect(store.getState()).toEqual({})

    testAtom.register(store)

    expect(store.getState()).toEqual({ test: 3 })
  })
})
