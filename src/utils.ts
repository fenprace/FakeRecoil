import { State } from './recoilReducer'
import { RecoilValue } from './index'
import { Store } from 'redux'

export const getValueByKey = <T>(
  key: string,
  store: Store,
  recoilReducerKey?: string,
): T => {
  const state = store.getState() as State
  if (recoilReducerKey) return (state[recoilReducerKey] as State)[key] as T
  return state[key] as T
}

export const getValuesByKeys = (
  keys: string[],
  store: Store,
  recoilReducerKey?: string,
): unknown[] => {
  const state = store.getState() as State
  if (recoilReducerKey)
    return keys.map(key => (state[recoilReducerKey] as State)[key])
  return keys.map(key => state[key])
}

export const getValue = <T>(
  { key }: RecoilValue<T>,
  store: Store,
  recoilReducerKey?: string,
): T => {
  return getValueByKey(key, store, recoilReducerKey)
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
