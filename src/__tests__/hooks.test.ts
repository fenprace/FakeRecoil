import { atom, selector, isRecoilValue } from '../index'

describe('test isRecoilValue()', () => {
  it('returns false for booleans', () => {
    expect(isRecoilValue(true)).toBe(false)
    expect(isRecoilValue(false)).toBe(false)
  })

  it('returns false for numbers', () => {
    expect(isRecoilValue(-1)).toBe(false)
    expect(isRecoilValue(0)).toBe(false)
    expect(isRecoilValue(1)).toBe(false)
    expect(isRecoilValue(NaN)).toBe(false)
  })

  it('returns false for strings', () => {
    expect(isRecoilValue('')).toBe(false)
    expect(isRecoilValue('Hello, world!')).toBe(false)
  })

  it('returns false for undefined and null', () => {
    expect(isRecoilValue(undefined)).toBe(false)
    expect(isRecoilValue(null)).toBe(false)
  })

  it('returns true for Atoms', () => {
    const testAtomI = atom({
      key: 'testAtomI',
      default: null,
    })

    expect(isRecoilValue(testAtomI)).toBe(true)
  })

  it('returns true for Selectors', () => {
    const testSelector = selector({
      key: 'testSelector',
      get: () => null,
    })

    expect(isRecoilValue(testSelector)).toBe(true)
  })
})
