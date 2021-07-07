import { Store } from 'redux'
import { RecoilValue } from './index'
import { State } from './redux/reducer'

export const compareArray = (a: unknown[], b: unknown[]): boolean => {
  for (const i in a) {
    if (a[i] !== b[i]) return false
  }

  return true
}

export const getValueByKey = <T>(key: string, store: Store): T => {
  const state = store.getState() as State
  return state[key] as T
}

export const getValuesByKeys = (keys: string[], store: Store): unknown[] => {
  const state = store.getState() as State
  return keys.map(key => state[key])
}

export const getValue = <T>({ key }: RecoilValue<T>, store: Store): T => {
  return getValueByKey(key, store)
}

export const setValueByKey = <T>(key: string, value: T, store: Store): void => {
  store.dispatch({ type: 'SET_ATOM', payload: { key, value: value } })
}

export const setValue = <T>(
  { key }: RecoilValue<T>,
  value: T,
  store: Store,
): void => {
  setValueByKey(key, value, store)
}
