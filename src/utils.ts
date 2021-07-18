import {
  Atom,
  AtomProps,
  RecoilValue,
  RecoilValueType,
  Selector,
  SelectorProps,
} from './types'

export const isAtom = <T>(rv: RecoilValue<T>): boolean => {
  return rv.type === RecoilValueType.ATOM
}

export const isSelector = <T>(rv: RecoilValue<T>): boolean => {
  return rv.type === RecoilValueType.SELECTOR
}

export const atom = <T>(props: AtomProps<T>): Atom<T> => {
  return { ...props, type: RecoilValueType.ATOM }
}

export const selector = <T>(props: SelectorProps<T>): Selector<T> => {
  return { ...props, type: RecoilValueType.SELECTOR }
}

export const EMPTY = Symbol()
