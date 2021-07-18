import {
  Atom,
  AtomProps,
  FamilyGenerator,
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

export const atomFamily = <T>(props: AtomProps<T>): FamilyGenerator<T> => {
  return index => ({ ...props, index, type: RecoilValueType.ATOM })
}

export const selector = <T>(props: SelectorProps<T>): Selector<T> => {
  return { ...props, type: RecoilValueType.SELECTOR }
}

export const selectorFamily = <T>(
  props: SelectorProps<T>,
): FamilyGenerator<T> => {
  return index => ({ ...props, index, type: RecoilValueType.SELECTOR })
}

export const isRecoilValue = (value: any): boolean => {
  return !!(value?.type && (isAtom(value) || isSelector(value)))
}

export const EMPTY = Symbol()

export const DEFAULT_INDEX = Symbol()
