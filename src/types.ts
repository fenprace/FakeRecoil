import RecoilState from './state'
import RecoilStore from './store'

export interface RecoilStoreRef {
  current: RecoilStore
}

export type RecoilKey = string

export type RecoilFamilyIndex = unknown

export enum RecoilValueType {
  ATOM = 'ATOM',
  SELECTOR = 'SELECTOR',
}

export interface RecoilValueInterface<Index> {
  key: RecoilKey
  type: RecoilValueType
  index?: Index
}

export interface Atom<T, I = unknown> extends RecoilValueInterface<I> {
  default: T
  type: RecoilValueType.ATOM
}

export type GetHelper<T> = (rv: RecoilValue<T>) => T
export type SetHelper<T> = (rv: RecoilValue<T>, value: T) => void

export interface SelectorGetProps {
  get: GetHelper<any>
}

export interface SelectorSetProps {
  get: GetHelper<any>
  set: SetHelper<any>
}

export type SelectorGet<T> = ({ get }: SelectorGetProps) => T
export type SelectorSet<T> = ({ get, set }: SelectorSetProps, value: T) => void

export interface Selector<T, I = unknown> extends RecoilValueInterface<I> {
  type: RecoilValueType.SELECTOR
  get: SelectorGet<T>
  set?: SelectorSet<T>
}

export type RecoilValue<T, I = unknown> = Atom<T, I> | Selector<T, I>

export interface AtomProps<T> {
  key: RecoilKey
  default: T
}

export interface SelectorProps<T> {
  key: RecoilKey
  get: SelectorGet<T>
  set?: SelectorSet<T>
}

export type Setter<T> = (value: T | ((value: T) => T)) => void

export type ListenerCallback<T> = (() => void) | ((value: T) => void)

export type StateFamily<T> = Map<RecoilFamilyIndex, RecoilState<T>>

export type FamilyGenerator<T> = (index: RecoilFamilyIndex) => RecoilValue<T>
